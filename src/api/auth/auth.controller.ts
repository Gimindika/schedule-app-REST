import bcrypt from 'bcrypt';
import { RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
	ACCESS_TYPE_ALL,
	DEFAULT_ACCESSES,
	IDeleteUserReq,
	IGetUserAccessReq,
	IGrantAllAccessReq,
	IGrantUserAccessReq,
	ILogin,
	IRegister,
	IRevokeUserAccessReq,
	IUpdateUserReq,
} from './auth.model';
import * as AuthService from './auth.service';

export const login: RequestHandler = async (req: ILogin, res: Response) => {
	try {
		const { user_email, password: inputPassword } = req.body;
		const user = await AuthService.getUserByEmail(user_email);

		if (user.length) {
			// hash password before comparison
			const { password, user_id, user_email, user_name } = user[0];
			if (bcrypt.compareSync(inputPassword, password)) {
				// fetch user accesses
				const user_access_types_res = await AuthService.getAccessByUserId(
					user_id
				);
				const user_access_types = user_access_types_res.map((uat) => {
					return uat.access_type;
				});
				// generate token
				const tokenPayload = {
					user_id,
					user_email,
					user_name,
					user_access_types,
				};
				const token =
					process.env.JWT_SECRET_KEY &&
					jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
						expiresIn: '1d',
					});

				return res.status(200).json({
					token,
				});
			} else {
				// return wrong pass error
				return res.status(403).json({
					error: 'Wrong Password',
				});
			}
		} else {
			// return user not found
			return res.status(404).json({
				error: 'User not found',
			});
		}
	} catch (error) {
		console.error(
			'[auth.controller][login][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when logging user in',
		});
	}
};

export const register: RequestHandler = async (
	req: IRegister,
	res: Response
) => {
	try {
		console.log(req.body);
		const { user_email, password, user_name } = req.body;
		const userFound = await AuthService.getUserByEmail(user_email);
		const saltRounds = process.env.BCRYPT_SALTROUNDS || '10';

		if (userFound[0]?.user_email) {
			// return error email already taken
			return res.status(401).json({
				error: 'Email has already taken',
			});
		} else {
			// hash password
			const hashedPassword = bcrypt.hashSync(password, parseInt(saltRounds));
			const userResultId = await AuthService.addUser({
				...req.body,
				password: hashedPassword,
			});

			let insertDefaultAccessQuery = `INSERT INTO user_access(user_id, access_id) VALUES `;
			DEFAULT_ACCESSES.map((access, index) => {
				insertDefaultAccessQuery += ` (${userResultId} , ${access}) ${
					index === DEFAULT_ACCESSES.length - 1 ? ';' : ','
				}`;
			});

			try {
				await AuthService.insertDefaultAccess(insertDefaultAccessQuery);
			} catch (insertScheduleError) {
				if (insertScheduleError) {
					AuthService.deleteUser(userResultId);
					return res.status(500).json({
						message:
							'There was an error when inserting default accesses for new user',
					});
				}
			}

			return res.status(201).json({
				data: {
					user_id: userResultId,
					user_email,
					user_name,
				},
			});
		}
	} catch (error) {
		console.error(
			'[auth.controller][register][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);

		res.status(500).json({
			message: 'There was an error when registering user',
		});
	}
};

/**
 * Get User access on user_id provided
 *
 * @param req Express IGetUserAccessReq
 * @param res Express Response
 */
// @ts-ignore
export const getAccessByUserId: RequestHandler = async (
	req: IGetUserAccessReq,
	res: Response
) => {
	try {
		const { user_id } = req.params;
		const user_access = await AuthService.getAccessByUserId(user_id);

		if (user_access.length) {
			return res.status(200).json({
				data: user_access,
			});
		} else {
			return res.status(204).json({});
		}
	} catch (error) {
		console.error(
			'[auth.controller][getAccessByUserId][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when fetching user access',
		});
	}
};

/**
 * Updates existing user record
 *
 * @param req Express IUpdateUserReq
 * @param res Express Response
 */
// @ts-ignore
export const updateUser: RequestHandler = async (
	req: IUpdateUserReq,
	res: Response
) => {
	try {
		const { user_id } = req.params;

		await AuthService.updateUser({
			...req.body,
			user_id,
		});

		return res.status(200).json({
			data: {
				...req.body,
				user_id,
			},
		});
	} catch (error) {
		console.error(
			'[auth.controller][updateUser][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when updating user',
		});
	}
};

/**
 * deletes a user
 *
 * @param req Express IDeleteUserReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteUser: RequestHandler = async (
	req: IDeleteUserReq,
	res: Response
) => {
	try {
		await AuthService.deleteUser(req.params.user_id);

		return res.status(204).json({});
	} catch (error) {
		console.error(
			'[auth.controller][deleteUser][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when deleting user',
		});
	}
};

/**
 * grant access to a user
 *
 * @param req Express IGrantUserAccessReq
 * @param res Express Response
 */
// @ts-ignore
export const grantUserAccess: RequestHandler = async (
	req: IGrantUserAccessReq,
	res: Response
) => {
	try {
		const { access_id, user_id } = req.params;
		const result = await AuthService.grantUserAccess(user_id, access_id);

		return res.status(200).json({
			data: {
				user_id,
				access_id,
			},
		});
	} catch (error) {
		console.error(
			'[auth.controller][grantUserAccess][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when granting access',
		});
	}
};

/**
 * Remove assigned member from a schedule
 *
 * @param req Express IRevokeUserAccessReq
 * @param res Express Response
 */
// @ts-ignore
export const revokeUserAccess: RequestHandler = async (
	req: IRevokeUserAccessReq,
	res: Response
) => {
	try {
		const { access_id, user_id } = req.params;
		await AuthService.revokeUserAccess(user_id, access_id);

		res.status(204).json({});
	} catch (error) {
		console.error(
			'[auth.controller][revokeUserAccess][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when revoking access from user',
		});
	}
};

/**
 * grant all access to a user
 *
 * @param req Express IGrantAllAccessReq
 * @param res Express Response
 */
// @ts-ignore
export const grantAllAccess: RequestHandler = async (
	req: IGrantAllAccessReq,
	res: Response
) => {
	try {
		const { user_id } = req.params;
		const resultRevokeAll = await AuthService.revokeAllAccesses(user_id);

		if (resultRevokeAll) {
			await AuthService.grantUserAccess(user_id, ACCESS_TYPE_ALL);

			return res.status(201).json({
				data: { user_id, access_id: ACCESS_TYPE_ALL },
			});
		}

		return res.status(500).json({
			message: 'There was an error when granting access',
		});
	} catch (error) {
		console.error(
			'[auth.controller][grantUserAccess][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when granting access',
		});
	}
};

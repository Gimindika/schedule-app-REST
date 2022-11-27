import { execute } from '../utils/mysql.connector';

import { IAccessType, IUser } from './auth.model';
import { AuthQueries } from './auth.queries';

/**
 * gets users
 */
export const getUsers = async () => {
	return execute<IUser[]>(AuthQueries.GetUsers, []);
};

/**
 * get user by email
 */
export const getUserByEmail = async (user_email: IUser['user_email']) => {
	return execute<IUser[]>(AuthQueries.GetUserByEmail, [user_email]);
};

/**
 * get user's access
 */
export const getAccessByUserId = async (user_id: IUser['user_id']) => {
	return execute<IAccessType[]>(AuthQueries.GetAccessByUserId, [user_id]);
};

export const insertDefaultAccess = async (insertDefaultAccessQuery: string) => {
	const result = await execute<{ affectedRows: number }>(
		insertDefaultAccessQuery,
		[]
	);

	return result.affectedRows > 0;
};

/**
 * add user information
 */
export const addUser = async (user: IUser) => {
	const result = await execute<{ insertId: number }>(AuthQueries.AddUser, [
		user.user_name,
		user.password,
		user.user_email,
	]);
	return result.insertId;
};

/**
 * updates user based on the id provided
 */
export const updateUser = async (user: IUser) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.UpdateUser,
		[user.user_name, user.user_email, user.user_id]
	);
	return result.affectedRows > 0;
};

/**
 * delete user based on the id provided
 */
export const deleteUser = async (user: IUser['user_id']) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.DeleteUser,
		[user]
	);
	return result.affectedRows > 0;
};

export const grantUserAccess = async (
	user_id: IUser['user_id'],
	access_id: IAccessType['access_id']
) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.GrantUserAccess,
		[user_id, access_id]
	);
	return result.affectedRows > 0;
};

export const revokeUserAccess = async (
	user_id: IUser['user_id'],
	access_id: IAccessType['access_id']
) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.RevokeUserAccess,
		[user_id, access_id]
	);
	return result.affectedRows > 0;
};

export const revokeAllAccesses = async (user_id: IUser['user_id']) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.RevokeAllAccesses,
		[user_id]
	);
	return result.affectedRows > 0;
};

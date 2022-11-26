import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
	user_id: number;
	user_email: string;
	user_name: string;
	user_access_types: string[];
}

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize =
	(allowedAccessTypes: string[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let token = req.headers.authorization;

			// verify request has token
			if (!token) {
				return res.status(401).json({ message: 'Invalid token ' });
			}

			// remove Bearer if using Bearer Authorization mechanism
			if (token.toLowerCase().startsWith('bearer')) {
				token = token.slice('bearer'.length).trim();
			}

			// verify token hasn't expired yet
			// const decodedToken = await validateToken(jwt);
			const decodedToken: any =
				process.env.JWT_SECRET_KEY &&
				(await jwt.verify(token, process.env.JWT_SECRET_KEY));

			if (decodedToken) {
				console.log('DECODE ', decodedToken);
				const hasAccessToEndpoint = allowedAccessTypes.some(
					(allowedAccessType) =>
						decodedToken.user_access_types.some(
							(userAccessType: string) => userAccessType === allowedAccessType
						)
				);

				if (!hasAccessToEndpoint) {
					return res
						.status(401)
						.json({ message: 'No access to this endpoint' });
				}

				next();
			}
		} catch (error: any) {
			if (error.name === 'TokenExpiredError') {
				res.status(401).json({ message: 'Expired token' });
				return;
			}

			return res.status(500).json({ message: 'Failed to authenticate user' });
		}
	};

import { Request } from 'express';

export interface IAccessType {
	access_id: number;
	access_type: string;
}

export interface IUser {
	user_id: number;
	user_name: string;
	user_email: string;
	password?: string;
	accesses?: IAccessType[];
}

export interface IGetUserByEmailReq
	extends Request<{ user_email: IUser['user_email'] }> {}
export interface IAddUserReq
	extends Request<{}, { user_id: IUser['user_id'] }, IUser> {}
export interface IUpdateUserReq
	extends Request<{ user_id: IUser['user_id'] }, IUser, IUser> {}
export interface IDeleteUserReq
	extends Request<{ user_id: IUser['user_id'] }> {}

export interface IAddAccessTypeReq
	extends Request<{}, { access_id: IAccessType['access_id'] }, IAccessType> {}
export interface IUpdateAccessTypeReq
	extends Request<
		{ access_id: IAccessType['access_id'] },
		IAccessType,
		IAccessType
	> {}
export interface IDeleteAccessTypeReq
	extends Request<{ access_id: IAccessType['access_id'] }> {}

export interface IGrantUserAccessReq
	extends Request<{
		user_id: IUser['user_id'];
		access_id: IAccessType['access_id'];
	}> {}
export interface IRevokeUserAccessReq
	extends Request<{
		user_id: IUser['user_id'];
		access_id: IAccessType['access_id'];
	}> {}

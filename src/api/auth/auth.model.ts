import { Request } from 'express';

// set default access types to 10, 14, 18, 19
// 10(getBatches), 14(getSchedules), 18(assignMember) , 19(removeAssignedMember)
export const DEFAULT_ACCESSES = [10, 14, 18, 19];
export const ACCESS_TYPE_ALL = 1;

export interface IAccessType {
	access_id: number;
	access_type: string;
}

export interface IUser {
	user_id: number;
	user_name: string;
	user_email: string;
	password: string;
	accesses?: IAccessType[];
}

export interface ILogin
	extends Request<
		{},
		{},
		{ user_email: IUser['user_email']; password: IUser['password'] }
	> {}
export interface IRegister
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

export interface IGetUserAccessReq
	extends Request<{
		user_id: IUser['user_id'];
	}> {}
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
export interface IGrantAllAccessReq
	extends Request<{
		user_id: IUser['user_id'];
	}> {}

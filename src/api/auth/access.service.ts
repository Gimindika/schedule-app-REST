import { execute } from '../utils/mysql.connector';

import { IUser, IAccessType } from './auth.model';
import { AuthQueries } from './auth.queries';

/**
 * gets access types
 */
export const getAccessTypes = async () => {
	return execute<IAccessType[]>(AuthQueries.GetAccessTypes, []);
};

/**
 * adds a new access type record
 */
export const addAccessType = async (accessTypes: IAccessType) => {
	const result = await execute<{ insertId: number }>(
		AuthQueries.AddAccessType,
		[accessTypes.access_type]
	);
	return result.insertId;
};

/**
 * updates access type based on the id provided
 */
export const updateAccessType = async (accessTypes: IAccessType) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.UpdateAccessType,
		[accessTypes.access_type, accessTypes.access_id]
	);
	return result.affectedRows > 0;
};

/**
 * delete access type based on the id provided
 */
export const deleteAccessType = async (access_id: IAccessType['access_id']) => {
	const result = await execute<{ affectedRows: number }>(
		AuthQueries.DeleteAccessType,
		[access_id]
	);
	return result.affectedRows > 0;
};

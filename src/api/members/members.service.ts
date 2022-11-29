import { execute } from './../utils/mysql.connector';
import { MembersQueries } from './members.queries';
import { IMember } from './members.model';

/**
 * gets active Members
 */
export const getMembers = async () => {
	return execute<IMember[]>(MembersQueries.GetMembers, []);
};

/**
 * gets a Member based on id provided
 */
export const getMemberById = async (id: IMember['member_id']) => {
	return execute<IMember>(MembersQueries.GetMemberById, [id]);
};

/**
 * adds a new active Member record
 */
export const insertMember = async (member: IMember) => {
	const result = await execute<{ insertId: number }>(MembersQueries.AddMember, [
		member.name,
		member.profile_color,
	]);
	return result.insertId;
};

/**
 * updates Member information based on the id provided
 */
export const updateMember = async (member: IMember) => {
	const result = await execute<{ affectedRows: number }>(
		MembersQueries.UpdateMember,
		[member.name, member.profile_color, member.member_id]
	);
	return result.affectedRows > 0;
};

/**
 * delete Member information based on the id provided
 */
export const deleteMember = async (id: IMember['member_id']) => {
	const result = await execute<{ affectedRows: number }>(
		MembersQueries.DeleteMember,
		[id]
	);
	return result.affectedRows > 0;
};

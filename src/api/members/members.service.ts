import { execute } from "./../utils/mysql.connector";

import { MembersQueries } from "./members.queries";
import { IMember } from "./members.model";

/**
 * gets active Members
 */
export const getMembers = async () => {
  return execute<IMember[]>(MembersQueries.GetMembers, []);
};

/**
 * gets a Member based on id provided
 */
export const getMemberById = async (id: IMember["id"]) => {
  return execute<IMember>(MembersQueries.GetMemberById, [id]);
};

/**
 * adds a new active Member record
 */
export const insertMember = async (Member: IMember) => {
  const result = await execute<{ affectedRows: number }>(
    MembersQueries.AddMember,
    [Member.name, Member.profileColor]
  );
  return result.affectedRows > 0;
};

/**
 * updates Member information based on the id provided
 */
export const updateMember = async (Member: IMember) => {
  const result = await execute<{ affectedRows: number }>(
    MembersQueries.UpdateMember,
    [Member.name, Member.profileColor, Member.id]
  );
  return result.affectedRows > 0;
};

/**
 * updates Member information based on the id provided
 */
export const deleteMember = async (id: IMember["id"]) => {
  const result = await execute<{ affectedRows: number }>(
    MembersQueries.DeleteMember,
    [id]
  );
  return result.affectedRows > 0;
};

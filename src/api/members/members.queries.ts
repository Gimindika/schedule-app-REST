export const MembersQueries = {
  GetMembers: `
    SELECT * FROM 
      members`,
  GetMemberById: `
    SELECT * FROM 
      members 
    WHERE 
      member_id = ?`,
  AddMember: `
    INSERT INTO 
      members(name, profile_color) 
    VALUES (? , ?) `,
  UpdateMember: `
    UPDATE 
      members 
    SET 
      name = ?, 
      profile_color = ? 
    WHERE 
      member_id = ?
    `,
  DeleteMember: `
    DELETE FROM 
      members
    WHERE 
      member_id = ?
  `,
};

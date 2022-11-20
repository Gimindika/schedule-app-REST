export const MembersQueries = {
  GetMembers: `
    SELECT * FROM 
        members`,
  GetMemberById: `
    SELECT * FROM 
        members 
    WHERE 
        id = ?`,
  AddMember: `
    INSERT INTO 
        members(name, profileColor) 
    VALUES (? , ?) `,
  UpdateMember: `
    UPDATE 
        members 
    SET 
        name = ?, 
        profileColor = ? 
    WHERE 
        id = ?
    `,
  DeleteMember: `
    DELETE FROM 
        members
    WHERE 
        id = ?
  `,
};

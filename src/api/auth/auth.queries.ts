export const AuthQueries = {
	GetUsers: `
        SELECT (user_id, user_name, user_email) FROM users`,
	GetUserByEmail: `
        SELECT * FROM 
            users 
        WHERE 
            user_email = ?`,
	AddUser: `
        INSERT INTO 
            users (user_name, password, user_email)
        VALUES
            (?,?,?)`,
	UpdateUser: `
        UPDATE
            users
        SET
            user_name = ?,
            user_email = ?,
        WHERE
            user_id = ?
    `,
	DeleteUser: `
        DELETE FROM 
            users
        WHERE 
            user_id = ?
    `,
	GetAccessTypes: `
        SELECT * FROM accesses
    `,
	GetAccessByUserId: `
        SELECT (access_id) FROM user_access WHERE user_id = ?
    `,
	AddAccessType: `
        INSERT INTO accesses(access_type) VALUES (?)
    `,
	UpdateAccessType: `
        UPDATE accesses SET access_type = ? WHERE access_id = ?
    `,
	DeleteAccessType: `
        DELETE FROM accesses WHERE access_id = ?
    `,
	GrantUserAccess: `
        INSERT INTO user_access(user_id, access_id) VALUES(?, ?)
    `,
	RevokeUserAccess: `
        DELETE FROM 
            user_access 
        WHERE
            user_id = ?
        AND
            access_id = ?
    `,
};

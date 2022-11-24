export const AuthQueries = {
	GetUsers: `
        SELECT (user_id, name, email) FROM users`,
	GetUserByEmail: `
        SELECT * FROM 
            users 
        WHERE 
        email = ?`,
	AddUser: `
        INSERT INTO 
            users (name, password, email)
        VALUES
            (?,?,?)`,
	UpdateUser: `
        UPDATE
            users
        SET
            name = ?,
            email = ?,
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

const fs = require('fs');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const migrate = async () => {
	const directoryPath = path.join(__dirname, 'sql');

	const sqlDDL = fs
		.readFileSync(`${directoryPath}/schedule_app.DDL.sql`, { encoding: 'utf8' })
		.toString();
	const sqlUsers = fs
		.readFileSync(`${directoryPath}/users.sql`, { encoding: 'utf8' })
		.toString();
	const sqlAssignment = fs
		.readFileSync(`${directoryPath}/_assignment_.sql`, { encoding: 'utf8' })
		.toString();
	const sqlAccesses = fs
		.readFileSync(`${directoryPath}/accesses.sql`, { encoding: 'utf8' })
		.toString();
	const sqlBatches = fs
		.readFileSync(`${directoryPath}/batches.sql`, { encoding: 'utf8' })
		.toString();
	const sqlEvents = fs
		.readFileSync(`${directoryPath}/events.sql`, { encoding: 'utf8' })
		.toString();
	const sqlMembers = fs
		.readFileSync(`${directoryPath}/members.sql`, { encoding: 'utf8' })
		.toString();
	const sqlSchedules = fs
		.readFileSync(`${directoryPath}/schedules.sql`, { encoding: 'utf8' })
		.toString();
	const sqlUserAccess = fs
		.readFileSync(`${directoryPath}/user_access.sql`, { encoding: 'utf8' })
		.toString();

	const connection = mysql.createConnection({
		host: process.env.MY_SQL_DB_HOST,
		user: process.env.MY_SQL_DB_USER,
		password: process.env.MY_SQL_DB_PASSWORD,
		database: process.env.MY_SQL_DB_DATABASE,
		multipleStatements: true,
	});

	connection.connect();

	connection.query(sqlDDL, function (error, results, fields) {
		if (error) throw error;
		console.log('DDL DONE ');
	});

	connection.query(sqlUsers, function (error, results, fields) {
		if (error) throw error;
		console.log('Users DONE ');
	});
	connection.query(sqlAccesses, function (error, results, fields) {
		if (error) throw error;
		console.log('Accesses DONE ');
	});
	connection.query(sqlBatches, function (error, results, fields) {
		if (error) throw error;
		console.log('Batches DONE ');
	});
	connection.query(sqlEvents, function (error, results, fields) {
		if (error) throw error;
		console.log('Events DONE ');
	});
	connection.query(sqlMembers, function (error, results, fields) {
		if (error) throw error;
		console.log('Members DONE ');
	});
	connection.query(sqlSchedules, function (error, results, fields) {
		if (error) throw error;
		console.log('Schedules DONE ');
	});
	connection.query(sqlAssignment, function (error, results, fields) {
		if (error) throw error;
		console.log('Assignments DONE ');
	});
	connection.query(sqlUserAccess, function (error, results, fields) {
		if (error) throw error;
		console.log('User Access DONE ');
	});

	connection.end();

	// connection.destroy();
};

migrate();

const db = require("better-sqlite3")("disk.sqlite");

const createDBTable = (tableName, cols) => {
	return db.exec(`create table if not exists ${tableName} (${cols.map((i) => i)})`);
};
const getFromDb = (tableName, tag) => {
	return db.prepare(`select * from ${tableName} where tag = ?`).get(tag);
};
const updateDb = (tableName, tag, data, key) => {
	return db.prepare(`update ${tableName} set ${key} = @data where tag = @tag`)
		.run({
			data: JSON.stringify(data),
			tag
		});
};
const insertToDB = (tableName, tag, key, data) => {
	return db.prepare(`insert into ${tableName} (tag, ${key}) values(@tag, @data)`)
		.run({
			tag,
			data: JSON.stringify(data)
		});
};
const delFromDb = (tableName, tag) => {
	return db.prepare(`delete from ${tableName} where tag = ?`).run(tag);
};
const dropDbTable = (tableName) => {
	return db.exec(`drop table ${tableName}`);
};
const insertLogs = (tableName, data) => {
	const cols = Object.keys(data);
	return db.prepare(`insert into ${tableName} (${cols.map((i) => i)})
        values (${cols.map((i) => `@${i}`)})`)
		.run(data);
};
const getAllFromDB = (tableName) => {
	return db.prepare(`select * from ${tableName}`).all();
};

module.exports = {
	createDBTable,
	getFromDb,
	updateDb,
	insertToDB,
	delFromDb,
	dropDbTable,
	insertLogs,
	getAllFromDB
};
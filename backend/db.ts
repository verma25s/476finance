// db.ts
import Database from 'better-sqlite3';

const db = new Database('users.db');

// Create users table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT,
    dob TEXT
  )
`).run();

export default db;




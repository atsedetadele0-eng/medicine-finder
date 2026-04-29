const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'medfinder.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Users Table (Now only for pharmacies technically, but we'll keep the name for auth)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'pharmacy'
    )`);

    // Create Pharmacies Table
    db.run(`CREATE TABLE IF NOT EXISTS pharmacies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE,
        name TEXT,
        address TEXT,
        location_lat REAL,
        location_lng REAL,
        phone TEXT,
        balance REAL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Create Inventory/Drugs Table
    db.run(`CREATE TABLE IF NOT EXISTS drugs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pharmacy_id INTEGER,
        name TEXT,
        description TEXT,
        price REAL,
        quantity INTEGER DEFAULT 0,
        expiry_date TEXT,
        FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id)
    )`);
  }
});

module.exports = db;

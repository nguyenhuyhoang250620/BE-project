const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/database1.sqlite");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'user',
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
  db.run(
    `
        CREATE TABLE IF NOT EXISTS refresh_tokens(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            token TEXT,
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `,
  );
  db.run(
    `
      CREATE TABLE IF NOT EXISTS menus(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        path TEXT,
        icon TEXT,
        parent_id INTEGER,
        sort_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1
      )
    `,
  );
  db.run(
    `
      CREATE TABLE IF NOT EXISTS role_menus(
        role TEXT,
        menu_id INTEGER
      )
    `
  )
   db.run(`
    INSERT INTO menus (label, path, sort_order)
    VALUES 
      ('Dashboard', '/dashboard', 1),
      ('Chat', '/chat', 2),
      ('Posts', '/posts', 3),
      ('Admin', '/admin', 4)
  `);

  db.run(`
    INSERT INTO role_menus (role, menu_id)
    VALUES
      ('user', 1),
      ('user', 2),
      ('admin', 1),
      ('admin', 2),
      ('admin', 3),
      ('admin', 4)
  `);
});

module.exports = db;

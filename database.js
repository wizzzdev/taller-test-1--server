/**
 * When I was working on the live code challenge,
 * I totally forgot that node.js has a built-in module for SQLite.
 * So I've decided to replace lowdb with sqlite
 */

import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('Pending', 'Deleted', 'Completed')) DEFAULT 'Pending',
    createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')),
    updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))
  );
`);

// 2. For good practices, I created a trigger to update the updatedAt field
db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_task_timestamp 
  AFTER UPDATE ON tasks
  BEGIN
    UPDATE tasks SET updatedAt = STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW') WHERE id = OLD.id;
  END;
`);
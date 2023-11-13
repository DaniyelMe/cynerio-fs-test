import sqlite3 from 'sqlite3';

let dbInstance: sqlite3.Database | null = null;

async function openDb(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error('Could not open in-memory SQLite database', err);
        reject(err);
      } else {
        db.serialize(() => {
          db.exec(
            `
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              address TEXT,
              date TEXT
            );
            `,
            (createTableErr) => {
              if (createTableErr) {
                console.error(
                  'Error setting up the SQLite database',
                  createTableErr
                );
                reject(createTableErr);
              } else {
                initDBWithUsers(db, resolve, reject);
              }
            }
          );
        });
      }
    });
  });
}

function initDBWithUsers(
  db: sqlite3.Database,
  resolve: (value: sqlite3.Database | PromiseLike<sqlite3.Database>) => void,
  reject: (reason?: any) => void
) {
  const insertStmt = db.prepare(
    `INSERT INTO users (name, address, date) VALUES (?, ?, ?)`
  );
  const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      address: '123 Maple Street',
      date: new Date().toLocaleString(),
    },
    {
      id: 2,
      name: 'Bob',
      address: '456 Oak Avenue',
      date: new Date().toLocaleString(),
    },
    {
      id: 3,
      name: 'Charlie',
      address: '789 Pine Lane',
      date: new Date().toLocaleString(),
    },
  ];

  for (const user of users) {
    insertStmt.run(user.name, user.address, user.date);
  }

  insertStmt.finalize((insertErr) => {
    if (insertErr) {
      console.error(
        'Error inserting initial data into the SQLite database',
        insertErr
      );
      reject(insertErr);
    } else {
      resolve(db);
    }
  });
}

export async function getDb(): Promise<sqlite3.Database> {
  if (!dbInstance) {
    dbInstance = await openDb();
  }
  return dbInstance;
}

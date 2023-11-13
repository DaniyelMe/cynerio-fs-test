import {
  validateAlphaLengthName,
  validateAlphaNumeric,
  validateAlphaNumericAddress,
} from '~/composables/regexValidations';
import { getDb } from '../db';

export function getUserService() {
  async function getUsers() {
    const db = await getDb();

    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async function addUser(userData: NewUser) {
    if (!validateAlphaLengthName(userData.name)) {
      throw new Error(
        'Invalid name: Name must be between 3 and 32 alphabetic characters.'
      );
    }
    if (!validateAlphaNumericAddress(userData.address)) {
      throw new Error(
        'Invalid address: Address must be between 3 and 100 alphanumeric characters.'
      );
    }

    const db = await getDb();
    const date = new Date().toLocaleString();

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, address, date) VALUES (?, ?, ?)',
        [userData.name, userData.address, date],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, ...userData, date });
          }
        }
      );
    });
  }

  async function removeUserById(userId: number) {
    const db = await getDb();

    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: userId, deleted: this.changes > 0 });
        }
      });
    });
  }

  async function searchUsers(searchTerm: string) {
    const db = await getDb();

    return new Promise((resolve, reject) => {
      try {
        if (!validateAlphaNumeric(searchTerm)) {
          reject('Invalid search term: most be alphanumeric characters');
        }

        const likeTerm = `%${searchTerm}%`;
        db.all(
          'SELECT * FROM users WHERE date LIKE ? OR name LIKE ? OR address LIKE ?',
          [likeTerm, likeTerm, likeTerm],
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      } catch (error) {
        console.log('error:', error);
      }
    });
  }

  return {
    getUsers,
    addUser,
    removeUserById,
    searchUsers,
  };
}

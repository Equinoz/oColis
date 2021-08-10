/**
 * @module userModel 
 * @description This module provide user model
 */

const CoreModel = require("./coreModel"),
      { client } = require("../database");

class User extends CoreModel {
  static tableName = "user";

  // Redefine static methods for user model to customize the data output
  static async findAll() {
    const connection = await client;
    try {
      const [users, _] = await connection.query('SELECT user.id, user.email, status.name AS status FROM user JOIN status ON status.id = user.status_id');

      return users;
    } catch(err) {
      throw err;
    }
  }

  static async findById(id, details=false) {
    const connection = await client;
    try {
      let request;
      if (details) {
        request = 'SELECT * FROM user WHERE id = ?';
      } else {
        request = 'SELECT user.id, user.email, status.name AS status FROM user JOIN status ON status.id = user.status_id WHERE user.id = ?';
      }
      const [users, _] = await connection.query(request, [id]);

      return users[0];
    } catch(err) {
      throw err;
    }
  }

  static async findByMail(email) {
    const connection = await client;
    try {
      const [users, _] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

      return users[0];
    } catch(err) {
      throw err;
    }
  }

  #email;
  #status_id;
  #password;
  #salt;

  constructor (obj) {
    super(obj);
    this.#email = obj.email;
    this.#status_id = obj.status_id;
    this.#password = obj.password;
    this.#salt = obj.salt;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get status_id() {
    return this.#status_id;
  }

  set status_id(value) {
    this.#status_id = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    this.#password = value;
  }

  get salt() {
    return this.#salt;
  }

  set salt(value) {
    this.#salt = value;
  }

  async insert() {
    const connection = await client;
    const preparedQuery = [
      'INSERT INTO user (email, status_id, password, salt) VALUES (?, ?, ?, ?)',
      [this.email, this.status_id, this.password, this.salt]
    ];

    try {
      const [result, _] = await connection.query(...preparedQuery);
      this.id = result.insertId;

      return this.id;
    } catch(err) {
      throw err;
    }
  }

  async update() {
    const connection = await client;
    const preparedQuery = [
      'UPDATE user SET email = ?, status_id = ?, password = ? WHERE id=?',
      [this.email, this.status_id, this.password, this.id]
    ];

    try {
      const [result, _] = await connection.query(...preparedQuery);

      return (result.changedRows > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }

  async delete() {
    const connection = await client;
    try {
      const [result, _] = await connection.query('DELETE FROM user WHERE id=?', [this.id]);

      return (result.affectedRows > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = User;
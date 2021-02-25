const CoreModel = require('./coreModel'),
      client = require('./pool');

class User extends CoreModel {
  static tableName = "user";

  #mail;
  #status_id;
  #password;
  #salt;

  constructor (obj) {
    super(obj);
    this.#mail = obj.mail;
    this.#status_id = obj.status_id;
    this.#password = obj.password;
    this.#salt = obj.salt;
  }

  get mail() {
    return this.#mail;
  }

  set mail(value) {
    this.#mail = value;
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
    const preparedQuery = {
      text: 'INSERT INTO "user" ("mail", "status_id", "password", "salt") VALUES ($1, $2, $3, $4) RETURNING "id"',
      values: [this.mail, this.status_id, this.password, this.salt]
    };

    try {
      const results = await client.query(preparedQuery);
      this.id = results.rows[0].id;

      return this.id;
    } catch(err) {
      throw err;
    }
  }

  async update() {
    const preparedQuery = {
      text: 'UPDATE "user" SET ("mail", "status_id", "password", "salt") = ($1, $2, $3, $4) WHERE "id"=$5',
      values: [this.mail, this.status_id, this.password, this.salt, this.id]
    };

    try {
      const results = await client.query(preparedQuery);

      return (results.rowCount > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }

  async delete() {
    try {
      const results = await client.query('DELETE FROM "user" WHERE "id"=$1', [this.id]);

      return (results.rowCount > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = User;
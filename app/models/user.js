const CoreModel = require('./coreModel'),
      client = require('./pool');

class User extends CoreModel {
  static tableName = "user";

  #mail;
  #password;

  constructor (obj) {
    super(obj);
    this.#mail = obj.mail;
    this.#password = obj.password;
  }

  get mail() {
    return this.#mail;
  }

  set mail(value) {
    this.#mail = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    this.#password = value;
  }

  async insert() {
    const preparedQuery = {
      text: 'INSERT INTO "user" ("mail", "password") VALUES ($1, $2) RETURNING "id"',
      values: [this.mail, this.password]
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
      text: 'UPDATE "user" SET ("mail", "password") = ($1, $2) WHERE "id"=$3',
      values: [this.mail, this.password, this.id]
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
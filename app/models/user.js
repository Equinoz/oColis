const CoreModel = require('./coreModel'),
      client = require('./pool');

class User extends CoreModel {
  static tableName = "user";

  // Redefine static methods for user model to customize the data output
  static async findAll() {
    try {
      const elements = await client.query('SELECT "user"."id", "user"."mail", "status"."name" AS "status" FROM "user" JOIN "status" ON "status"."id" = "user"."status_id"');

      return elements.rows;
    } catch(err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const element = await client.query('SELECT "user"."id", "user"."mail", "status"."name" AS "status" FROM "user" JOIN "status" ON "status"."id" = "user"."status_id" WHERE "user"."id" = $1', [id]);

      return element.rows[0];
    } catch(err) {
      throw err;
    }
  }

  static async findByIdWithDetails(id) {
    try {
      const element = await client.query('SELECT * FROM "user" WHERE "id" = $1', [id]);

      return element.rows[0];
    } catch(err) {
      throw err;
    }
  }

  static async findByMail(mail) {
    try {
      const element = await client.query('SELECT * FROM "user" WHERE "mail" = $1', [mail]);

      return element.rows[0];
    } catch(err) {
      throw err;
    }
  }

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
      text: 'UPDATE "user" SET ("mail", "status_id", "password") = ($1, $2, $3) WHERE "id"=$4',
      values: [this.mail, this.status_id, this.password, this.id]
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
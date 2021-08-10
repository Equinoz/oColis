/**
 * @module tokenModel 
 * @description This module provide token model
 */

const CoreModel = require("./coreModel"),
      { client } = require("../database");

class Token extends CoreModel {
  static tableName = "token";

  static async exists(value) {
    try {
      const connection = await client;
      const request = 'SELECT * FROM blacklisted_token WHERE value = ?';
      const [rows, _] = await connection.query(request, [value]);

      return (rows.length > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }

  #value;

  constructor (obj) {
    super(obj);
    this.#value = obj.value;
  }

  get value() {
    return this.#value;
  }

  async add() {
    const connection = await client;
    const preparedQuery = [
      'INSERT INTO blacklisted_token (value) VALUES (?)',
      [this.value]
    ];

    try {
      await connection.query(...preparedQuery);

      return;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Token;
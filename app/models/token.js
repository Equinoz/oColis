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
      const request = 'SELECT * FROM blacklisted_token WHERE value = ?';
      const result = await client.execute(request, [value]);
      console.log(result);

      return (result.rows.length > 0) ? true : false;
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
    const preparedQuery = {
      text: 'INSERT INTO blacklisted_token ("value") VALUES (?)',
      values: [this.value]
    };

    try {
      await client.query(preparedQuery);

      return;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Token;
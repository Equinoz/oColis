/**
 * @module CoreModel 
 * @description This module provide core model for the application models
 */

const client = require('./pool');

class CoreModel {
  static async findAll() {
    try {
      const elements = await client.query(`SELECT * FROM "${this.tableName}"`);

      return elements.rows;
    } catch(err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const element = await client.query(`SELECT * FROM "${this.tableName}" WHERE "id"=$1`, [id]);

      return element.rows[0];
    } catch(err) {
      throw err;
    }
  }


  #id;

  constructor(obj) {
    this.#id = obj.id;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }
}

module.exports = CoreModel;
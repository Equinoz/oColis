/**
 * @module CoreModel 
 * @description This module provide core model for the application models
 */

const { client } = require("../database");

class CoreModel {
  static async findAll() {
    const connection = await client;
    try {
      const [elements, _] = await connection.query(`SELECT * FROM ${this.tableName}`);

      return elements;
    } catch(err) {
      throw err;
    }
  }

  static async findById(id) {
    const connection = await client;
    try {
      const [elements, _] = await connection.query(`SELECT * FROM ${this.tableName} WHERE id= ?`, [id]);

      return elements[0];
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
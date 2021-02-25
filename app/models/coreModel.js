const client = require('./pool');

class CoreModel {
  static async findAll() {
    try {
      const expeditions = await client.query(`SELECT * FROM "${this.tableName}"`);

      return expeditions.rows;
    } catch(err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const expedition = await client.query(`SELECT * FROM "${this.tableName}" WHERE "id"=$1`, [id]);

      return expedition.rows[0];
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
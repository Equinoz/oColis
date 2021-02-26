/**
 * @module ExpeditionModel 
 * @description This module provide expedition model
 */

const CoreModel = require('./coreModel'),
      client = require('./pool');

class Expedition extends CoreModel {
  static tableName = "expedition";

  #driver_name;
  #vehicle_plate;
  #starting_time;
  #ending_time;

  constructor (obj) {
    super(obj);
    this.#driver_name = obj.driver_name;
    this.#vehicle_plate = obj.vehicle_plate;
    this.#starting_time = obj.starting_time;
    this.#ending_time = obj.ending_time;
  }

  get driver_name() {
    return this.#driver_name;
  }

  set driver_name(value) {
    this.#driver_name = value;
  }

  get vehicle_plate() {
    return this.#vehicle_plate;
  }

  set vehicle_plate(value) {
    this.#vehicle_plate = value;
  }

  get starting_time() {
    return this.#starting_time;
  }

  set starting_time(value) {
    this.#starting_time = value;
  }

  get ending_time() {
    return this.#ending_time;
  }

  set ending_time(value) {
    this.#ending_time = value;
  }

  async insert() {
    const preparedQuery = {
      text: 'INSERT INTO "expedition" ("driver_name", "vehicle_plate", "starting_time", "ending_time") VALUES ($1, $2, $3, $4) RETURNING "id"',
      values: [this.driver_name, this.vehicle_plate, this.starting_time, this.ending_time]
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
      text: 'UPDATE "expedition" SET ("driver_name", "vehicle_plate", "starting_time", "ending_time") = ($1, $2, $3, $4) WHERE "id"=$5',
      values: [this.driver_name, this.vehicle_plate, this.starting_time, this.ending_time, this.id]
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
      // SQL transactions
      await client.query('BEGIN');
      // References to the expeditions table must be removed from the packages table
      await client.query('DELETE FROM "package" WHERE "expedition_id"=$1', [this.id]);
      const results = await client.query('DELETE FROM "expedition" WHERE "id"=$1', [this.id]);
      await client.query('COMMIT');

      return (results.rowCount > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Expedition;
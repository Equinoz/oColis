/**
 * @module ExpeditionModel 
 * @description This module provide expedition model
 */

const CoreModel = require("./coreModel"),
      { client } = require("../database");

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
    const connection = await client;
    const preparedQuery = [
      'INSERT INTO expedition (driver_name, vehicle_plate, starting_time, ending_time) VALUES (?, ?, ?, ?)',
      [this.driver_name, this.vehicle_plate, this.starting_time, this.ending_time]
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
      'UPDATE expedition SET driver_name = ?, vehicle_plate = ?, starting_time = ?, ending_time = ? WHERE id=?',
      [this.driver_name, this.vehicle_plate, this.starting_time, this.ending_time, this.id]
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
      // SQL transactions
      await connection.query('BEGIN');
      // References to the expeditions table must be removed from the packages table
      await connection.query('DELETE FROM package WHERE expedition_id=?', [this.id]);
      const [result, _] = await connection.query('DELETE FROM expedition WHERE id=?', [this.id]);
      await connection.query('COMMIT');

      return (result.affectedRows > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Expedition;
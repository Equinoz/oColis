/**
 * @module PlaceModel 
 * @description This module provide place model
 */

const CoreModel = require("./coreModel"),
      { client } = require("../database");

class Place extends CoreModel {
  static tableName = "place";

  #reference;
  #name;
  #address;
  #additional;
  #postal_code;
  #city;

  constructor (obj) {
    super(obj);
    this.#reference = obj.reference;
    this.#name = obj.name;
    this.#address = obj.address;
    this.#additional = obj.additional;
    this.#postal_code = obj.postal_code;
    this.#city = obj.city;
  }

  get reference() {
    return this.#reference;
  }

  set reference(value) {
    this.#reference = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get address() {
    return this.#address;
  }

  set address(value) {
    this.#address = value;
  }

  get additional() {
    return this.#additional;
  }

  set additional(value) {
    this.#additional = value;
  }

  get postal_code() {
    return this.#postal_code;
  }

  set postal_code(value) {
    this.#postal_code = value;
  }

  get city() {
    return this.#city;
  }

  set city(value) {
    this.#city = value;
  }

  async insert() {
    const connection = await client;
    const preparedQuery = [
      'INSERT INTO place (reference, name, address, additional, postal_code, city) VALUES (?, ?, ?, ?, ?, ?)',
      [this.reference, this.name, this.address, this.additional, this.postal_code, this.city]
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
      'UPDATE place SET reference = ?, name = ?, address = ?, additional = ?, postal_code = ?, city = ? WHERE id=?',
      [this.reference, this.name, this.address, this.additional, this.postal_code, this.city, this.id]
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
      // References to the places table must be removed from the packages table
      await connection.query('DELETE FROM package WHERE sender_id=? OR recipient_id=?', [this.id, this.id]);
      const [result, _] = await connection.query('DELETE FROM place WHERE id=?', [this.id]);
      await connection.query('COMMIT');

      return (result.affectedRows > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Place;
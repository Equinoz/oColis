/**
 * @module PackageModel 
 * @description This module provide package model
 */

const CoreModel = require("./coreModel"),
      { client } = require("../database");

class Package extends CoreModel {
  static tableName = "package";

  #serial_number;
  #content_description;
  #weight;
  #volume;
  #worth;
  #sender_id;
  #recipient_id;
  #expedition_id;

  constructor (obj) {
    super(obj);
    this.#serial_number = obj.serial_number;
    this.#content_description = obj.content_description;
    this.#weight = obj.weight;
    this.#volume = obj.volume;
    this.#worth = obj.worth;
    this.#sender_id = obj.sender_id;
    this.#recipient_id = obj.recipient_id;
    this.#expedition_id = obj.expedition_id;
  }

  get serial_number() {
    return this.#serial_number;
  }

  set serial_number(value) {
    this.#serial_number = value;
  }

  get content_description() {
    return this.#content_description;
  }

  set content_description(value) {
    this.#content_description = value;
  }

  get weight() {
    return this.#weight;
  }

  set weight(value) {
    this.#weight = value;
  }

  get volume() {
    return this.#volume;
  }

  set volume(value) {
    this.#volume = value;
  }

  get worth() {
    return this.#worth;
  }

  set worth(value) {
    this.#worth = value;
  }

  get sender_id() {
    return this.#sender_id;
  }

  set sender_id(value) {
    this.#sender_id = value;
  }

  get recipient_id() {
    return this.#recipient_id;
  }

  set recipient_id(value) {
    this.#recipient_id = value;
  }

  get expedition_id() {
    return this.#expedition_id;
  }

  set expedition_id(value) {
    this.#expedition_id = value;
  }

  async insert() {
    const connection = await client;
    const preparedQuery = [
      'INSERT INTO package (serial_number, content_description, weight, volume, worth, sender_id, recipient_id, expedition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [this.serial_number, this.content_description, this.weight, this.volume, this.worth, this.sender_id, this.recipient_id, this.expedition_id]
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
      'UPDATE package SET serial_number = ?, content_description = ?, weight = ?, volume = ?, worth = ?, sender_id = ?, recipient_id = ?, expedition_id = ? WHERE id=?',
      [this.serial_number, this.content_description, this.weight, this.volume, this.worth, this.sender_id, this.recipient_id, this.expedition_id, this.id]
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
      const [result, _] = await connection.query('DELETE FROM package WHERE id=?', [this.id]);

      return (result.affectedRows > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Package;
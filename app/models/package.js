/**
 * @module PackageModel 
 * @description This module provide package model
 */

const CoreModel = require('./coreModel'),
      client = require('./pool');

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
    const preparedQuery = {
      text: 'INSERT INTO "package" ("serial_number", "content_description", "weight", "volume", "worth", "sender_id", "recipient_id", "expedition_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"',
      values: [this.serial_number, this.content_description, this.weight, this.volume, this.worth, this.sender_id, this.recipient_id, this.expedition_id]
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
      text: 'UPDATE "package" SET ("serial_number", "content_description", "weight", "volume", "worth", "sender_id", "recipient_id", "expedition_id") = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE "id"=$9',
      values: [this.serial_number, this.content_description, this.weight, this.volume, this.worth, this.sender_id, this.recipient_id, this.expedition_id, this.id]
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
      const results = await client.query('DELETE FROM "package" WHERE "id"=$1', [this.id]);

      return (results.rowCount > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Package;
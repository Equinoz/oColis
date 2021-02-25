const client = require('./pool');

class Place {
  static async findAll() {
    try {
      const places = await client.query('SELECT * FROM "place"');

      return places.rows;
    } catch(err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const place = await client.query('SELECT * FROM "place" WHERE "id"=$1', [id]);

      return place.rows[0];
    } catch(err) {
      throw err;
    }
  }

  #id;
  #reference;
  #name;
  #address;
  #additional;
  #postal_code;
  #city;

  constructor (obj) {
    this.#id = obj.id;
    this.#reference = obj.reference;
    this.#name = obj.name;
    this.#address = obj.address;
    this.#additional = obj.additional;
    this.#postal_code = obj.postal_code;
    this.#city = obj.city;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
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
    const preparedQuery = {
      text: 'INSERT INTO "place" ("reference", "name", "address", "additional", "postal_code", "city") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id"',
      values: [this.reference, this.name, this.address, this.additional, this.postal_code, this.city]
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
      text: 'UPDATE "place" SET ("reference", "name", "address", "additional", "postal_code", "city") = ($1, $2, $3, $4, $5, $6) WHERE "id"=$7',
      values: [this.reference, this.name, this.address, this.additional, this.postal_code, this.city, this.id]
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
      // References to the places table must be removed from the packages table
      await client.query('DELETE FROM "package" WHERE "sender_id"=$1 OR "recipient_id"=$1', [this.id]);
      const results = await client.query('DELETE FROM "place" WHERE "id"=$1', [this.id]);
      await client.query('COMMIT');

      return (results.rowCount > 0) ? true : false;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Place;
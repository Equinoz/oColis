const client = require('./pool');

class Place {
  static async findAll() {
    const places = await client.query('SELECT * FROM "place"');
    return places.rows;
  }

  static async findById(id) {
    const place = await client.query('SELECT * FROM "place" WHERE "id"=$1', [id]);
    return place.rows[0];
  }

  #id;
  #reference;
  #name;
  #address;
  #additional;
  #postal_code;
  #city;

  constructor (obj) {
    this.#id = undefined;
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

  // Méthode save qui distribue selon la présence ou non d'id
  async insert() {
    const preparedQuery = {
      text: 'INSERT INTO "place" ("reference", "name", "address", "additional", "postal_code", "city") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id"',
      values: [this.reference, this.name, this.address, this.additional, this.postal_code, this.city]
    };

    const results = await client.query(preparedQuery);
    this.id = results.rows[0].id;
    return this.id;
  }

  async update(data) {
    // Check if the body request's fields are authorized
    const keys = [];
    const values = [];
    let index = 1;
    for (const key of Object.keys(data)) {
      if (["reference", "name", "address", "additional", "postal_code", "city"].includes(key)) {
        keys.push(`"${key}"=$${index}`);
        values.push(data[key]);
        index++;
      }
    }

    if (keys.length > 0) {
      const preparedQuery = {
        text: `UPDATE "place" SET ${keys.join(",")} WHERE "id"=$${index} RETURNING *`,
        values: [...values, this.id]
      };

      const results = await client.query(preparedQuery);
      return results.rows[0];
    }
  }

  // delete(id) {}
}

module.exports = Place;
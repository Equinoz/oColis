require('dotenv').config();

const faker = require("faker"),
      { Client } = require("pg");

(async () => {
  // Get the optionnal command-line arguments
  const placesNumber = process.argv[2] || 7,
        expeditionsNumber = process.argv[3] || 4,
        packagesNumber = process.argv[4] || 12;

  const client = new Client(process.env.PG_URL);

  await client.connect();

  // Transaction SQL
  await client.query('BEGIN');

  // Truncate tabless
  await client.query('TRUNCATE TABLE "user", "place", "expedition", "package" RESTART IDENTITY');

  // Create new places entities
  const places = [];
  for (let i=0; i<placesNumber; i++) {
    let place = "(";
    place += `\'${faker.random.uuid()}\', \'${faker.name.findName().replace(/'/, "''")}\', \'${faker.address.streetAddress().replace(/'/, "''")}\', \'${faker.address.streetSuffix()}\', \'${Math.ceil((Math.random() * 9000)) * 10}\', \'${faker.address.city().replace(/'/, "''")}\'`;
    place += ")";
    places.push(place);
  }
  await client.query('INSERT INTO "place" ("reference", "name", "address", "additional", "postal_code", "city") VALUES ' + places.join(", "));

  // Create new expediditions entities
  const expeditions = [];
  for (let i=0; i<expeditionsNumber; i++) {
    let expedition = "(";
    expedition += `\'${faker.name.findName().replace(/'/, "''")}\', \'${faker.vehicle.vrm()}\', NOW()`;
    expedition += ")";
    expeditions.push(expedition);
  }
  await client.query('INSERT INTO "expedition" ("driver_name", "vehicle_plate", "starting_time") VALUES ' + expeditions.join(", "));

  // Create new packages entities
  const packages = [];
  for (let i=0; i<packagesNumber; i++) {
    let package = "(";
    package += `\'${faker.random.uuid()}\', \'${faker.commerce.productDescription().replace(/'/, "''")}\', \'${faker.random.number()}\', \'${faker.random.number()}\', \'${faker.random.number()}\', ${Math.ceil((Math.random() * placesNumber))}, ${Math.ceil((Math.random() * placesNumber))}, ${Math.ceil((Math.random() * expeditionsNumber))}`;
    package += ")";
    packages.push(package);
  }
  await client.query('INSERT INTO "package" ("serial_number", "content_description", "weight", "volume", "worth", "sender_id", "recipient_id", "expedition_id") VALUES ' + packages.join(", "));

  await client.query('COMMIT');

  await client.end();

  console.log("Datas imported !");
})();
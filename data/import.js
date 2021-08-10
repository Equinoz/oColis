require('dotenv').config();

const faker = require("faker"),
      mysql = require("mysql2/promise");

(async () => {
  // Get the optionnal command-line arguments
  const placesNumber = process.argv[2] || 7,
        expeditionsNumber = process.argv[3] || 4,
        packagesNumber = process.argv[4] || 12;

  const client = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  await client.connect();

  // SQL transaction
  await client.query('BEGIN');

  // Truncate tables
  await client.query('SET FOREIGN_KEY_CHECKS = 0');
  await client.query('TRUNCATE TABLE user');
  await client.query('TRUNCATE TABLE package');
  await client.query('TRUNCATE TABLE place');
  await client.query('TRUNCATE TABLE expedition');
  await client.query('TRUNCATE TABLE status');
  await client.query('SET FOREIGN_KEY_CHECKS = 1');

  // Create new status entities
  await client.query('INSERT INTO status (name) VALUES (\'admin\'), (\'user\')');

  // Create new users entities
  await client.query('INSERT INTO user (mail, status_id, password, salt) VALUES (\'chuck.norris@gmail.com\', 1, \'$2b$10$ov4iTOGFXvppZgE1LBBPB.W1gm04LoDdeUk.TgIW63mK4Aga5ks9O\', \'$2b$10$R4iepjPakY7AEn3GsvOzdu\'), (\'bruce.wayne@gmail.com\', 2, \'$2b$10$cdZ3xQJyDfgKXPM1ivP2WeRLp3VzV.4SvblUcdV7vMjy5HKMamPhG\', \'$2b$10$XR6CH5YAgDKDFb65oO/GRu\'), (\'clark.kent@gmail.com\', 2, \'$2b$10$PUPUkSbHqaggOXg4g7U2qOgtklysknsgC/2KjMczVuPAXNzJR.2R.\', \'$2b$10$hEJ9eSHk9Z5Z7YKooJodZe\')');

  // Create new places entities
  const places = [];
  for (let i=0; i<placesNumber; i++) {
    let place = "(";
    place += `\'${faker.random.uuid()}\', \'${faker.name.findName().replace(/'/, "''")}\', \'${faker.address.streetAddress().replace(/'/, "''")}\', \'${faker.address.streetSuffix()}\', \'${Math.ceil((Math.random() * 9000)) * 10}\', \'${faker.address.city().replace(/'/, "''")}\'`;
    place += ")";
    places.push(place);
  }
  await client.query('INSERT INTO place (reference, name, address, additional, postal_code, city) VALUES ' + places.join(", "));

  // Create new expediditions entities
  const expeditions = [];
  for (let i=0; i<expeditionsNumber; i++) {
    let expedition = "(";
    expedition += `\'${faker.name.findName().replace(/'/, "''")}\', \'${faker.vehicle.vrm()}\', NOW()`;
    expedition += ")";
    expeditions.push(expedition);
  }
  await client.query('INSERT INTO expedition (driver_name, vehicle_plate, starting_time) VALUES ' + expeditions.join(", "));

  // Create new packages entities
  const packages = [];
  for (let i=0; i<packagesNumber; i++) {
    let package = "(";
    package += `\'${faker.random.uuid()}\', \'${faker.commerce.productDescription().replace(/'/, "''")}\', \'${faker.random.number()}\', \'${faker.random.number()}\', \'${faker.random.number()}\', ${Math.ceil((Math.random() * placesNumber))}, ${Math.ceil((Math.random() * placesNumber))}, ${Math.ceil((Math.random() * expeditionsNumber))}`;
    package += ")";
    packages.push(package);
  }
  await client.query('INSERT INTO package (serial_number, content_description, weight, volume, worth, sender_id, recipient_id, expedition_id) VALUES ' + packages.join(", "));

  await client.query('COMMIT');

  await client.end();

  console.log("Datas imported !");
})();
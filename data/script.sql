BEGIN;

DROP TABLE IF EXISTS "user",
"place",
"expedition",
"package";

CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "mail" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "place" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "reference" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "address" text NOT NULL,
  "additional" text,
  "postal_code" int NOT NULL,
  "city" text NOT NULL
);

CREATE TABLE "expedition" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "driver_name" text NOT NULL,
  "vehicle_plate" text NOT NULL UNIQUE,
  "starting_time" timestamptz NOT NULL,
  "ending_time" timestamptz
);

CREATE TABLE "package" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "serial_number" text NOT NULL UNIQUE,
  "content_description" text NOT NULL,
  "weight" float NOT NULL,
  "volume" int NOT NULL,
  "worth" int NOT NULL,
  "sender_id" int NOT NULL REFERENCES place(id),
  "recipient_id" int NOT NULL REFERENCES place(id),
  "expedition_id" int REFERENCES expedition(id)
);

COMMIT;
BEGIN;

DROP TABLE IF EXISTS user,
package,
blacklisted_token,
place,
expedition,
status;

CREATE TABLE status (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name text NOT NULL
);

CREATE TABLE user (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email text NOT NULL,
  status_id int NOT NULL,
  CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status(id),
  password text NOT NULL,
  salt text NOT NULL
);

CREATE TABLE place (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  reference text NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  additional text,
  postal_code int NOT NULL,
  city text NOT NULL
);

CREATE TABLE expedition (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  driver_name text NOT NULL,
  vehicle_plate text NOT NULL,
  starting_time timestamp NOT NULL,
  ending_time timestamp
);

CREATE TABLE package (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  serial_number text NOT NULL,
  content_description text NOT NULL,
  weight float NOT NULL,
  volume int NOT NULL,
  worth int NOT NULL,
  sender_id int NOT NULL,
  CONSTRAINT fk_sender_id FOREIGN KEY (sender_id) REFERENCES place(id),
  recipient_id int NOT NULL,
  CONSTRAINT fk_recipient_id FOREIGN KEY (recipient_id) REFERENCES place(id),
  expedition_id int NOT NULL,
  CONSTRAINT fk_expedition_id FOREIGN KEY (expedition_id) REFERENCES expedition(id)
);

CREATE TABLE blacklisted_token (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  value text NOT NULL
);

COMMIT;
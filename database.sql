CREATE DATABASE pern_contact;

CREATE TABLE contacts (
    id SERIAL,
    c_uuid VARCHAR(255) NOT NULL,
    c_name VARCHAR(50) NOT NULL,
    c_email VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO contacts (
    c_uuid,
    c_name,
    c_email
)
VALUES
    (
        'd6c27f85-9ea6-4621-86e5-272a9540cbff',
        'Akmal',
        'akmal.smith@hotmail.com'
    ),
    (
        'Amirah',
        'mira.smith@gmail.com'
    );

-- .env Variables in Railway
-- PGHOST = containers-us-west-47.railway.app
-- PGPORT = 6021
-- PGUSER = postgres
-- PGPASSWORD = 5gtG4OWzeL4qWD67o2ff
-- PGDATABASE = railway
-- DATABASE_URL = postgresql://postgres:5gtG4OWzeL4qWD67o2ff@containers-us-west-47.railway.app:6021/railway
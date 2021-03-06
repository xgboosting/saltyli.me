# Actix-web REST API with JWT

A simple CRUD backend app using Actix-web, Diesel and JWT for an iot environmental managment system, basically a smart plug with sensors built on the ESP32

## Require

- [Rust Stable](https://rustup.rs)
- [Postgres](https://www.postgresql.org/)

### Set up 

- Rename `secret.key.sample` to `secret.key` or create your own key by running `head -c16 /dev/urandom > secret.key` in command line (Linux/UNIX only) and copy to `/src` folder
- Create a database in postgres cli or [pgAdmin](https://www.pgadmin.org/) tool
- Rename `.env.sample` to `.env` and update the database connection string in `DATABASE_URL` key.
- Create a file named `secret.key` in the src/ directory i.e. `tr -dc 'A-Za-z0-9{|}~' </dev/urandom | head -c 100  ; echo`
- run the database migrations and generate the schema
- `diesel migration run && diesel print-schema > src/schema.rs`
- Build with release profile: `cargo build --release`
- Run release binary in command line/terminal.
  - Windows: `target/release/saltylime.exe`
  - Linux/UNIX: `target/release/saltylime`
- Enjoy! 😄

## Start the API
 - `cargo watch -x run`
 - load the `insomnia.json` file into insomnia for testing
 - create an account
 - to use admin protected routes (hardware, sensor create) set the user's role you created to `admin` in the database manually
 - use the login url to login, put the jwt token in your insomnia environment as well as the correct port in your `.env` file

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

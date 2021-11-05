# PG CLI
A command-line tool to query PostgreSQL database with different args

Getting Started

    npm i

## DB Connection
Both `.env` and `config.js` are `.gitignore`d

### config.js
Priority 1: If this file is present, the script uses this.
- Add a config object to the root `config.js` file with this format
```js
{
  "db": {
    "user": "",
    "password": "",
    "host": "",
    "database": ""
  }
}
```

### .env
If config.js doesn't exist, the app uses the .env var
- Add a `DATABASE_NAME=my-database` to the `.env` file
- Alternatively, add the entire connection string as `DATABASE_URL` in `.env`

### Local Setup
If you would like this script to be available from the command line anywhere, recommended setup:
1. In `~/.bash_profile`
```sh
table () {
  node ~/proj/pg-cli $1 $2
}
```
2. In the root of __this project__, run from the terminal, to make it executable
```sh
chmod u+x index.js
```
3. Open a new terminal, and the command is now available as `table`.  Run it for usage instructions.

First arg is table name searching for
Second arg is column name searching for

Example: Searches for all columns that have "name" in the column name, within tables that have "dog" in the table name

    table dog name

#!/usr/bin/env node

const {db} = require('./db/index.js');

const tableName = process.argv[2];
const columnName = process.argv[3];


console.log(`
  Arguments:
  ---------------
  tableName: ${tableName}
  columnName: ${columnName}`
);

if(!tableName) {
  console.error(`USAGE:
  tableName columnName
  
  tableName == table name to search for
  columnName == column name to search for
  `);
  process.exit(1);
}
if(tableName === '*') {
  console.log('Searching COLUMNS only');
}
if(!columnName) {
  console.log('Searching TABLES only');
}

const init = async () => {
  const query = `
    select t.table_schema,
      t.table_name,
      c.column_name
    from information_schema.tables t
    inner join information_schema.columns c on c.table_name = t.table_name and c.table_schema = t.table_schema
    where t.table_name ilike :tableName
    ${columnName ? 'and c.column_name ilike :columnName' : ''}
    and t.table_schema not in ('information_schema', 'pg_catalog')
    and t.table_type = 'BASE TABLE'
    order by t.table_schema;
  `;
  const [rows, info] = await db.query(query, {
    replacements: {
      tableName: `%${tableName}%`,
      columnName: columnName ? `%${columnName}%` : ''
    }
  });
  if(!rows.length) return `NO RESULTS. \n Query: ${query}`
  else return rows;
}

init()
  .then(results => {
    console.log(`RESULTS: \n --------------- \n `, results)
  })
  .catch(({name, message}) => {
    console.error({name, message})
  })
  .finally(() => {
    process.exit(1);
  });

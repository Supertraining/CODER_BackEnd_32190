const { options } = require('./options/mariaDB')
const knex = require('knex')(options);


knex.schema.createTable('productos', table => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.float('precio').notNullable();
    table.string('imagen').notNullable();

})
.then(() => console.log('table created'))
.catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy();
});




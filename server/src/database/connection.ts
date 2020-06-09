import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'diego',
        password: '123456',
        database: 'nlw'
    },
});

export default connection;
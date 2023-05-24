const mongoose = require('mongoose');
const { connect, connection } = mongoose;
mongoose.set('strictQuery', false);
connect(process.env.DB_URL);

connection.on('connected', () => console.log('Connection established'));
connection.on('error', (err) => console.log('Connection unauthorized', err));

module.exports = connection;

const mongoose = require('mongoose');
const config = require('../config/database');

mongoose.connect(config.url, config.options);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB database`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

module.exports = mongoose;

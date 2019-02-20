const mongoose = require('mongoose');
const configs = require('../configs');

mongoose.Promise = Promise;

const dbs = process.env.NODE_ENV === 'production' ? configs.PRODUCTION_DB_SETTINGS : configs.DB_SETTINGS;

const dbURI = process.env.NODE_ENV === 'production' ?
`mongodb://${dbs.USERNAME}:${dbs.PASSWORD}@ds343985.mlab.com:43985/${dbs.NAME}` :
`mongodb://${dbs.HOST}:${dbs.PORT}/${dbs.NAME}`

module.exports = mongoose.createConnection(dbURI ,{useNewUrlParser: true});

module.exports = {
  HOST_NAME: 'localhost',
  NODE_PORT: process.env.PORT || 3000,
  PASSWORD_SALT: "jgb15vlshcv51vsfvjbhdb",
  DB_SETTINGS : {
    HOST : 'localhost',
    PORT : 27017,
    NAME : 'M_LEDGER'
  },
  PRODUCTION_DB_SETTINGS: {
    USERNAME: 'm_ledger',
    PASSWORD: 'm_ledger123',
    NAME: 'm_ledger'
  }
};

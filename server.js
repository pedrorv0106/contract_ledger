const http = require('http');
const app = require('./app');
const configs = require('./configs');
const port = process.env.PORT || configs.NODE_PORT;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

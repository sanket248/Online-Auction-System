const http = require('http');
const app = require('./index');

const port = 8000;

const server = http.createServer(app);

server.listen(port, () => console.log("App listening on port "+port));
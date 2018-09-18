import Nuxt from 'nuxt';
import express from 'express';
import http from 'http';
import WsServer from './WsServer';

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 2222;

app.set('port', port);

const server = http.createServer(app);
const wsServer = new WsServer(server);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);
app.use(nuxt.render);

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

server.listen(port, host)

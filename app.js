'use strict';

const Koa = require('koa');
const app = new Koa();
const Nuxt = require('nuxt');
const config = require('./nuxt.config.js');
config.dev = !(app.env === 'production');
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  nuxt.build().catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  })
}

app.use(async (ctx, next) => {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset
  await nuxt.render(ctx.req, ctx.res);
})

app.listen(2222, '192.168.0.14')

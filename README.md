# koa-json-router

![](https://api.travis-ci.org/swhite24/koa-json-router.svg?branch=master)

Simple wrapper for [koa-router@next](https://github.com/alexmingoia/koa-router/tree/master/) which assumes the resolved value from a handler is the desired return value.

## Installation

```shell
npm install koa-json-router
```

## Usage

```javascript
const Koa = require('koa');
const KoaJsonRouter = require('koa-json-router');

const app = new Koa();
const router = new KoaJsonRouter({ prefix: '/api' });

router.get('/foo', async ctx => {
  return {
    foo: 'bar'
  }
});

app.use(router.routes());

```

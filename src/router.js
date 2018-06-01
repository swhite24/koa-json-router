/**
 * Custom koa router wrapper
 */

const KoaRouter = require('koa-router');

module.exports = class Router extends KoaRouter {
  /**
   * Instantiate new router
   * @param {String} prefix
   * @constructor
   */
  constructor(options) {
    super(options || {});
  }

  /**
   * Get wrapper
   * @param {String} endpoint
   * @param {Function} handler
   */
  get(endpoint) {
    super.get(endpoint, this._wrap(Array.prototype.slice.call(arguments, 1)));
  }

  /**
   * Post wrapper
   * @param {String} endpoint
   * @param {Function} handler
   */
  post(endpoint) {
    super.post(endpoint, this._wrap(Array.prototype.slice.call(arguments, 1)));
  }

  /**
   * Put wrapper
   * @param {String} endpoint
   * @param {Function} handler
   */
  put(endpoint) {
    super.put(endpoint, this._wrap(Array.prototype.slice.call(arguments, 1)));
  }

  /**
   * Delete wrapper
   * @param {String} endpoint
   * @param {Function} handler
   */
  delete(endpoint) {
    super.delete(
      endpoint,
      this._wrap(Array.prototype.slice.call(arguments, 1))
    );
  }

  /**
   * Patch wrapper
   * @param {String} endpoint
   * @param {Function} handler
   */
  patch(endpoint) {
    super.patch(endpoint, this._wrap(Array.prototype.slice.call(arguments, 1)));
  }

  /**
   * Transform handlers to koa router style
   * @param {Array} handlers
   */
  _wrap(handlers) {
    return ctx => {
      return new Promise((resolve, reject) => {
        handlers
          .reduce((promise, handler) => {
            return promise.then(() => handler(ctx));
          }, Promise.resolve())
          .then(payload => {
            ctx.type = 'application/json';
            ctx.body = JSON.stringify(payload);
            ctx.status =
              (ctx.status && (ctx.status === 404 ? 200 : ctx.status)) || 200;
            resolve();
          })
          .catch(reject);
      });
    };
  }
};

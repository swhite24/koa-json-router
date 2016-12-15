
const KoaJsonRouter = require('../../src/router');
const { methods, handler, payload } = require('../util/data');

describe('koa-json-router', () => {
  it('should deliver a function', () => {
    expect(KoaJsonRouter).to.be.a('function');
  });

  describe('on instantiation', () => {
    const router = new KoaJsonRouter();

    beforeEach(() => {
      sinon.spy(router, '_wrap');
    });

    afterEach(() => {
      router._wrap.restore();
    });

    it('should deliver an object', () => {
      expect(router).to.be.a('object');
    });

    methods.forEach(method =>
      it(`should wrap ${ method } methods`, () => {
        router[method]('/foo');
        expect(router._wrap).to.have.been.called;
      })
    );

    it('should set body to returned value of wrapped handler', () =>
      new Promise((resolve, reject) => {
        const wrappedHandler = router._wrap([handler]);

        const ctx = {};
        wrappedHandler(ctx)
          .then(() => {
            expect(ctx.status).to.equal(200);
            expect(ctx.type).to.equal('application/json');
            expect(ctx.body).to.equal(JSON.stringify(payload));
            resolve();
          }).catch(err => reject(err));
      })
    );
  });
});


exports.methods = ['get', 'post', 'put', 'delete', 'patch'];
exports.payload = { foo: 'bar' };
exports.handler = () => new Promise(resolve => resolve(exports.payload));

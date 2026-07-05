import qrcode from './lib/main.js';

export default qrcode;

// generate/setErrorLevel rely on `this` internally, so bind the named exports
// to the module object — that makes `import { generate }` work standalone
// (the original CJS object required calling them as methods).
export const generate = qrcode.generate.bind(qrcode);
export const setErrorLevel = qrcode.setErrorLevel.bind(qrcode);
export const error = qrcode.error;

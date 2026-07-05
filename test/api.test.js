'use strict';

// Ported from the original qrcode-terminal mocha suite (test/main.js).

const assert = require('node:assert');
const { describe, it, beforeEach, afterEach } = require('node:test');
const qrcode = require('..');

describe('generate()', () => {
  describe('without a callback', () => {
    let logged;
    let original;
    beforeEach(() => {
      original = console.log;
      logged = false;
      console.log = () => { logged = true; };
    });
    afterEach(() => {
      console.log = original;
    });

    it('logs to the console', () => {
      qrcode.generate('test');
      assert.equal(logged, true);
    });
  });

  describe('with a callback', () => {
    it('calls the callback', () => {
      let called = false;
      qrcode.generate('test', () => { called = true; });
      assert.equal(called, true);
    });

    it('does not call console.log', () => {
      const original = console.log;
      let logged = false;
      console.log = () => { logged = true; };
      try {
        qrcode.generate('test', () => {});
      } finally {
        console.log = original;
      }
      assert.equal(logged, false);
    });
  });

  describe('the rendered QR code', () => {
    it('is a string', (t, done) => {
      qrcode.generate('test', (result) => {
        assert.equal(typeof result, 'string');
        done();
      });
    });

    it('does not end with a newline', (t, done) => {
      qrcode.generate('test', (result) => {
        assert.ok(!/\n$/.test(result));
        done();
      });
    });

    it('renders a small variant too', (t, done) => {
      qrcode.generate('test', { small: true }, (result) => {
        assert.equal(typeof result, 'string');
        assert.ok(result.length > 0);
        done();
      });
    });
  });

  describe('error level', () => {
    it('defaults to 1 (L)', () => {
      assert.equal(qrcode.error, 1);
    });

    it('ignores unknown levels', () => {
      qrcode.setErrorLevel('nonsense');
      assert.equal(qrcode.error, 1);
    });

    it('accepts valid levels and restores default', () => {
      qrcode.setErrorLevel('H');
      assert.equal(qrcode.error, 2);
      qrcode.setErrorLevel('L');
      assert.equal(qrcode.error, 1);
    });
  });
});

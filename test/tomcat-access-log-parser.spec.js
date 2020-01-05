'use strict';

const assert = require('assert');

const { parseCommonFormat } = require('../src');

describe('tomcat-access-log-parser', () => {

  describe('parseCommonFormat', () => {

    it('returns a string', () => {
      const logData = parseCommonFormat(
        '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482');
      assert(typeof logData === 'string');
    });

    it('parses the remoteHost attribute', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remoteHost, '127.0.0.1');
    });

    it('parses the remoteUser attribute if user is not authenticated', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remoteUser, null);
    });

    it('parses the remoteUser attribute if user is authenticated', () => {
      const logData = JSON.parse(
        parseCommonFormat(
          '127.0.0.1 - user_id [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remoteUser, 'user_id');
    });

    it('parses the datetime attribute according to universal time', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.deepStrictEqual(logData.datetime, '2019-11-24T01:59:52.000Z');
    });

    it('parses the request attribute', () => {
      const logData = JSON.parse(
        parseCommonFormat(
          '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET index.html" 200 482'));
      assert.strictEqual(logData.request, 'GET index.html');
    });

    it('parses the httpStatus attribute', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.httpStatus, 200);
    });

    it('parses the bytesSent attribute if value is zero', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 -'));
      assert.strictEqual(logData.bytesSent, null);
    });

    it('parses the bytesSent attribute if value is greater than zero', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.bytesSent, 482);
    });

  });

});

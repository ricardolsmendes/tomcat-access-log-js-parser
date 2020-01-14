'use strict';

const assert = require('assert');

const {
  parseCommonFormat,
  parseCommonFormatSnakeCaseKeys
} = require('../src');

describe('tomcat-access-log-parser', () => {

  describe('parseCommonFormat', () => {

    it('returns a string', () => {
      const logData = parseCommonFormat(
        '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482');
      assert(typeof logData === 'string');
    });

    it('parses the Remote Host field', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remoteHost, '127.0.0.1');
    });

    it('parses the Remote User field', () => {
      const logData = JSON.parse(
        parseCommonFormat(
          '127.0.0.1 - user_id [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remoteUser, 'user_id');
    });

    it('returns Remote User as null when there is no authenticated user info', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remoteUser, null);
    });

    it('parses the Datetime field according to universal time', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.deepStrictEqual(logData.datetime, '2019-11-24T01:59:52.000Z');
    });

    it('parses the Request field', () => {
      const logData = JSON.parse(
        parseCommonFormat(
          '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET index.html" 200 482'));
      assert.strictEqual(logData.request, 'GET index.html');
    });

    it('parses the HTTP Status field', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.httpStatus, 200);
    });

    it('parses the Bytes Sent field', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.bytesSent, 482);
    });

    it('returns Bytes Sent with zero value when appropriate', () => {
      const logData = JSON.parse(
        parseCommonFormat('127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 -'));
      assert.strictEqual(logData.bytesSent, 0);
    });

  });

  describe('parseCommonFormatSnakeCaseKeys', () => {

    it('replaces the remoteHost key by remote_host', () => {
      const logData = JSON.parse(
        parseCommonFormatSnakeCaseKeys(
          '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remote_host, '127.0.0.1');
      assert.strictEqual(logData.remoteHost, undefined);
    });

    it('replaces the remoteUser key by remote_user', () => {
      const logData = JSON.parse(
        parseCommonFormatSnakeCaseKeys(
          '127.0.0.1 - user_id [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.remote_user, 'user_id');
      assert.strictEqual(logData.remoteUser, undefined);
    });

    it('replaces the httpStatus key by http_status', () => {
      const logData = JSON.parse(
        parseCommonFormatSnakeCaseKeys(
          '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.http_status, 200);
      assert.strictEqual(logData.httpStatus, undefined);
    });

    it('replaces the bytesSent key by bytes_sent', () => {
      const logData = JSON.parse(
        parseCommonFormatSnakeCaseKeys(
          '127.0.0.1 - - [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
      assert.strictEqual(logData.bytes_sent, 482);
      assert.strictEqual(logData.bytesSent, undefined);
    });

  });

});

var assert = require('assert');

var logParser = require('../app/tomcat-access-log-parser');

describe('tomcat-access-log-parser', function() {

    describe('parseCommonFormat', function() {

        it('parses the remoteHost attribute', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - - [23/Nov/2019] "GET" 200 482'));
            assert.strictEqual(logData.remoteHost, '127.0.0.1');
        });

        it('parses the remoteUser attribute', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - user_id [23/Nov/2019] "GET" 200 482'));
            assert.strictEqual(logData.remoteUser, 'user_id');
        });

        it('parses the dateTime attribute', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - user_id [23/Nov/2019:23:59:52 -0200] "GET" 200 482'));
            assert.strictEqual(logData.dateTime, '23/Nov/2019:23:59:52 -0200');
        });

        it('parses the request attribute', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - user_id [23/Nov/2019] "GET index.html" 200 482'));
            assert.strictEqual(logData.request, 'GET index.html');
        });

        it('parses the httpStatus attribute', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - user_id [23/Nov/2019] "GET" 200 482'));
            assert.strictEqual(logData.httpStatus, '200');
        });

        it('parses the bytesSent attribute if value is greater than zero', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - user_id [23/Nov/2019] "GET" 200 482'));
            assert.strictEqual(logData.bytesSent, '482');
        });

        it('parses the bytesSent attribute if value is zero', function() {
            const logData = JSON.parse(logParser.parseCommonFormat(
                '127.0.0.1 - user_id [23/Nov/2019] "GET" 200 -'));
            assert.strictEqual(logData.bytesSent, '-');
        });

    });

});

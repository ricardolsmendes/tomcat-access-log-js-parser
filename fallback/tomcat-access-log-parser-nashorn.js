'use strict';

/**
 * From https://tomcat.apache.org/tomcat-8.0-doc/config/valve.html#Access_Log_Valve:
 *
 * The shorthand pattern pattern="common" corresponds to
 * the Common Log Format defined by '%h %l %u %t "%r" %s %b'.
 *
 * %h - Remote host name (or IP address if enableLookups for the connector is false);
 * %l - Remote logical username from identd (always returns '-');
 * %u - Remote user that was authenticated (if any), else '-';
 * %t - Date and time, in Common Log Format;
 * %r - First line of the request (method and request URI);
 * %s - HTTP status code of the response;
 * %b - Bytes sent, excluding HTTP headers, or '-' if zero.
 */
var MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

var COMMON_LOG_FORMAT_REGEX = new RegExp('' +
  /(.+)[\s]/.source + // 1 -> Remote host name
  /-[\s]/.source + // Remote logical username
  /(.+)[\s]/.source + // 2 -> Remote user that was authenticated
  /\[(.+)\][\s]/.source + // 3 -> Date and time
  /"(.+)"[\s]/.source + // 4 -> First line of the request
  /(\d{3})[\s]/.source + // 5 -> HTTP status code of the response
  /(.+)$/.source // 6 -> Bytes sent, excluding HTTP headers
);

var COMMON_LOG_FORMAT_DATETIME_REGEX = new RegExp('' +
  /(\d{2})\/(\w{3})\/(\d{4})/.source + // 1, 2, 3 -> day, month, year
  /:/.source +
  /(\d{2}):(\d{2}):(\d{2})[\s]/.source + // 4, 5, 6 -> hour, minute, second
  /(.{5})/.source // 7 -> timezone
);

function parseCommonFormat(line) {
  var matches = line.match(COMMON_LOG_FORMAT_REGEX);

  var remoteUser = matches[2];
  var bytesSent = matches[6];

  var logData = {};
  logData.remoteHost = matches[1];
  logData.remoteUser = remoteUser !== '-' ? remoteUser : null;
  logData.datetime = parseCommonFormatDatetime(matches[3]);
  logData.request = matches[4];
  logData.httpStatus = parseInt(matches[5]);
  logData.bytesSent = bytesSent !== '-' ? parseInt(bytesSent) : 0;

  return JSON.stringify(logData);
}

function parseCommonFormatSnakeCaseKeys(line) { // eslint-disable-line no-unused-vars
  var logData = JSON.parse(parseCommonFormat(line));
  var snakeCaseKeysLogData = {};

  for (var key in logData) {
    var snakeCaseKey = key.replace(/(.)([A-Z][a-z]+)/, '$1_$2').replace(/([a-z0-9])([A-Z])/,
      '$1_$2').toLowerCase();
    snakeCaseKeysLogData[snakeCaseKey] = logData[key];
  }

  return JSON.stringify(snakeCaseKeysLogData);
}

function parseCommonFormatDatetime(datetimeString) {
  var matches = datetimeString.match(COMMON_LOG_FORMAT_DATETIME_REGEX);

  return new Date(
    matches[3] + '-' + (MONTHS.indexOf(matches[2]) + 1).toString() + '-' + matches[1] + 'T' +
    matches[4] + ':' + matches[5] + ':' + matches[6] + '.000' + matches[7]
  );
}

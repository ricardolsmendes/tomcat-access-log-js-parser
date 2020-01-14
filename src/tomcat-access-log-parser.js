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
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const COMMON_LOG_FORMAT_REGEX = new RegExp('' +
  /(?<remoteHost>.+)[\s]/.source +
  /-[\s]/.source +
  /(?<remoteUser>.+)[\s]/.source +
  /\[(?<datetime>.+)\][\s]/.source +
  /"(?<request>.+)"[\s]/.source +
  /(?<httpStatus>\d{3})[\s]/.source +
  /(?<bytesSent>.+)$/.source
);

const COMMON_LOG_FORMAT_DATETIME_REGEX = new RegExp('' +
  /(?<day>\d{2})\/(?<month>\w{3})\/(?<year>\d{4})/.source +
  /:/.source +
  /(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})[\s]/.source +
  /(?<timezone>.{5})/.source
);

function parseCommonFormat(line) {
  const matches = COMMON_LOG_FORMAT_REGEX.exec(line);

  const remoteUser = matches.groups.remoteUser;
  const bytesSent = matches.groups.bytesSent;

  const logData = {};
  logData.remoteHost = matches.groups.remoteHost;
  logData.remoteUser = remoteUser !== '-' ? remoteUser : null;
  logData.datetime = parseCommonFormatDatetime(matches.groups.datetime);
  logData.request = matches.groups.request;
  logData.httpStatus = parseInt(matches.groups.httpStatus);
  logData.bytesSent = bytesSent !== '-' ? parseInt(bytesSent) : null;

  return JSON.stringify(logData);
}

function parseCommonFormatSnakeCaseKeys(line) {
  const logData = JSON.parse(parseCommonFormat(line));
  const snakeCaseKeysLogData = {};

  Object.entries(logData).forEach(([key, value]) => {
    const snakeCaseKey = key.replace(/(.)([A-Z][a-z]+)/, '$1_$2').replace(/([a-z0-9])([A-Z])/,
      '$1_$2').toLowerCase();
    snakeCaseKeysLogData[snakeCaseKey] = value;
  });

  return JSON.stringify(snakeCaseKeysLogData);
}

function parseCommonFormatDatetime(datetimeString) {
  const matches = COMMON_LOG_FORMAT_DATETIME_REGEX.exec(datetimeString);
  const groups = matches.groups;

  return new Date(
    `${groups.year}-${(MONTHS.indexOf(groups.month) + 1).toString()}-${groups.day}` +
    `T${groups.hour}:${groups.minute}:${groups.second}.000${groups.timezone}`
  );
}

module.exports = {
  parseCommonFormat: parseCommonFormat,
  parseCommonFormatSnakeCaseKeys: parseCommonFormatSnakeCaseKeys
};

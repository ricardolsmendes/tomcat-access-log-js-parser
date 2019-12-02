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
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const commonLogFormatRegex = new RegExp('' +
  /(?<remoteHost>.+)[\s]/.source +
  /-[\s]/.source +
  /(?<remoteUser>.+)[\s]/.source +
  /\[(?<datetime>.+)\][\s]/.source +
  /"(?<request>.+)"[\s]/.source +
  /(?<httpStatus>\d{3})[\s]/.source +
  /(?<bytesSent>.+)$/.source
);

const commonLogFormatDatetimeRegex = new RegExp('' +
  /(?<day>\d{2})\/(?<month>\w{3})\/(?<year>\d{4})/.source +
  /:/.source +
  /(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})[\s]/.source +
  /(?<timezone>.{5})/.source
);

function parseCommonFormat(line) {

  const matches = commonLogFormatRegex.exec(line)

  const remoteUser = matches.groups.remoteUser;
  const bytesSent = matches.groups.bytesSent;

  var logData = {};
  logData.remoteHost = matches.groups.remoteHost;
  logData.remoteUser = remoteUser !== '-' ? remoteUser : null;
  logData.datetime = parseCommonFormatDatetime(matches.groups.datetime);
  logData.request = matches.groups.request;
  logData.httpStatus = parseInt(matches.groups.httpStatus);
  logData.bytesSent = bytesSent !== '-' ? parseInt(bytesSent) : null;

  return JSON.stringify(logData);
}

function parseCommonFormatDatetime(datetimeString) {

  const matches = commonLogFormatDatetimeRegex.exec(datetimeString)

  return new Date(
    matches.groups.year +
    '-' + (months.indexOf(matches.groups.month) + 1).toString() +
    '-' + matches.groups.day +
    'T' + matches.groups.hour +
    ':' + matches.groups.minute +
    ':' + matches.groups.second + '.000' +
    matches.groups.timezone
  );
}

module.exports = {
  parseCommonFormat
}

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
function parseCommonFormat(line) {
    const commonFormatRegex = new RegExp('' +
        /(?<remoteHost>.+)[\s]/.source +
        /-[\s]/.source +
        /(?<remoteUser>.+)[\s]/.source +
        /\[(?<dateTime>.+)\][\s]/.source +
        /"(?<request>.+)"[\s]/.source +
        /(?<httpStatus>\d{3})[\s]/.source +
        /(?<bytesSent>.+)$/.source
    );

    const matches = commonFormatRegex.exec(line)

    var logData = new Object();
    logData.remoteHost = matches.groups.remoteHost;
    logData.remoteUser = matches.groups.remoteUser;
    logData.dateTime = matches.groups.dateTime;
    logData.request = matches.groups.request;
    logData.httpStatus = matches.groups.httpStatus;
    logData.bytesSent = matches.groups.bytesSent;

    return JSON.stringify(logData);
}

module.exports = {
    parseCommonFormat
}

# tomcat-access-log-js-parser

Javascript function that parses a Tomcat access log [line] into a JSON string.

[![js-standard-style][1]][2] [![CircleCI][3]][4]

The `parseCommonFormat(line)` function was designed to use only JS native resources and return the
log line converted to a JSON string, so it may used by workloads running in restricted Node.js
environments.

For more features, types, and object-oriented design, please consider [access-logs-js-parser][5],
which is built upon this library and adds an abstraction layer over it.

[1]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[2]: http://standardjs.com
[3]: https://circleci.com/gh/ricardolsmendes/tomcat-access-log-js-parser.svg?style=svg
[4]: https://circleci.com/gh/ricardolsmendes/tomcat-access-log-js-parser
[5]: https://github.com/ricardolsmendes/access-logs-js-parser

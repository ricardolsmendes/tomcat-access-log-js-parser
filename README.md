# tomcat-access-log-js-parser

Javascript functions that parse a Tomcat access log line into a JSON string.

[![js-standard-style][1]][2] [![CircleCI][3]][4]

The `parseCommonFormat(line)` and `parseCommonFormatSnakeCaseKeys(line)` functions use only
built-in Javascript features and return the log entry converted into a JSON string. They were
designed to work properly even in resource-limited Node.js environments.

If you're looking for a higher-level design, please consider [access-logs-js-parser][5],
which is built upon this library and adds an abstraction layer over it.

_This repository is part a project described in the article
[Serverless ETL on Google Cloud, a case study: raw data into JSON Lines][6]._

[1]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[2]: http://standardjs.com
[3]: https://circleci.com/gh/ricardolsmendes/tomcat-access-log-js-parser.svg?style=svg
[4]: https://circleci.com/gh/ricardolsmendes/tomcat-access-log-js-parser
[5]: https://github.com/ricardolsmendes/access-logs-js-parser
[6]: https://medium.com/google-cloud/serverless-etl-on-google-cloud-a-case-study-raw-data-into-json-lines-d20711cd3917

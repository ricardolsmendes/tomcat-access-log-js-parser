# tomcat-access-log-js-parser

Javascript functions to parse a Tomcat access log line into a JSON string.

[![js-standard-style][1]][2] [![CircleCI][3]][4]

The `parseCommonFormat(line)` and `parseCommonFormatSnakeCaseKeys(line)` functions use only
built-in Javascript features and return the log entry converted into a JSON string. They were
designed to work properly even in resource-limited environments:

| COMPLIANT PLATFORM | LIBRARY VERSION | SOURCE FILE                                         |
| ------------------ | :-------------: | --------------------------------------------------- |
| Node.js 10+        |    Standard     | [./src/tomcat-access-log-parser.js][5]              |
| Nashorn JDK 8      |    Fallback     | [./fallback/tomcat-access-log-parser-nashorn.js][6] |

If you're looking for a higher-level design, please consider [access-logs-js-parser][7],
which is built upon this library and adds an abstraction layer over it.

_This repository is part a project described in the article
[Serverless ETL on Google Cloud, a case study: raw data into JSON Lines][8]._

## How to contribute

Please make sure to take a moment and read the [Code of
Conduct](https://github.com/ricardolsmendes/tomcat-access-log-js-parser/blob/master/.github/CODE_OF_CONDUCT.md).

### Report issues

Please report bugs and suggest features via the [GitHub
Issues](https://github.com/ricardolsmendes/tomcat-access-log-js-parser/issues).

Before opening an issue, search the tracker for possible duplicates. If you find a duplicate, please
add a comment saying that you encountered the problem as well.

### Contribute code

Please make sure to read the [Contributing
Guide](https://github.com/ricardolsmendes/tomcat-access-log-js-parser/blob/master/.github/CONTRIBUTING.md)
before making a pull request.

[1]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[2]: http://standardjs.com
[3]: https://circleci.com/gh/ricardolsmendes/tomcat-access-log-js-parser.svg?style=svg
[4]: https://circleci.com/gh/ricardolsmendes/tomcat-access-log-js-parser
[5]: ./src/tomcat-access-log-parser.js
[6]: ./fallback/tomcat-access-log-parser-nashorn.js
[7]: https://github.com/ricardolsmendes/access-logs-js-parser
[8]: https://medium.com/google-cloud/serverless-etl-on-google-cloud-a-case-study-raw-data-into-json-lines-d20711cd3917

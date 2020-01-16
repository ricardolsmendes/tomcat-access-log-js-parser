'use strict';

const {
  parseCommonFormat,
  parseCommonFormatSnakeCaseKeys
} = require('./tomcat-access-log-parser');

module.exports = {
  parseCommonFormat: parseCommonFormat,
  parseCommonFormatSnakeCaseKeys: parseCommonFormatSnakeCaseKeys
};

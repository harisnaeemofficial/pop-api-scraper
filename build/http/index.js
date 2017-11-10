'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IHttpService = exports.HttpService = exports.AbstractHttpService = undefined;

var _AbstractHttpService2 = require('./AbstractHttpService');

var _AbstractHttpService3 = _interopRequireDefault(_AbstractHttpService2);

var _HttpService2 = require('./HttpService');

var _HttpService3 = _interopRequireDefault(_HttpService2);

var _IHttpService2 = require('./IHttpService');

var _IHttpService3 = _interopRequireDefault(_IHttpService2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AbstractHttpService = _AbstractHttpService3.default; // Export the neseccary modules.

exports.HttpService = _HttpService3.default;
exports.IHttpService = _IHttpService3.default;
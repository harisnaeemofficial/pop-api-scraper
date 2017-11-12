'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _querystring = require('querystring');

var _IHttpService = require('./IHttpService');

var _IHttpService2 = _interopRequireDefault(_IHttpService);

var _package = require('../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class for making HTTP calls.
 * @abstract
 * @implements {IHttpService}
 * @type {AbstractHttpService}
 */
class AbstractHttpService extends _IHttpService2.default {

  /**
   * Create a new Request object.
   * @param {!string} baseUrl - The base url of the website to scrape.
   * @param {?Object} options={} - The default options for the HTTP requests.
   */


  /**
   * The default options for the HTTP requests.
   * @type {Object}
   */
  constructor({ baseUrl, options = {} }) {
    super();

    /**
     * The the base url of hte website to scrape.
     * @type {string}
     */
    this.baseUrl = baseUrl;
    /**
     * The default options for the HTTP requests.
     * @type {Object}
     */
    this.options = options;
    /**
     * Option to debug requests.
     * @type {Function}
     */
    this.debug = (0, _debug2.default)(`${_package.name}:Http`);
  }

  /**
   * Make a GET request.
   * @param {!string} [endpoint=''] - The endpoint to make the GET request to.
   * @param {?Object} [opts={}] - The options for the HTTP GET
   * request.
   * @param {?boolean} [raw=false] - Return json object.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */


  /**
   * Option to debug requests.
   * @type {Function}
   */


  /**
   * The base url of the website to scrape.
   * @type {string}
   */
  get(endpoint = '', opts = {}, raw = false) {
    return this._request('GET', endpoint, opts, raw);
  }

  /**
   * Make a POST request.
   * @param {!string} [endpoint] - The endpoint to make the POST request to.
   * @param {?Object} [opts={}] - The options for the HTTP POST
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  post(endpoint, opts = {}) {
    return this._request('POST', endpoint, opts);
  }

  /**
   * Make a PUT request.
   * @param {!string} [endpoint] - The endpoint to make the PUT request to.
   * @param {?Object} [opts={}] - The options for the HTTP PUT
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  put(endpoint, opts = {}) {
    return this._request('PUT', endpoint, opts);
  }

  /**
   * Make a DELETE request.
   * @param {!string} [endpoint] - The endpoint to make the DELETE request to.
   * @param {?Object} [opts={}] - The options for the HTTP DELETE
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  delete(endpoint, opts = {}) {
    return this._request('DELETE', endpoint, opts);
  }

  /**
   * Handle the body response string.
   * @param {!string} body - The body to parse.
   * @param {?boolean} raw - Return the raw body.
   * @returns {Function|string} -  The raw body or the body parsed by
   * cheerio.
   */
  handleBody(body, raw) {
    if (raw) {
      return body;
    }

    return _cheerio2.default.load(body);
  }

  /**
   * Print the debug message.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} uri - The uri of the HTTP request.
   * @param {?Object} opts=this._opts - The options for the HTTP request.
   * @returns {undefined}
   */
  printDebug(method, uri, opts) {
    let msg = `Making ${method} request to: ${uri}`;

    if (opts) {
      const { body, query, form } = opts;
      msg += body ? `?${(0, _querystring.stringify)(body)}` : query ? `?${(0, _querystring.stringify)(query)}` : form ? `?${(0, _querystring.stringify)(form)}` : '';
    }

    this.debug(msg);
  }

  /**
   * Make a HTTP request.
   * @param {!string} method - The method of the HTTP request.
   * @param {?string} [endpoint] - The endpoint to make the HTTP request to.
   * @param {?Object} [opts] - The options for the HTTP request.
   * @param {?boolean} [raw] - Return the raw body.
   * @throws {Error} - Using default method: '_request'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  _request(method, endpoint, opts, raw) {
    return super._request(method, endpoint, opts, raw);
  }

}
exports.default = AbstractHttpService; // Import the necessary modules.
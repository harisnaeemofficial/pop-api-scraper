'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Import the necessary modules.


var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _url = require('url');

var _fs = require('fs');

var _AbstractHttpService = require('./AbstractHttpService');

var _AbstractHttpService2 = _interopRequireDefault(_AbstractHttpService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class for making HTTP calls with the got library.
 * @extends {HttpService}
 * @type {HttpService}
 */
class HttpService extends _AbstractHttpService2.default {

  /**
   * Create a new Request object.
   * @param {!PopApi} PopApi - The PopApi instance.
   * @param {!Object} options - The options for the HttpService middleware.
   * @param {!string} options.baseUrl - The base url of the website to scrape.
   * @param {?Object} options.options - The default options for the HTTP
   * requests.
   */
  constructor(PopApi, { baseUrl, options }) {
    super(PopApi, { baseUrl, options });
  }

  /**
   * Make a HTTP request.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} [endpoint] - The endpoint to make the HTTP request to.
   * @param {?Object} [opts] - The options for the HTTP request.
   * @param {?boolean} [raw] - Return the raw body.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  _request(method, endpoint, opts, raw) {
    const { href } = new _url.URL(endpoint, this.baseUrl);

    const options = _extends({}, this.options, opts, {
      method
    });
    this.printDebug(method, href, options);

    return (0, _got2.default)(href, options).then(({ body }) => this.handleBody(body, raw));
  }

  /**
   * Request to download an item.
   * @param {!string} endpoint - The uri to the item.
   * @param {!string} filePath - The name of the file to save the item.
   * @returns {Promise<string, Error>} - Message when it's finally
   * downloaded.
   */
  download(endpoint, filePath) {
    const { href } = new _url.URL(endpoint, this.baseUrl);
    this.printDebug('GET', href);

    return new Promise((resolve, reject) => {
      const stream = (0, _fs.createWriteStream)(filePath);
      const req = _got2.default.stream(href, this.options);

      req.on('error', err => {
        req.end();

        stream.end(() => (0, _fs.unlinkSync)(filePath));

        const error = new Error(`Error on: '${filePath}', uri: '${href}', ${err}`);
        return reject(error);
      });

      req.on('response', function () {
        this.pipe(stream);
        stream.on('finish', () => resolve(filePath));
      });
    });
  }

}
exports.default = HttpService;
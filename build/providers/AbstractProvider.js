'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pMap = require('p-map');

var _pMap2 = _interopRequireDefault(_pMap);

var _IProvider = require('./IProvider');

var _IProvider2 = _interopRequireDefault(_IProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The abstract provider for the strategy pattern.
 * @implements {IProvider}
 * @type {AbstractProvider}
 */
// Import the necessary.
class AbstractProvider extends _IProvider2.default {

  /**
   * Create a nwe AbstractProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the AbstractProvider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   * @param {!number} [maxWebRequests=2] - The max allowed concurrent web
   * requests.
   */


  /**
   * The max allowed concurrent web requests.
   * @type {number}
   */
  constructor(PopApiScraper, { configs, maxWebRequests = 2 }) {
    super();

    /**
     * The max allowed concurrent web requests.
     * @type {number}
     */
    this.maxWebRequests = maxWebRequests;
    /**
     * The configs fro the abstract provider.
     * @type {Array<Object>}
     */
    this._configs = configs;
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the scraped
   * configurations.
   */


  /**
   * The configs fro the abstract provider.
   * @type {Array<Object>}
   */
  scrapeConfigs() {
    return (0, _pMap2.default)(this._configs, config => this.scrapeConfig(config));
  }

}
exports.default = AbstractProvider;
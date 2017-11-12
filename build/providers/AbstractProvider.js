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
   * @param {!string} options.name - The name of the provider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   */


  /**
   * The name of the provider.
   * @type {string}
   */
  constructor(PopApiScraper, { name, configs }) {
    super();

    /**
     * the name of the provider.
     * @type {string}
     */
    this._name = name;
    /**
     * The configs fro the abstract provider.
     * @type {Array<Object>}
     */
    this._configs = configs;
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the
   * scraped configurations.
   */


  /**
   * The configs fro the abstract provider.
   * @type {Array<Object>}
   */
  getContents() {
    return (0, _pMap2.default)(this._configs, config => this.getContent(config));
  }

}
exports.default = AbstractProvider;
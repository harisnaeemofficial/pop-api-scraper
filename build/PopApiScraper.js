'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _pMap = require('p-map');

var _pMap2 = _interopRequireDefault(_pMap);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class for Initiating the scraping process.
 * @type {AbstractScraper}
 */
class PopApiScraper {

  /**
   * Create a new BaseScraper object.
   * The base modules for popcorn-api
   * @external {PopApi} https://github.com/ChrisAlderson/pop-api
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @param {!Object} options - The options for the BaseScraper middleware.
   * @param {!string} options.statusPath = - The path of the status file.
   * @param {!string} options.updatedPath - The path of the updated file.
   */


  /**
   * The path of the status file. Default is `./tmp/status.json`.
   * @type {string}
   */


  /**
   * A map of the installed plugins.
   * @type {Map<any>}
   */
  constructor(PopApi, {
    statusPath,
    updatedPath
  }) {
    /**
     * The context to execute the providers in.
     * @type {Context}
     */
    this._context = new _Context2.default();
    /**
     * The path of the status file. Default is `./tmp/status.json`.
     * @type {string}
     */
    this._statusPath = statusPath;
    /**
     * The path of the updated file. Default is `./tmp/updated.json`.
     * @type {string}
     */
    this._updatedPath = updatedPath;

    _fsExtra2.default.createWriteStream(this._statusPath).end();
    _fsExtra2.default.createWriteStream(this._updatedPath).end();

    PopApi.scraper = this;
  }

  /**
   * Get the status object.
   * @returns {Promise<string, Error>} - The status of the scraping process.
   */


  /**
   * The path of the updated file. Default is `./tmp/updated.json`.
   * @type {string}
   */


  /**
   * The context to execute the providers in.
   * @type {Context}
   */
  getStatus() {
    return _fsExtra2.default.readFile(this._statusPath, 'utf8');
  }

  /**
   * Updates the `status.json` file.
   * @param {!string} status - The status which will be set to in the
   * `status.json` file.
   * @returns {Promise<undefined, Error>} - 'ok' if saved, or the error is there
   * is one.
   */
  setStatus(status) {
    return _fsExtra2.default.writeFile(this._statusPath, status, 'utf8');
  }

  /**
   * Get the updated object.
   * @returns {Promise<number, Error>} - The status of the scraping process.
   */
  getUpdated() {
    return _fsExtra2.default.readFile(this._updatedPath, 'utf8').then(res => Number(res));
  }

  /**
   * Updates the `updated.json` file.
   * @param {!number} updated - The epoch time when the API last started
   * scraping.
   * @returns {Promise<undefined, Error>} - 'ok' if saved, or the error is there
   * is one.
   */
  setUpdated(updated) {
    return _fsExtra2.default.writeFile(this._updatedPath, String(updated), 'utf8');
  }

  /**
   * Register middleware for the PopApi framework.
   * @param {!Function} Plugin - The plugin to use.
   * @param {!Object} args - The arguments passed down to the constructor of
   * the plugin.
   * @returns {Promise<PopApiScraper>} - The PopApi instance with the installed
   * plugins.
   */
  static use(Plugin, ...args) {
    if (PopApiScraper._installedPlugins.has(Plugin)) {
      return this;
    }

    const plugin = typeof Plugin === 'function' ? new Plugin(this, ...args) : null;

    if (plugin) {
      PopApiScraper._installedPlugins.set(Plugin, plugin);
    }

    return this;
  }
  /**
   * Initiate the scraping.
   * @returns {Promise<Array<Object>, Error>} - The array of the scraped
   * content.
   */
  async scrape() {
    await this.setUpdated(Math.floor(new Date().getTime() / 1000));

    return (0, _pMap2.default)(PopApiScraper._installedPlugins.values(), async provider => {
      this._context.provider = provider;
      await this.setStatus(`Scraping: ${provider.name}`);

      return this._context.execute();
    }, {
      concurrency: 1
    }).then(() => this.setStatus('idle'));
  }

}
exports.default = PopApiScraper; // Import the necessary modules.

PopApiScraper._installedPlugins = new Map();
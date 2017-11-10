'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _IScraper = require('./IScraper');

var _IScraper2 = _interopRequireDefault(_IScraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class for Initiating the scraping process.
 * @implements {IScraper}
 * @type {BaseScraper}
 */
// Import the necessary modules.
class BaseScraper extends _IScraper2.default {

  /**
   * Create a new BaseScraper object.
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @param {!Context} options.context - The context the run the providers in.
   * @param {!Object} options - The options for the BaseScraper middleware.
   * @param {!string} options.statusPath = - The path of the status file.
   * @param {!string} options.updatePath - The path of the updated file.
   */


  /**
   * The path of the status file. Default is `./tmp/status.json`.
   * @type {string}
   */
  constructor(PopApi, {
    context,
    statusPath,
    updatedPath
  }) {
    super();

    /**
     * The context to execute the providers in.
     * @type {Context}
     */
    this._context = context;
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

}
exports.default = BaseScraper;
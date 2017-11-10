'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IProvider = require('./IProvider');

var _IProvider2 = _interopRequireDefault(_IProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base context for the strategy pattern.
 * @type {Context}
 */
class Context {

  /**
   * Create a new Context object.
   * @param {IProvider} provider - The provider of the context to execute.
   */
  constructor(provider = new _IProvider2.default()) {
    /**
     * The provider of the context to execute.
     * @type {IProider}
     */
    this._provider = provider;
  }

  /**
   * Getter for the provider of the context.
   * @returns {IProvider} - The currently set provider.
   */


  /**
   * The provider of the context to execute.
   * @type {IProider}
   */
  get provider() {
    return this._provider;
  }

  /**
   * Setter for the provider of the context.
   * @param {!IProvider} provider - The provider to set.
   * @returns {undefined}
   */
  set provider(provider) {
    this._provider = provider;
  }

  /**
   * Execute the set provider.
   * @override
   * @returns {Promise<Array<Object>, Error>} - A list of scraped content.
   */
  execute() {
    return this.provider.search();
  }

}
exports.default = Context; // Import the necessary modules.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IProvider = require('./providers/IProvider');

var _IProvider2 = _interopRequireDefault(_IProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base context for the strategy pattern.
 * @type {Context}
 */
class Context {

  /**
   * Create a new Context object.
   * @param {?IProvider} [provider=new IProvider()] - The provider of the
   * context to execute.
   */
  constructor(provider = new _IProvider2.default()) {
    /**
     * The provider of the context to execute.
     * @type {IProvider}
     */
    this.provider = provider;
  }

  /**
   * Execute the set provider.
   * @override
   * @returns {Promise<Array<Object>, Error>} - A list of scraped content.
   */


  /**
   * The provider of the context to execute.
   * @type {IProvider}
   */
  execute() {
    return this.provider.getContents();
  }

}
exports.default = Context; // Import the necessary modules.
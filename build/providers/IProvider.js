'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Interface for scraping and content from various sources.
 * @interface
 * @type {IProvider}
 */
class IProvider {

  /**
   * Get the contents for a configuration.
   * @param {!Object} config - The config to get content with.
   * @abstract
   * @throws {Error} - Using default method: 'getContent'
   * @returns {Promise<Array<Object>, Error>} - The results of a configuration.
   */
  getContent(config) {
    throw new Error('Using default method: \'getContent\'');
  }

  /**
   * Get the contents for the configurations.
   * @abstract
   * @throws {Error} - Using default method: 'getContents'
   * @returns {Promise<Array<Object>, Error>} - The results of the
   * scrape configurations.
   */
  getContents() {
    throw new Error('Using default method: \'getContents\'');
  }

}
exports.default = IProvider;
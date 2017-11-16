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
   * @throws {Error} - Using default method: '_scrapeConfig'
   * @returns {Promise<Array<Object>, Error>} - The results of a configuration.
   */
  scrapeConfig(config) {
    throw new Error('Using default method: \'scrapeConfig\'');
  }

  /**
   * Get the contents for the configurations.
   * @abstract
   * @throws {Error} - Using default method: 'scrapeConfigs'
   * @returns {Promise<Array<Object>, Error>} - The results of the scrape
   * configurations.
   */
  scrapeConfigs() {
    throw new Error('Using default method: \'scrapeConfigs\'');
  }

}
exports.default = IProvider;
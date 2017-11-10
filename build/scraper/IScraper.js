'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Class for Initiating the scraping process.
 * @interface
 * @type {IScraper}
 */
class IScraper {

  /**
   *
   * @abstract
   * @throws {Error} - Using default method: 'scrape'
   * @returns {Error} - Error suggesting to implement this method.
   */
  scrape() {
    throw new Error('Using default method: \'scrape\'');
  }

}
exports.default = IScraper;
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
   * Default method to scrape the content.
   * @abstract
   * @throws {Error} - Using default method: 'search'
   * @returns {Error} - Error suggesting to implement this method.
   */
  search() {
    throw new Error('Using default method: \'search\'');
  }

}
exports.default = IProvider;
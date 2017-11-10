// @flow

/**
 * Interface for scraping and content from various sources.
 * @interface
 * @type {IProvider}
 */
export default class IProvider {

  /**
   * Default method to scrape the content.
   * @abstract
   * @throws {Error} - Using default method: 'search'
   * @returns {Error} - Error suggesting to implement this method.
   */
  search(): Promise<Array<Object> | Error> {
    throw new Error('Using default method: \'search\'')
  }

}

// @flow

/**
 * Class for Initiating the scraping process.
 * @interface
 * @type {IScraper}
 */
export default class IScraper {

  /**
   *
   * @abstract
   * @throws {Error} - Using default method: 'scrape'
   * @returns {Error} - Error suggesting to implement this method.
   */
  scrape(): Promise<Array<Object> | Error> {
    throw new Error('Using default method: \'scrape\'')
  }

}

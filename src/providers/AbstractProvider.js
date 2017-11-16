// Import the necessary.
// @flow
import pMap from 'p-map'

import IProvider from './IProvider'

/**
 * The abstract provider for the strategy pattern.
 * @implements {IProvider}
 * @type {AbstractProvider}
 */
export default class AbstractProvider extends IProvider {

  /**
   * The max allowed concurrent web requests.
   * @type {number}
   */
  maxWebRequests: number

  /**
   * The configs fro the abstract provider.
   * @type {Array<Object>}
   */
  _configs: Array<Object>

  /**
   * Create a nwe AbstractProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the AbstractProvider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   * @param {!number} [maxWebRequests=2] - The max allowed concurrent web
   * requests.
   */
  constructor(PopApiScraper: any, {configs, maxWebRequests = 2}: Object): void {
    super()

    /**
     * The max allowed concurrent web requests.
     * @type {number}
     */
    this.maxWebRequests = maxWebRequests
    /**
     * The configs fro the abstract provider.
     * @type {Array<Object>}
     */
    this._configs = configs
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the scraped
   * configurations.
   */
  scrapeConfigs(): Promise<Array<Object> | Error> {
    return pMap(this._configs, config => this.scrapeConfig(config))
  }

}

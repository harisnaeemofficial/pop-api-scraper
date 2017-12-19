// Import the necessary.
// @flow
import debug from 'debug'
import pMap from 'p-map'

import IProvider from './IProvider'
import { name as pkgName } from '../../package.json'

/**
 * The abstract provider for the strategy pattern.
 * @implements {IProvider}
 * @type {AbstractProvider}
 */
export default class AbstractProvider extends IProvider {

  /**
   * The name of the abstract provider.
   * @type {string}
   */
  name: string

  /**
   * The max allowed concurrent web requests.
   * @type {number}
   */
  maxWebRequests: number

  /**
   * The configs fro the abstract provider.
   * @type {Array<Object>}
   */
  configs: Array<Object>

  /**
   * The debug function for extra output.
   * @type {Function}
   */
  _debug: Function

  /**
   * Create a nwe AbstractProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the AbstractProvider.
   * @param {!string} name - The name of the AbstractProvider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   * @param {!number} [maxWebRequests=2] - The max allowed concurrent web
   * requests.
   */
  constructor(PopApiScraper: any, {
    name,
    configs,
    maxWebRequests = 2
  }: Object): void {
    super()

    /**
     * The name of the abstract provider.
     * @type {string}
     */
    this.name = name || this.constructor.name
    /**
     * The max allowed concurrent web requests.
     * @type {number}
     */
    this.maxWebRequests = maxWebRequests
    /**
     * The configs for the abstract provider.
     * @type {Array<Object>}
     */
    this.configs = configs
    /**
     * The debug function for extra output.
     * @type {Function}
     */
    this._debug = debug(`${pkgName}:Provider`)
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the scraped
   * configurations.
   */
  scrapeConfigs(): Promise<Array<Object> | Error> {
    return pMap(this.configs, config => {
      this._debug('Scraping configs: %o', config)
      return this.scrapeConfig(config)
    }, {
      concurrency: 1
    })
  }

}

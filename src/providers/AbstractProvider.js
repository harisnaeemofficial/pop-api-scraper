// Import the necessary.
// @flow
import pMap from 'p-map'

import IProvider from './IProvider'

/**
 * The abstract provider for the strategy pattern.
 * @implements {IProvider}
 * @type {AbstactProvider}
 */
export default class AbstractProvider extends IProvider {

  /**
   * The name of the provider.
   * @type {string}
   */
  _name: string

  /**
   * The configs fro the abstract provider.
   * @type {Array<Object>}
   */
  _configs: Array<Object>

  /**
   * Create a nwe AbstractProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the AbstractProvider.
   * @param {!string} options.name - The name of the provider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   */
  constructor(PopApiScraper: PopApiScraper, {name, configs}: Object): void {
    super()

    /**
     * the name of the provider.
     * @type {string}
     */
    this._name = name
    /**
     * The configs fro the abstract provider.
     * @type {Array<Object>}
     */
    this._configs = configs
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Array<Object>>, Error>} - The results of the
   * scraped configurations.
   */
  getContents(): Promise<Array<Array<Object>> | Error> {
    return pMap(this._configs, config => this.getContent(config))
  }

}

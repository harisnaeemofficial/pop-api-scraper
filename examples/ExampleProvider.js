// Import the necessary modules.
// @flow
import AbstractProvider from '../src/providers/AbstractProvider'
import HttpService from '../src/http/HttpService'
import type PopApiScraper from '../src/PopApiScraper'

/**
 * Example provider extending the abstract provider.
 * @extends {AbstractProvider}
 * @type {ExampleProvider}
 */
export default class ExampleProvider extends AbstractProvider {

  /**
   * The http service for the provider.
   * @type {HttpService}
   */
  _httpService: HttpService

  /**
   * Create a nwe AbstractProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the AbstractProvider.
   * @param {!string} options.name - The name of the provider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   */
  constructor(PopApiScraper: PopApiScraper, {name, configs}: Object): void {
    super(PopApiScraper, {name, configs})

    this._httpService = new HttpService({
      baseUrl: 'https://jsonplaceholder.typicode.com/'
    })
  }

  /**
   * Get the contents for a configuration.
   * @override
   * @param {!Object} config - The config to get content with.
   * @returns {Promise<Array<Object>, Error>} - The results of a configuration.
   */
  getContent(config: Object): Promise<Array<Object> | Error> {
    // Or use the HttpService to get  content from web apis or websites.
    return Promise.resolve([{
      key: 'value'
    }])
  }

}

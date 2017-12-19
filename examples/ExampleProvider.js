// Import the necessary modules.
// @flow
import {
  AbstractProvider,
  HttpService
} from '../src'

/**
 * Example provider extending the abstract provider.
 * @extends {AbstractProvider}
 * @type {ExampleProvider}
 */
export default class ExampleProvider extends AbstractProvider {

  /**
   * Create a nwe ExampleProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the ExampleProvider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   * @param {!number} [maxWebRequests=2] - The max allowed concurrent web
   * requests.
   */
  constructor(PopApiScraper: any, {name, baseUrl, configs, maxWebRequests = 2}: Object): void {
    super(PopApiScraper, {name, baseUrl, configs, maxWebRequests})
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the scraped
   * configurations.
   */
  scrapeConfig(config: Object): Promise<Array<Object> | Error> {
    // Or use the HttpService to get  content from web apis or websites.
    // return this.httpService.get()
    return Promise.resolve([{
      key: 'value'
    }])
  }

}

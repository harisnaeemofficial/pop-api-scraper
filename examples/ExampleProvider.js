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
   * The http service for the provider.
   * @type {HttpService}
   */
  _httpService: HttpService

  /**
   * Create a nwe ExampleProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the ExampleProvider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   * @param {!number} [maxWebRequests=2] - The max allowed concurrent web
   * requests.
   */
  constructor(PopApiScraper: any, {configs, maxWebRequests = 2}: Object): void {
    super(PopApiScraper, {configs, maxWebRequests})

    /**
     * The http service for the provider.
     * @type {HttpService}
     */
    this.httpService = new HttpService({
      baseUrl: 'https://jsonplaceholder.typicode.com/'
    })
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the scraped
   * configurations.
   */
  scrapeConfig(config: Object): Promise<Array<Object> | Error> {
    // Or use the HttpService to get  content from web apis or websites.
    return Promise.resolve([{
      key: 'value'
    }])
  }

}

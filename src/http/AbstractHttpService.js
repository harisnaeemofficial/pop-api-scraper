// Import the necessary modules.
// @flow
import cheerio from 'cheerio'
import debug from 'debug'
import { stringify } from 'querystring'

import IHttpService from './IHttpService'
import { name } from '../../package.json'

/**
 * Class for making HTTP calls.
 * @abstract
 * @implements {IHttpService}
 * @type {AbstractHttpService}
 */
export default class AbstractHttpService extends IHttpService {

  /**
   * The base url of the website to scrape.
   * @type {string}
   */
  baseUrl: string

  /**
   * The default options for the HTTP requests.
   * @type {Object}
   */
  options: Object

  /**
   * Option to debug requests.
   * @type {Function}
   */
  debug: Function

  /**
   * Create a new Request object.
   * @param {!PopApi} PopApi - The PopApi instance.
   * @param {!Object} options - The options to the HttpService middleware.
   * @param {!string} options.baseUrl - The base url of the website to scrape.
   * @param {?Object} options.options - The default options for the HTTP
   * requests.
   */
  constructor(PopApi: any, {baseUrl, options = {}}: Object): void {
    super()

    /**
     * The the base url of hte website to scrape.
     * @type {string}
     */
    this.baseUrl = baseUrl
    /**
     * The default options for the HTTP requests.
     * @type {Object}
     */
    this.options = options
    /**
     * Option to debug requests.
     * @type {Function}
     */
    this.debug = debug(`${name}:Http`)
  }

  /**
   * Make a GET request.
   * @param {!string} [endpoint=''] - The endpoint to make the GET request to.
   * @param {?Object} [opts={}] - The options for the HTTP GET
   * request.
   * @param {?boolean} [raw=false] - Return json object.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  get(
    endpoint?: string = '',
    opts?: Object = {},
    raw?: boolean = false
  ): Promise<any | Error> {
    return this._request('GET', endpoint, opts, raw)
  }

  /**
   * Make a POST request.
   * @param {!string} [endpoint] - The endpoint to make the POST request to.
   * @param {?Object} [opts={}] - The options for the HTTP POST
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  post(
    endpoint?: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    return this._request('POST', endpoint, opts)
  }

  /**
   * Make a PUT request.
   * @param {!string} [endpoint] - The endpoint to make the PUT request to.
   * @param {?Object} [opts={}] - The options for the HTTP PUT
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  put(
    endpoint?: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    return this._request('PUT', endpoint, opts)
  }

  /**
   * Make a DELETE request.
   * @param {!string} [endpoint] - The endpoint to make the DELETE request to.
   * @param {?Object} [opts={}] - The options for the HTTP DELETE
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  delete(
    endpoint?: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    return this._request('DELETE', endpoint, opts)
  }

  /**
   * Handle the body response string.
   * @param {!string} body - The body to parse.
   * @param {?boolean} raw - Return the raw body.
   * @returns {Function|string} -  The raw body or the body parsed by
   * cheerio.
   */
  handleBody(body: string, raw?: boolean): Function | string {
    if (raw) {
      return body
    }

    return cheerio.load(body)
  }

  /**
   * Print the debug message.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} uri - The uri of the HTTP request.
   * @param {?Object} opts=this._opts - The options for the HTTP request.
   * @returns {undefined}
   */
  printDebug(method: string, uri: string, opts?: Object): void {
    let msg = `Making ${method} request to: ${uri}`

    if (opts) {
      const { body, query, form } = opts
      msg += body
        ? `?${stringify(body)}`
        : query
          ? `?${stringify(query)}`
          : form
            ? `?${stringify(form)}`
            : ''
    }

    this.debug(msg)
  }

  /**
   * Make a HTTP request.
   * @param {!string} method - The method of the HTTP request.
   * @param {?string} [endpoint] - The endpoint to make the HTTP request to.
   * @param {?Object} [opts] - The options for the HTTP request.
   * @param {?boolean} [raw] - Return the raw body.
   * @throws {Error} - Using default method: '_request'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  _request(
    method: string,
    endpoint?: string,
    opts?: Object,
    raw?: boolean
  ): Promise<any | Error> {
    return super._request(method, endpoint, opts, raw)
  }

}

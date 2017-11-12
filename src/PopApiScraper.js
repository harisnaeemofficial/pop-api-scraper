// Import the necessary modules.
// @flow
import fs from 'fs-extra'
import pMap from 'p-map'

import type Context from './Context'

/**
 * Class for Initiating the scraping process.
 * @type {AbstractScraper}
 */
export default class PopApiScraper {

  /**
   * A map of the installed plugins.
   * @type {Map<any>}
   */
  static _installedPlugins: Map<string, any> = new Map()

  /**
   * The context to execute the providers in.
   * @type {Context}
   */
  _context: Context

  /**
   * The path of the status file. Default is `./tmp/status.json`.
   * @type {string}
   */
  _statusPath: string

  /**
   * The path of the updated file. Default is `./tmp/updated.json`.
   * @type {string}
   */
  _updatedPath: string

  /**
   * Create a new BaseScraper object.
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @param {!Context} options.context - The context the run the providers in.
   * @param {!Object} options - The options for the BaseScraper middleware.
   * @param {!string} options.statusPath = - The path of the status file.
   * @param {!string} options.updatePath - The path of the updated file.
   */
  constructor(PopApi: any, {
    context,
    statusPath,
    updatedPath
  }: Object): void {
    /**
     * The context to execute the providers in.
     * @type {Context}
     */
    this._context = context
    /**
     * The path of the status file. Default is `./tmp/status.json`.
     * @type {string}
     */
    this._statusPath = statusPath
    /**
     * The path of the updated file. Default is `./tmp/updated.json`.
     * @type {string}
     */
    this._updatedPath = updatedPath

    fs.createWriteStream(this._statusPath).end()
    fs.createWriteStream(this._updatedPath).end()

    PopApi.scraper = this
  }

  /**
   * Get the status object.
   * @returns {Promise<string, Error>} - The status of the scraping process.
   */
  getStatus(): Promise<string | Error> {
    return fs.readFile(this._statusPath, 'utf8')
  }

  /**
   * Updates the `status.json` file.
   * @param {!string} status - The status which will be set to in the
   * `status.json` file.
   * @returns {Promise<undefined, Error>} - 'ok' if saved, or the error is there
   * is one.
   */
  setStatus(status: string): Promise<string | Error> {
    return fs.writeFile(this._statusPath, status, 'utf8')
  }

  /**
   * Get the updated object.
   * @returns {Promise<number, Error>} - The status of the scraping process.
   */
  getUpdated(): Promise<number | Error> {
    return fs.readFile(this._updatedPath, 'utf8')
      .then(res => Number(res))
  }

  /**
   * Updates the `updated.json` file.
   * @param {!number} updated - The epoch time when the API last started
   * scraping.
   * @returns {Promise<undefined, Error>} - 'ok' if saved, or the error is there
   * is one.
   */
  setUpdated(updated: number): Promise<string | Error> {
    return fs.writeFile(this._updatedPath, String(updated), 'utf8')
  }

  /**
   * Register middleware for the PopApi framework.
   * @param {!Function} Plugin - The plugin to use.
   * @param {!Object} args - The arguments passed down to the constructor of
   * the plugin.
   * @returns {Promise<PopApi>} - The PopApi instance with the installed
   * plugins.
   */
  static use(Plugin: any, ...args: any): any {
    if (PopApiScraper._installedPlugins.has(Plugin)) {
      return this
    }

    const plugin = typeof Plugin === 'function'
      ? new Plugin(this, ...args)
      : null

    if (plugin) {
      PopApiScraper._installedPlugins.set(Plugin, plugin)
    }

    return this
  }
  /**
   * Initiate the scraping.
   * @returns {Promise<Array<Object>, Error>} - The array of the scraped
   * content.
   */
  scrape(): Promise<Array<Object> | Error> {
    this.setUpdated(Math.floor(new Date().getTime() / 1000))

    return pMap(PopApiScraper._installedPlugins.values(), provider => {
      this._context.provider = provider
      this.setStatus(`Scraping: ${provider.name}`)

      return this._context.execute()
    }, {
      concurrenct: 1
    }).then(() => this.setStatus('idle'))
  }

}
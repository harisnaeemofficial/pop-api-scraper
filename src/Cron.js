// Import the necessary modules.
// @flow
import debug from 'debug'
import cron from 'node-cron'

import { name } from '../package.json'

/**
 * Cron class for executing the scraper periodically.
 * @type {Cron}
 */
export default class Cron {

  /**
   * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
   * @type {string}
   */
  cronTime: string

  /**
   * The debug function for extra output.
   * @type {Function}
   */
  _debug: Function

  /**
   * Create a new Cron object.
   * @param {!PopApi} PopApi - The PopApi instance.
   * @param {!Object} [options={}] - The options for the Cron middleware.
   * @param {!string} [options.cronTime=0 0 *\/6 * * *] - The cron tab to
   * execute the scraper.
   * @param {?boolean} [options.start=false] - Start the cronjob on creation.
   */
  constructor(PopApi: any, {
    cronTime = '0 0 */6 * * *',
    start = false
  }: Object = {}): void {
    /**
     * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
     * @type {string}
     */
    this.cronTime = cronTime
    /**
     * The debug function for extra output.
     * @type {Function}
     */
    this._debug = debug(`${name}:Cron`)

    PopApi.cron = this.getCron(PopApi, start)
  }

  /**
   * Get the cron job to run.
   * @param {!PopApi} PopApi - The PopApi instance.
   * @param {?boolean} [start] - Start the cron job.
   * @returns {Object} - A configured cron job.
   */
  getCron(PopApi: any, start?: boolean): Object {
    this._debug(`Starting cron at ${Date.now()}`)
    return cron.schedule(this.cronTime, PopApi.scraper.scrape, start)
  }

}

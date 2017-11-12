// Import the necessary modules.
// @flow
import {
  /**
   * Cron for NodeJS.
   * @external {CronJob} - https://github.com/kelektiv/node-cron
   */
  CronJob
} from 'cron'

/**
 * Cron class for executing the scraper periodically.
 * @type {Cron}
 */
export default class Cron {

  /**
   * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
   * @type {string}
   */
  _cronTime: string

  /**
   * The timezone the con job will hold. Default is `America/Los_Angeles`.
   * @type {string}
   */
  _timeZone: string

  /**
   * Create a new Cron object.
   * @param {!PopApiScraper} PopApiScraper - The PopApiScraper instance.
   * @param {!Object} [options={}] - The options for the Cron middleware.
   * @param {!string} [options.cronTime=0 0 *\/6 * * *] - The cron tab to
   * execute the scraper.
   * @param {!string} [options.timeZone=America/Los_Angels] - The timezone the
   * cronjob will hold.
   */
  constructor(PopApiScraper: any, {
    cronTime = '0 0 */6 * * *',
    timeZone = 'America/Los_Angeles'
  }: Object = {}): void {
    /**
     * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
     * @type {string}
     */
    this._cronTime = cronTime
    /**
     * The timezone the con job will hold. Default is `America/Los_Angeles`.
     * @type {string}
     */
    this._timeZone = timeZone

    PopApiScraper.cron = this._getCron(PopApiScraper)
  }

  /**
   * Function execute on complete by the cron job.
   * @param {!PopApiScraper} PopApiScraper - The PopApiScraper instance.
   * @returns {Promise<string, Error>} - The promise to set the scraper
   * status .
   */
  _onComplete(PopApiScraper: any): Promise<string | Error> {
    return PopApiScraper.scraper.setStatus('Idle')
  }

  /**
   * Function executed on tick by the cron job.
   * @param {!PopApiScraper} PopApiScraper - The PopApiScraper instance.
   * @returns {Promise<Array<Object>, Error>} - The result of the scraping
   * process.
   */
  _onTick(PopApiScraper: any): Promise<Array<any> | Error> {
    return PopApiScraper.scraper.scrape()
  }

  /**
   * Get the cron job to run.
   * @param {!PopApiScraper} PopApiScraper - The PopApiScraper instance.
   * @param {?boolean} [start] - Start the cron job.
   * @returns {CronJob} - A configured cron job.
   */
  _getCron(PopApiScraper: any, start?: boolean): CronJob {
    return new CronJob({
      cronTime: this._cronTime,
      timeZone: this._timeZone,
      onComplete: this._onComplete.bind(PopApiScraper),
      onTick: this._onTick.bind(PopApiScraper),
      start
    })
  }

}

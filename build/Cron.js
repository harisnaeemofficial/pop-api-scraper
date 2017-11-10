'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cron = require('cron');

/**
 * Cron class for executing the scraper periodically.
 * @type {Cron}
 */
class Cron {

  /**
   * Create a new Cron object.
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @param {!Object} [options={}] - The options for the Cron middleware.
   * @param {!string} [options.cronTime=0 0 *\/6 * * *] - The cron tab to
   * execute the scraper.
   * @param {!string} [options.timeZone=America/Los_Angels] - The timezone the
   * cronjob will hold.
   */


  /**
   * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
   * @type {string}
   */
  constructor(PopApi, {
    cronTime = '0 0 */6 * * *',
    timeZone = 'America/Los_Angeles'
  } = {}) {
    /**
     * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
     * @type {string}
     */
    this._cronTime = cronTime;
    /**
     * The timezone the con job will hold. Default is `America/Los_Angeles`.
     * @type {string}
     */
    this._timeZone = timeZone;

    PopApi.cron = this._getCron(PopApi);
  }

  /**
   * Function execute on complete by the cron job.
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @returns {Promise<string, Error>} - The promise to set the scraper
   * status .
   */


  /**
   * The timezone the con job will hold. Default is `America/Los_Angeles`.
   * @type {string}
   */
  _onComplete(PopApi) {
    return PopApi.scraper.setStatus('Idle');
  }

  /**
   * Function executed on tick by the cron job.
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @returns {Promise<Array<Object>, Error>} - The result of the scraping
   * process.
   */
  _onTick(PopApi) {
    return PopApi.scraper.scrape();
  }

  /**
   * Get the cron job to run.
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @param {?boolean} [start] - Start the cron job.
   * @returns {CronJob} - A configured cron job.
   */
  _getCron(PopApi, start) {
    return new _cron.CronJob({
      cronTime: this._cronTime,
      timeZone: this._timeZone,
      onComplete: this._onComplete.bind(PopApi),
      onTick: this._onTick.bind(PopApi),
      start
    });
  }

}
exports.default = Cron; // Import the necessary modules.
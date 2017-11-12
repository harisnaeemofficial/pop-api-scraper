// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import del from 'del'
import mkdirp from 'mkdirp'
import { join } from 'path'
import { expect } from 'chai'

import Cron from '../src/Cron'
import PopApiScraper from '../src/PopApiScraper'

/** @test {Cron} */
describe('Cron', () => {
  /**
   * The Cron object to test.
   * @type {Cron}
   */
  let cron: Cron

  /**
   * The PopApi mock object.
   * @type {Object}
   */
  let PopApi: Object

  /**
   * The temporary directory to store the status and updated files.
   * @type {string}
   */
  let tempDir: string

  /**
   * Hook for setting up the Cron tests.
   * @type {Function}
   */
  before(() => {
    tempDir = join(...[
      __dirname,
      '..',
      'tmp'
    ])
    del.sync([tempDir])
    mkdirp(tempDir)

    const scraper = new PopApiScraper({}, {
      statusPath: join(...[tempDir, 'status.json']),
      updatedPath: join(...[tempDir, 'updated.json'])
    })

    PopApi = { scraper }
    cron = new Cron(PopApi)
  })

  /** @test {Context#constructor} */
  it('should test the constructor with options.', () => {
    new Cron({}, { // eslint-disable-line no-new
      cronTime: '0 0 */6 * * *',
      timeZone: 'America/Los_Angeles'
    })
  })

  /** @test {Cron#_onComplete} */
  it('should set the status to when the cronjob is completed', done => {
    cron._onComplete(PopApi).then(res => {
      expect(res).to.be.undefined
      done()
    }).catch(done)
  })

  /** @test {Cron#_onTick} */
  it('should execute the scrape method', done => {
    cron._onTick(PopApi).then(res => {
      expect(res).to.be.undefined
      done()
    }).catch(done)
  })

  /** @test {Cron#_getCron} */
  it('should get the cron object', () => {
    const res = cron._getCron(PopApi)
    expect(res).to.be.an('object')
  })

  /**
   * Hook for tearing down the Cron tests.
   * @type {Function}
   */
  after(() => {
    del.sync(tempDir)
  })
})

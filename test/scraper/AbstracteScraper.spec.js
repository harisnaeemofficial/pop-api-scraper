// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import del from 'del'
import mkdirp from 'mkdirp'
import { expect } from 'chai'
import { join } from 'path'

import AbstractScraper from '../../src/scraper/AbstractScraper'
import Context from '../../src/Context'

/** @test {AbstractScraper} */
describe('AbstractScraper', () => {
  /**
   * The AbstractScraper to test with.
   * @type {AbstractScraper}
   */
  let abstractScraper: AbstractScraper

  /**
   * The temporaty directory to store the status and updated files.
   * @type {string}
   */
  let tempDir: string

  /**
   * Hook for setting up the AbstractScraper tests.
   * @type {Function}
   */
  before(() => {
    tempDir = join(...[
      __dirname,
      '..',
      '..',
      'tmp'
    ])
    del.sync([tempDir])
    mkdirp(tempDir)

    abstractScraper = new AbstractScraper({}, {
      context: new Context(),
      statusPath: join(...[tempDir, 'status.json']),
      updatedPath: join(...[tempDir, 'updated.json'])
    })
  })

  /** @test {AbstractScraper#constructor} */
  it('should check the attributes of the AbstractScraper', () => {
    expect(abstractScraper._context).to.exist
    expect(abstractScraper._context).to.be.an('object')
    expect(abstractScraper._statusPath).to.exist
    expect(abstractScraper._statusPath).to.be.a('string')
    expect(abstractScraper._updatedPath).to.exist
    expect(abstractScraper._updatedPath).to.be.a('string')
  })

  /** @test {AbstractScraper#setStatus} */
  it('should set the status of the scraper', done => {
    abstractScraper.setStatus('status').then(res => {
      expect(res).to.be.undefined
      done()
    }).catch(done)
  })

  /** @test {AbstractScraper#getStatus} */
  it('should get the status of the scraper', done => {
    abstractScraper.getStatus().then(res => {
      expect(res).to.be.a('string')
      done()
    }).catch(done)
  })

  /** @test {AbstractScraper#setUpdated} */
  it('should set the updated status of the scraper', done => {
    abstractScraper.setUpdated(123456789).then(res => {
      expect(res).to.be.undefined
      done()
    }).catch(done)
  })

  /** @test {AbstractScraper#getUpdated} */
  it('should get the updated status of the scraper', done => {
    abstractScraper.getUpdated().then(res => {
      expect(res).to.be.a('number')
      done()
    }).catch(done)
  })

  /** @test {AbstractScraper#scrape} */
  it('should throw an error when calling the search method', () => {
    expect(abstractScraper.scrape).to
      .throw('Using default method: \'scrape\'')
  })

  /**
   * Hook for tearing down the AbstractScraper tests.
   * @type {Function}
   */
  after(() => {
    del.sync(tempDir)
  })
})

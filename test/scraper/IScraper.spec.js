// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import IScraper from '../../src/scraper/IScraper'

/** @test {IScraper} */
describe('IScraper', () => {
  /**
   * The IScraper object to be tested.
   * @type {IScraper}
   */
  let iScraper: IScraper

  /**
   * Hook for setting up the IScraper tests.
   * @type {Function}
   */
  before(() => {
    iScraper = new IScraper()
  })

  /** @test {IScraper#scrape} */
  it('should throw an error when calling the search method', () => {
    expect(iScraper.scrape).to
      .throw('Using default method: \'scrape\'')
  })
})

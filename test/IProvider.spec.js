// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import IProvider from '../src/IProvider'

/** @test {IProvider} */
describe('IProvider', () => {
  /**
   * The IProvider object to be tested.
   * @type {IProvider}
   */
  let iProvider: IProvider

  /**
   * Hook for setting up the IProvider tests.
   * @type {Function}
   */
  before(() => {
    iProvider = new IProvider()
  })

  /** @test {IProvider#search} */
  it('should throw an error when calling the search method', () => {
    expect(iProvider.search).to
      .throw('Using default method: \'search\'')
  })
})

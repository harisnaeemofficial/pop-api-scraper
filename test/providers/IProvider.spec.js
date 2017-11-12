// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import IProvider from '../../src/providers/IProvider'

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

  /** @test {IProvider#getContent} */
  it('should throw an error when calling the getContent method', () => {
    expect(iProvider.getContent).to
      .throw('Using default method: \'getContent\'')
  })

  /** @test {IProvider#getContents} */
  it('should throw an error when calling the getContents method', () => {
    expect(iProvider.getContents).to
      .throw('Using default method: \'getContents\'')
  })
})

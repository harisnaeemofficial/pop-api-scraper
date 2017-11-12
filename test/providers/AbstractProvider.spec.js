// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import AbstractProvider from '../../src/providers/AbstractProvider'

/** @test {AbstractProvider} */
describe('AbstractProvider', () => {
  /** @test {AbstractProvider#getContents} */
  it('should throw an error when calling the getContents method', done => {
    const abstractProvider = new AbstractProvider({}, {
      baseUrl: 'https://jsonplaceholder.typicode.com/',
      configs: [{}]
    })

    abstractProvider.getContents()
      .then(done)
      .catch(err => {
        expect(err).to.be.an('Error')
        done()
      })
  })
})

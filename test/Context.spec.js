// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import Context from '../src/Context'
import IProvider from '../src/IProvider'

/** @test {Context} */
describe('Context', () => {
  /**
   * The context object to test
   * @type {Context}
   */
  let context: Context

  /**
   * Hook for setting up the Context tests.
   * @type {Function}
   */
  before(() => {
    context = new Context()
  })

  /** @test {Context#_provider} */
  it('should check if Context has a _provider', () => {
    expect(context._provider).to.be.an('object')
  })

  /** @test {Context#execute} */
  it('should throw an error when executing the default provider', () => {
    expect(context.execute.bind(context)).to
      .throw('Using default method: \'search\'')
  })

  /** @test {Context#_provider} */
  it('should check if Context has a _provider', () => {
    const current = context.provider
    const iProvider = new IProvider()
    context.provider = iProvider

    expect(context._provider).to.not.equal(current)
    expect(context._provider).to.equal(iProvider)
  })
})

// Import the necessary modules.
// @flow
import IProvider from './IProvider'

/**
 * Base context for the strategy pattern.
 * @type {Context}
 */
export default class Context {

  /**
   * The provider of the context to execute.
   * @type {IProider}
   */
  _provider: IProvider

  /**
   * Create a new Context object.
   * @param {IProvider} provider - The provider of the context to execute.
   */
  constructor(provider: IProvider = new IProvider()): void {
    /**
     * The provider of the context to execute.
     * @type {IProider}
     */
    this._provider = provider
  }

  /**
   * Getter for the provider of the context.
   * @returns {IProvider} - The currently set provider.
   */
  get provider(): IProvider {
    return this._provider
  }

  /**
   * Setter for the provider of the context.
   * @param {!IProvider} provider - The provider to set.
   * @returns {undefined}
   */
  set provider(provider: IProvider): void {
    this._provider = provider
  }

  /**
   * Execute the set provider.
   * @override
   * @returns {Promise<Array<Object>, Error>} - A list of scraped content.
   */
  execute(): Promise<Array<Object> | Error> {
    return this.provider.search()
  }

}

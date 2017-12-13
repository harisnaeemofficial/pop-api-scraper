/* eslint-disable no-console */
import os from 'os'
import { PopApi } from 'pop-api'
import { join } from 'path'

import ExampleProvider from './ExampleProvider'
import { PopApiScraper } from '../src'

(async () => {
  try {
    PopApiScraper.use(ExampleProvider, {
      configs: [{
        key: 'value'
      }]
    })
    PopApi.use(PopApiScraper, {
      statusPath: join(...[os.tmpdir(), 'status.json']),
      updatedPath: join(...[os.tmpdir(), 'updated.json'])
    })

    const res = await PopApi.scraper.scrape()
    console.info(res[0])
  } catch (err) {
    console.error(err)
  }
})()

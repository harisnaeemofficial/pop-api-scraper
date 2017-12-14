/* eslint-disable no-console */
import os from 'os'
import { PopApi } from 'pop-api'
import { join } from 'path'

import ExampleProvider from './ExampleProvider'
import {
  Cron,
  PopApiScraper
} from '../src'

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
    PopApi.use(Cron, {
      cronTime: '0 0 */6 * * *',
      start: false
    })

    const res = await PopApi.scraper.scrape()
    console.info(res[0])
  } catch (err) {
    console.error(err)
  }
})()

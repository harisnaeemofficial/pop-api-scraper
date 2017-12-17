# pop-api-scraper

[![Build Status](https://travis-ci.org/ChrisAlderson/pop-api-scraper.svg?branch=development)](https://travis-ci.org/ChrisAlderson/pop-api-scraper)
[![Windows Build](https://img.shields.io/appveyor/ci/chrisalderson/pop-api-scraper/master.svg?label=windows)](https://ci.appveyor.com/project/ChrisAlderson/pop-api-sraper)
[![Coverage Status](https://coveralls.io/repos/github/ChrisAlderson/pop-api-scraper/badge.svg?branch=development)](https://coveralls.io/github/ChrisAlderson/pop-api-scraper?branch=development)
[![Dependency Status](https://david-dm.org/ChrisAlderson/pop-api-scraper.svg)](https://david-dm.org/ChrisAlderson/pop-api-scraper)
[![devDependencies Status](https://david-dm.org/ChrisAlderson/pop-api-scraper/dev-status.svg)](https://david-dm.org/ChrisAlderson/pop-api-scraper?type=dev)

**Warning:** this project is still unstable and there is no documentation for
it. Use it at your own risk.

## Features

The pop-api-scraper project aims to provide the core modules for the
[`popcorn-api`](https://github.com/popcorn-official/popcorn-api) scraper, but
can also be used for other purposes by using middleware.
 - Strategy pattern with providers
 - Cronjobs
 - Scraper wrapper class
 - HttpService with [`got`](https://github.com/sindresorhus/got)

## Usage

```js
import { AbstractProvider, HttpService } from 'pop-api-scraper'

export default class ExampleProvider extends AbstractProvider {

  constructor(PopApiScraper: any, {configs, maxWebRequests = 2}: Object): void {
    super(PopApiScraper, {configs, maxWebRequests})

    this.httpService = new HttpService({
      baseUrl: 'https://jsonplaceholder.typicode.com/'
    })
  }

  scrapeConfig(config: Object): Promise<Array<Object> | Error> {
    return this.httpService.get('/posts/1', {
      json: true
    })
  }

}
```

```js
import os from 'os'
import { Cron, PopApiScraper } from 'pop-api-scraper'
import { PopApi } from 'pop-api'
import { join } from 'path'

import ExampleProvider from './ExampleProvider'

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
```

## License

MIT License

"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var pMap=_interopDefault(require("p-map")),cron=require("cron"),fs=_interopDefault(require("fs-extra")),cheerio=_interopDefault(require("cheerio")),debug=_interopDefault(require("debug")),querystring=require("querystring"),got=_interopDefault(require("got")),url=require("url"),fs$1=require("fs");class IProvider{scrapeConfig(e){throw new Error("Using default method: 'scrapeConfig'")}scrapeConfigs(){throw new Error("Using default method: 'scrapeConfigs'")}}class AbstractProvider extends IProvider{constructor(e,{configs:t,maxWebRequests:r=2}){super(),this.maxWebRequests=r,this.configs=t}scrapeConfigs(){return pMap(this.configs,e=>this.scrapeConfig(e),{concurrency:1})}}class Context{constructor(e=new IProvider){this.provider=e}execute(){return this.provider.scrapeConfigs()}}class Cron{constructor(e,{cronTime:t="0 0 */6 * * *",timeZone:r="America/Los_Angeles"}={}){this.cronTime=t,this.timeZone=r,e.cron=this._getCron(e)}_onComplete(e){return e.scraper.setStatus("Idle")}_onTick(e){return e.scraper.scrape()}_getCron(e,t){return new cron.CronJob({cronTime:this.cronTime,timeZone:this.timeZone,onComplete:this._onComplete.bind(e),onTick:this._onTick.bind(e),start:t})}}class PopApiScraper{constructor(e,{statusPath:t,updatedPath:r}){this.context=new Context,this.statusPath=t,this.updatedPath=r,fs.createWriteStream(this.statusPath).end(),fs.createWriteStream(this.updatedPath).end(),e.scraper=this}getStatus(){return fs.readFile(this.statusPath,"utf8")}setStatus(e){return fs.writeFile(this.statusPath,e,"utf8")}getUpdated(){return fs.readFile(this.updatedPath,"utf8").then(e=>Number(e))}setUpdated(e){return fs.writeFile(this.updatedPath,String(e),"utf8")}static use(e,...t){if(PopApiScraper._installedPlugins.has(e))return this;const r="function"==typeof e?new e(this,...t):null;return r&&PopApiScraper._installedPlugins.set(e,r),this}async scrape(){return await this.setUpdated(Math.floor((new Date).getTime()/1e3)),pMap(PopApiScraper._installedPlugins.values(),async e=>(this.context.provider=e,await this.setStatus(`Scraping: ${e.name}`),this.context.execute()),{concurrency:1}).then(e=>(this.setStatus("idle"),e))}}PopApiScraper._installedPlugins=new Map;class IHttpService{get(e,t={},r=!1){throw new Error("Using default method: 'get'")}post(e,t={}){throw new Error("Using default method: 'post'")}put(e,t={}){throw new Error("Using default method: 'put'")}delete(e,t={}){throw new Error("Using default method: 'delete'")}download(e,t){throw new Error("Using default method: 'download'")}printDebug(e,t,r){throw new Error("Using default method: 'printDebug'")}request(e,t,r,s){throw new Error("Using default method: 'request'")}}var name="pop-api-scraper";class AbstractHttpService extends IHttpService{constructor({baseUrl:e,options:t={}}){super(),this.baseUrl=e,this.options=t,this.debug=debug(`${name}:Http`)}get(e="",t={},r=!1){return this.request("GET",e,t,r)}post(e,t={}){return this.request("POST",e,t)}put(e,t={}){return this.request("PUT",e,t)}delete(e,t={}){return this.request("DELETE",e,t)}handleBody(e,t){return t?e:cheerio.load(e)}printDebug(e,t,r){let s=`Making ${e} request to: ${t}`;if(r){const{body:e,query:t,form:i}=r;s+=e?`?${querystring.stringify(e)}`:t?`?${querystring.stringify(t)}`:i?`?${querystring.stringify(i)}`:""}this.debug(s)}}class HttpService extends AbstractHttpService{request(e,t,r,s){const{href:i}=new url.URL(t,this.baseUrl),n=Object.assign({},this.options,r,{method:e});return this.printDebug(e,i,n),got(i,n).then(({body:e})=>this.handleBody(e,s))}download(e,t){const{href:r}=new url.URL(e,this.baseUrl);return this.printDebug("GET",r),new Promise((e,s)=>{const i=fs$1.createWriteStream(t),n=got.stream(r,this.options);n.on("error",e=>{n.end(),i.end(()=>fs$1.unlinkSync(t));const o=new Error(`Error on: '${t}', uri: '${r}', ${e}`);return s(o)}),n.on("response",function(){this.pipe(i),i.on("finish",()=>e(t))})})}}exports.Context=Context,exports.Cron=Cron,exports.PopApiScraper=PopApiScraper,exports.AbstractHttpService=AbstractHttpService,exports.HttpService=HttpService,exports.IHttpService=IHttpService,exports.AbstractProvider=AbstractProvider,exports.IProvider=IProvider;

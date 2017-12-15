import pMap from"p-map";import cron from"node-cron";import fs from"fs-extra";import cheerio from"cheerio";import debug from"debug";import{stringify}from"querystring";import got from"got";import{URL}from"url";import{createWriteStream,unlinkSync}from"fs";class IProvider{scrapeConfig(t){throw new Error("Using default method: 'scrapeConfig'")}scrapeConfigs(){throw new Error("Using default method: 'scrapeConfigs'")}}class AbstractProvider extends IProvider{constructor(t,{configs:e,maxWebRequests:r=2}){super(),this.maxWebRequests=r,this.configs=e}scrapeConfigs(){return pMap(this.configs,t=>this.scrapeConfig(t),{concurrency:1})}}class Context{constructor(t=new IProvider){this.provider=t}execute(){return this.provider.scrapeConfigs()}}class Cron{constructor(t,{cronTime:e="0 0 */6 * * *",start:r=!1}={}){this.cronTime=e,t.cron=this.getCron(t,r)}getCron(t,e){return cron.schedule(this.cronTime,t.scraper.scrape,e)}}class PopApiScraper{constructor(t,{statusPath:e,updatedPath:r}){this.context=new Context,this.statusPath=e,this.updatedPath=r,fs.createWriteStream(this.statusPath).end(),fs.createWriteStream(this.updatedPath).end(),t.scraper=this}getStatus(){return fs.readFile(this.statusPath,"utf8")}setStatus(t){return fs.writeFile(this.statusPath,t,"utf8")}getUpdated(){return fs.readFile(this.updatedPath,"utf8").then(t=>Number(t))}setUpdated(t){return fs.writeFile(this.updatedPath,String(t),"utf8")}static use(t,...e){if(PopApiScraper._installedPlugins.has(t))return this;const r="function"==typeof t?new t(this,...e):null;return r&&PopApiScraper._installedPlugins.set(t,r),this}async scrape(){return await this.setUpdated(Math.floor((new Date).getTime()/1e3)),pMap(PopApiScraper._installedPlugins.values(),async t=>(this.context.provider=t,await this.setStatus(`Scraping: ${t.name}`),this.context.execute()),{concurrency:1}).then(t=>(this.setStatus("idle"),t))}}PopApiScraper._installedPlugins=new Map;class IHttpService{get(t,e={},r=!1){throw new Error("Using default method: 'get'")}post(t,e={}){throw new Error("Using default method: 'post'")}put(t,e={}){throw new Error("Using default method: 'put'")}delete(t,e={}){throw new Error("Using default method: 'delete'")}download(t,e){throw new Error("Using default method: 'download'")}printDebug(t,e,r){throw new Error("Using default method: 'printDebug'")}request(t,e,r,s){throw new Error("Using default method: 'request'")}}var name="pop-api-scraper";class AbstractHttpService extends IHttpService{constructor({baseUrl:t,options:e={}}){super(),this.baseUrl=t,this.options=e,this.debug=debug(`${name}:Http`)}get(t="",e={},r=!1){return this.request("GET",t,e,r)}post(t,e={}){return this.request("POST",t,e)}put(t,e={}){return this.request("PUT",t,e)}delete(t,e={}){return this.request("DELETE",t,e)}handleBody(t,e){return e?t:cheerio.load(t)}printDebug(t,e,r){let s=`Making ${t} request to: ${e}`;if(r){const{body:t,query:e,form:i}=r;s+=t?`?${stringify(t)}`:e?`?${stringify(e)}`:i?`?${stringify(i)}`:""}this.debug(s)}}class HttpService extends AbstractHttpService{request(t,e,r,s){const{href:i}=new URL(e,this.baseUrl),o=Object.assign({},this.options,r,{method:t});return this.printDebug(t,i,o),got(i,o).then(({body:t})=>this.handleBody(t,s))}download(t,e){const{href:r}=new URL(t,this.baseUrl);return this.printDebug("GET",r),new Promise((t,s)=>{const i=createWriteStream(e),o=got.stream(r,this.options);o.on("error",t=>{o.end(),i.end(()=>unlinkSync(e));const n=new Error(`Error on: '${e}', uri: '${r}', ${t}`);return s(n)}),o.on("response",function(){this.pipe(i),i.on("finish",()=>t(e))})})}}export{Context,Cron,PopApiScraper,AbstractHttpService,HttpService,IHttpService,AbstractProvider,IProvider};

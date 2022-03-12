(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.0"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.0"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.0"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),n=e=>e||a(t.precache),r=e=>e||a(t.runtime);function i(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class c{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const o=new Set;function h(e){return"string"==typeof e?new Request(e):e}s(873);class l{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new c,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=h(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=h(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const a=h(t);await(0,new Promise((e=>setTimeout(e,0))));const n=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=n.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:l,matchOptions:u}=this._strategy,d=await self.caches.open(l),f=this.hasCallback("cacheDidUpdate"),p=f?await async function(e,t,s,a){const n=i(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),c=await e.keys(t,r);for(const t of c)if(n===i(t.url,s))return e.match(t,a)}(d,n.clone(),["__WB_REVISION__"],u):null;try{await d.put(n,f?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of o)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:l,oldResponse:p,newResponse:c.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=h(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class u{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new l(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(t,s,a){let n;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(n=await r({error:e,event:a,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}class d extends u{async _handle(t,s){let a,n=await s.cacheMatch(t);if(n);else try{n=await s.fetchAndCachePut(t)}catch(e){e instanceof Error&&(a=e)}if(!n)throw new e("no-response",{url:t.url,error:a});return n}}const f={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class p extends u{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(f),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){const a=[],n=[];let r;if(this._networkTimeoutSeconds){const{id:e,promise:i}=this._getTimeoutPromise({request:t,logs:a,handler:s});r=e,n.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:t,logs:a,handler:s});n.push(i);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(n))||await i)());if(!c)throw new e("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let a;return{promise:new Promise((t=>{a=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:a}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:a}){let n,r;try{r=await a.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}return e&&clearTimeout(e),!n&&r||(r=await a.cacheMatch(t)),r}}s(80);const g=e=>e&&"object"==typeof e?e:{handle:e};class w{constructor(e,t,s="GET"){this.handler=g(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=g(e)}}class y extends w{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class m{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,g(e))}setCatchHandler(e){this._catchHandler=g(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let _;function R(t,s,a){let n;if("string"==typeof t){const e=new URL(t,location.href);n=new w((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)n=new y(t,s,a);else if("function"==typeof t)n=new w(t,s,a);else{if(!(t instanceof w))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}return(_||(_=new m,_.addFetchListener(),_.addCacheListener()),_).registerRoute(n),n}function v(e,t){const s=t();return e.waitUntil(s),s}function C(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}s(977);class b{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let U,L;class k extends u{constructor(e={}){e.cacheName=n(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(k.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=n.integrity,r=t.integrity,i=!r||r===e;a=await s.fetch(new Request(t,{integrity:r||e})),e&&i&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,a.clone()))}return a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==k.copyRedirectedCacheableResponsesPlugin&&(a===k.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(k.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}k.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},k.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===U){const e=new Response("");if("body"in e)try{new Response(e.body),U=!0}catch(e){U=!1}U=!1}return U}()?n.body:await n.blob();return new Response(c,i)}(t):t};class T{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new k({cacheName:n(e),plugins:[...t,new q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:n}=C(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(n,t),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return v(e,(async()=>{const t=new b;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return v(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}const x=()=>(L||(L=new T),L);class K extends w{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}const P={get googleAnalytics(){return e||a(t.googleAnalytics);var e},get precache(){return n()},get prefix(){return t.prefix},get runtime(){return r()},get suffix(){return t.suffix}};var N,E;E={prefix:"phi",precache:"precache",runtime:"runtime",suffix:"v1"},(e=>{for(const s of Object.keys(t))e(s)})((e=>{"string"==typeof E[e]&&(t[e]=E[e])})),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),console.log(P),R(/\.(html)$/,new p),R(/\.(css|js)$/,new d),R(/\.(css|js|mp3|wav|ogg|png|jpg|svg|webp)$/,new d({cacheName:"static-cache"})),R(/^https?:\/\/api\.(.*)/,new p),R(/alicdn\.com/,new d({cacheName:"alicdn-cache"})),N=[{'revision':'311fe76362696d70d5bf716aa2711031','url':'CNAME'},{'revision':'42e0320d1f3c448cadc745633b089ef7','url':'LevelOver/index.html'},{'revision':'4054a6b3d7cbc8bfa8913e4aa002d2fd','url':'aboutUs/index.html'},{'revision':'5c6434bf32a87d655c856b72a99a2e19','url':'assets/AboutUs.mp3'},{'revision':'dd214544ccc94533f92f8156b24201df','url':'assets/ChapterSelect0.mp3'},{'revision':'ed7c20fe9300b3cbbb2ccc9303b5c787','url':'assets/Exit.mp3'},{'revision':'ed63b8f1167ac0a209f465a5d3f47e33','url':'assets/Exo-Regular.otf'},{'revision':'1daa99dce9d2f95c1f459a0a19571b1f','url':'assets/LevelOver.mp3'},{'revision':'010a51d93da87c34acf53d94b2ad6913','url':'assets/Pause.mp3'},{'revision':'1cafdf3c20b1b76fa4e040adedc3f462','url':'assets/Start.mp3'},{'revision':'9d7a529ffceeb47e481402dfc11876e7','url':'assets/TapToStart.mp3'},{'revision':'ed7c20fe9300b3cbbb2ccc9303b5c787','url':'assets/audio/Exit.mp3'},{'revision':'010a51d93da87c34acf53d94b2ad6913','url':'assets/audio/Pause.mp3'},{'revision':'1cafdf3c20b1b76fa4e040adedc3f462','url':'assets/audio/Start.mp3'},{'revision':'01a21c5b20a4e483fe60ddcdc3fc639a','url':'assets/audio/selectSongItem.mp3'},{'revision':'4f4974bc314f67d8caa35063f3ea302c','url':'assets/calibrate.mp3'},{'revision':'e6e2156218030dae406e804d6b30f176','url':'assets/css/css.css'},{'revision':'ed63b8f1167ac0a209f465a5d3f47e33','url':'assets/css/fonts/Exo-Regular.otf'},{'revision':'ec52cd24512634ea111631a6ad52d6b0','url':'assets/css/fonts/Saira.woff2'},{'revision':'eb6269c0a7563808046993d0d00c4cb5','url':'assets/css/fonts/fonts.css'},{'revision':'d704148ad13ec9872def83149b005267','url':'assets/images/A15A.svg'},{'revision':'1d68d105b4355dac90dc28cf9f0fc674','url':'assets/images/AppIcon.png'},{'revision':'8ce1185efe2355820af08b7d388c0401','url':'assets/images/AppIcon.svg'},{'revision':'3fa38bdf7afe0f998631859ceb20046a','url':'assets/images/Avatar.svg'},{'revision':'c076ee69b6fb9b4f383ae83bab1dacea','url':'assets/images/B15B.svg'},{'revision':'dfe6f7287d5e31a24904c320d28dd80f','url':'assets/images/Back.svg'},{'revision':'83b2b54c11850b8226dbb535a35b3e9d','url':'assets/images/C15C.svg'},{'revision':'ef8d09221ef2c48a6482dea8829de2b8','url':'assets/images/ElementSqare.Half.Size.webp'},{'revision':'ce2e3e96e924301b8c11814cfa7bd3ec','url':'assets/images/F15F.svg'},{'revision':'ad92f55f5acfb3ddb5897253a0da9116','url':'assets/images/Restart.svg'},{'revision':'c393d1ba09820088d8bd84f8916a5e87','url':'assets/images/Resume.svg'},{'revision':'f5a86011a94a38a75499caefd36df698','url':'assets/images/S15S.svg'},{'revision':'ed47a05520cb60f84dd62b3f9e9ad943','url':'assets/images/Settings.svg'},{'revision':'edbccd1656c8617cd5924b76c8eb03df','url':'assets/images/Sort.svg'},{'revision':'11f2fd06d24c1bb0cb50cedf0b4f2f81','url':'assets/images/Tick.svg'},{'revision':'e46e7977854636d737fcaaf28085d07b','url':'assets/images/Title.svg'},{'revision':'813d98dcb27a4f371856e6bf0d2a2785','url':'assets/images/V15FC.svg'},{'revision':'991374d299974345a2e116f3d27fa7d4','url':'assets/images/V15V.svg'},{'revision':'998e72b5764119c168c8f00cd48b4ffd','url':'assets/images/phi15phi.svg'},{'revision':'081d6e79e6ad43d8c90f0feb97724fd2','url':'assets/images/showgirl_Half.png'},{'revision':'01a21c5b20a4e483fe60ddcdc3fc639a','url':'assets/selectSongItem.mp3'},{'revision':'081d6e79e6ad43d8c90f0feb97724fd2','url':'assets/showgirl_Half.png'},{'revision':'26f958e9ba53f2b585f4c5582490e14b','url':'assets/tips.json'},{'revision':'d1f3a16f0e373ef1ce62d0a42762677e','url':'cacheControl/index.html'},{'revision':'1558585718000454aa78dd1789880ee0','url':'chapterSelect/index.html'},{'revision':null,'url':'css/LevelOver.cf39ed999d862da8e37f.css'},{'revision':null,'url':'css/aboutUs.376e65b741836345424e.css'},{'revision':null,'url':'css/cacheControl.99cac4188f12985e2df5.css'},{'revision':null,'url':'css/calibrate.1295749e2677e2c3a61b.css'},{'revision':null,'url':'css/chapterSelect.eac31885b797988de909.css'},{'revision':null,'url':'css/index.4f8c89dfbc496c371b49.css'},{'revision':null,'url':'css/loadingChartScreen.7885077fb2bc7acaffd6.css'},{'revision':null,'url':'css/loadingScreen.1233dd4cda675980bb39.css'},{'revision':null,'url':'css/settings.1e4ab34f0a95b5bd11c7.css'},{'revision':null,'url':'css/songSelect.d2e0c83694c011b9982b.css'},{'revision':null,'url':'css/statistic.b8ebbdf7d06a4db18c40.css'},{'revision':null,'url':'css/tapToStart.b55eb43e873c37c97dbc.css'},{'revision':null,'url':'css/whilePlaying.555542e36c8d3185b62e.css'},{'revision':'656ef8176b28232ecbedf2fd721eced6','url':'favicon.ico'},{'revision':'f21167ddbd2e0da3b31ee19c0088d6c1','url':'index.html'},{'revision':null,'url':'js/LevelOver.3b0a09c5499093c98302.js'},{'revision':null,'url':'js/aboutUs.99c6ec180d8f42ada92c.js'},{'revision':null,'url':'js/cacheControl.2938f4f89e211d1bfa0b.js'},{'revision':null,'url':'js/calibrate.8568d951b186bee4cd98.js'},{'revision':null,'url':'js/chapterSelect.72fd54033a0fd53ec60f.js'},{'revision':null,'url':'js/index.33a420e63a3163f8c03c.js'},{'revision':null,'url':'js/loadingChartScreen.d4b4768b7430504a2fb1.js'},{'revision':null,'url':'js/loadingScreen.0f3c7b4343598e571515.js'},{'revision':null,'url':'js/settings.20f1e4e41457c26066e1.js'},{'revision':null,'url':'js/songSelect.9b9f34f70bf32989cc16.js'},{'revision':null,'url':'js/statistic.0fe254b2b2168e1d26c2.js'},{'revision':null,'url':'js/tapToStart.0751b12ac678809137c5.js'},{'revision':null,'url':'js/whilePlaying.4d54574f5d75077f865d.js'},{'revision':'fc39950e1654144e5adeb83769d24b87','url':'loadingChartScreen/index.html'},{'revision':'a9a2b2a1eceae7b2bc2385ba5558c452','url':'loadingScreen/index.html'},{'revision':'4fee86e106ec192d10adc40a589c38f5','url':'manifest.webmanifest'},{'revision':'d23336f15d9a6b007eeef4832bc1997c','url':'settings/calibrate/index.html'},{'revision':'f8111143ce6f1bdf5a5558451af92ea5','url':'settings/index.html'},{'revision':'5940e83f962785a439fce2356c03edbd','url':'settings/statistic/index.html'},{'revision':'31cbff00a9b9c9d1bb8ec1fbd83c4e77','url':'songSelect/index.html'},{'revision':'ee2b2ecc6153fc58274bd49304c4be5f','url':'src/whilePlaying/assets/Back.svg'},{'revision':'ad92f55f5acfb3ddb5897253a0da9116','url':'src/whilePlaying/assets/Restart.svg'},{'revision':'c393d1ba09820088d8bd84f8916a5e87','url':'src/whilePlaying/assets/Resume.svg'},{'revision':'a821b0bd5f26c95915f09576334d9929','url':'tapToStart/index.html'},{'revision':'597efb9adc233cd3f0505107f3923539','url':'whilePlaying/assets/0.png'},{'revision':'ee2b2ecc6153fc58274bd49304c4be5f','url':'whilePlaying/assets/Back.svg'},{'revision':'43cce78a0017d01f304d7416470a85a1','url':'whilePlaying/assets/Drag.ogg'},{'revision':'dfce8022a53eb9554b17aac6d8ec6625','url':'whilePlaying/assets/Drag.png'},{'revision':'76a0a4d3dab56687af40b773fca306b4','url':'whilePlaying/assets/DragHL.png'},{'revision':'ccfc345e4332b8659c8e13a60cd6c44c','url':'whilePlaying/assets/Flick.ogg'},{'revision':'67db91a6edafc4edccdea9512d79b5c8','url':'whilePlaying/assets/Flick.png'},{'revision':'5df033224b15b4d53e4d65aa307fa9fe','url':'whilePlaying/assets/FlickHL.png'},{'revision':'3d94dc948448272f83c036a10b3f4b38','url':'whilePlaying/assets/Hold.png'},{'revision':'78c723f54a5b5bdedb2803240fe1ae4f','url':'whilePlaying/assets/HoldEnd.png'},{'revision':'55c7e12e690f7f3046ee56828ecf9298','url':'whilePlaying/assets/HoldHL.png'},{'revision':'c686a75d112cdeae26cc5eedf5c2697a','url':'whilePlaying/assets/HoldHead.png'},{'revision':'a609ba1edf0d20eeef94d28deee5458c','url':'whilePlaying/assets/HoldHeadHL.png'},{'revision':'76be4882eee960a601197356d957c57c','url':'whilePlaying/assets/JudgeLine.png'},{'revision':'fcbaa5f5189ddb4b4bfbfbed9b0826f6','url':'whilePlaying/assets/Pause.png'},{'revision':'868060a5a1a2954151cb9c0d950be42f','url':'whilePlaying/assets/ProgressBar.png'},{'revision':'ad92f55f5acfb3ddb5897253a0da9116','url':'whilePlaying/assets/Restart.svg'},{'revision':'c393d1ba09820088d8bd84f8916a5e87','url':'whilePlaying/assets/Resume.svg'},{'revision':'45c0e5b4599ee330ae4e41de9eb9e655','url':'whilePlaying/assets/SongNameBar.png'},{'revision':'d2b36558c2192b7c87ce3c5511d33883','url':'whilePlaying/assets/Tap.ogg'},{'revision':'c3b87b9a39bd7e74f7a480dbe8969288','url':'whilePlaying/assets/Tap.png'},{'revision':'dbddde817782d51281eab0218f48a9fe','url':'whilePlaying/assets/Tap2.png'},{'revision':'cbd3d0f434f06207b05ec7393ee3ff39','url':'whilePlaying/assets/TapHL.png'},{'revision':'ba2abbfae5671ef1e24ea0d733fb3e40','url':'whilePlaying/assets/clickRaw.png'},{'revision':'c19662f575bcbde9b7d489f2b60117cf','url':'whilePlaying/assets/mute.ogg'},{'revision':'428211b15f25207bba8ec7c7d275430d','url':'whilePlaying/assets/oggmented-bundle.js'},{'revision':'c1cd3026012a43f37fb485b4d9cd14d8','url':'whilePlaying/assets/oldui/Drag.png'},{'revision':'f8f6ea308ca0ed084d311256c0022554','url':'whilePlaying/assets/oldui/Drag2HL.png'},{'revision':'0d6e9c5cf6c25a1cdaef0edfaab8a562','url':'whilePlaying/assets/oldui/Flick.png'},{'revision':'d95d458c46d3fc5039847ebcc3aa73b3','url':'whilePlaying/assets/oldui/Flick2HL.png'},{'revision':'9efd7c6e0603d30270ed02b0bf6e75ed','url':'whilePlaying/assets/oldui/HoldBody.png'},{'revision':'510e2b5cf58bfefcf5f66109887f1f6c','url':'whilePlaying/assets/oldui/HoldEnd.png'},{'revision':'e8c7811eebde796c1f377b52e8ea59e7','url':'whilePlaying/assets/oldui/Tap.png'},{'revision':'3a420bf85df452269394623d42e3db84','url':'whilePlaying/assets/oldui/Tap2.png'},{'revision':'f204385359f072cd7f53dcd1f6260afc','url':'whilePlaying/assets/oldui/Tap2HL.png'},{'revision':'151360165727237d232c504db1cedf33','url':'whilePlaying/assets/oldui/clickRaw.png'},{'revision':'19f9423281473eba0a30f2b212ed28bf','url':'whilePlaying/assets/playerFirendlyNote/FlickHL.png'},{'revision':'4db1cf4368c0c412cab3d93c29fb253d','url':'whilePlaying/assets/playerFirendlyNote/HoldHL.png'},{'revision':'308233ca2b801a9b01510f60720d95ef','url':'whilePlaying/assets/playerFirendlyNote/HoldHeadHL.png'},{'revision':'bb76798d928af7de2cf5136bfb9d5fd0','url':'whilePlaying/assets/playerFirendlyNote/TapHL.png'},{'revision':'57c9d59ca1af0b1d4197ac147fdc4b48','url':'whilePlaying/assets/stackblur.min.js'},{'revision':'67689a83be37aa4bbf6a45e3c9a83cc9','url':'whilePlaying/assets/stackblur.min.js.map'},{'revision':'f029968fa2d0b33d3dc7667bfc024cdb','url':'whilePlaying/index.html'}],x().precache(N),function(e){const t=x();R(new K(t,undefined))}()})()})();
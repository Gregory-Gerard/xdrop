(()=>{var e={757:(e,t,r)=>{e.exports=r(666)},669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),o=r(26),i=r(372),a=r(327),s=r(97),c=r(109),u=r(985),l=r(61);e.exports=function(e){return new Promise((function(t,r){var f=e.data,p=e.headers;n.isFormData(f)&&delete p["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";p.Authorization="Basic "+btoa(h+":"+m)}var v=s(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),a(v,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?c(d.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:n,config:e,request:d};o(t,r,i),d=null}},d.onabort=function(){d&&(r(l("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){r(l("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var y=(e.withCredentials||u(v))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;y&&(p[e.xsrfHeaderName]=y)}if("setRequestHeader"in d&&n.forEach(p,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),r(e),d=null)})),f||(f=null),d.send(f)}))}},609:(e,t,r)=>{"use strict";var n=r(867),o=r(849),i=r(321),a=r(185);function s(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var c=s(r(655));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=r(263),c.CancelToken=r(972),c.isCancel=r(502),c.all=function(e){return Promise.all(e)},c.spread=r(713),c.isAxiosError=r(268),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),o=r(327),i=r(782),a=r(572),s=r(185);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=c},782:(e,t,r)=>{"use strict";var n=r(867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,r)=>{"use strict";var n=r(793),o=r(303);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,o,i){var a=new Error(e);return n(a,t,r,o,i)}},572:(e,t,r)=>{"use strict";var n=r(867),o=r(527),i=r(502),a=r(655);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function u(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(e[o],t[o])}n.forEach(o,(function(e){n.isUndefined(t[e])||(r[e]=c(void 0,t[e]))})),n.forEach(i,u),n.forEach(a,(function(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(void 0,t[o])})),n.forEach(s,(function(n){n in t?r[n]=c(e[n],t[n]):n in e&&(r[n]=c(void 0,e[n]))}));var l=o.concat(i).concat(a).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return n.forEach(f,u),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(155),o=r(867),i=r(16),a={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c,u={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==n&&"[object process]"===Object.prototype.toString.call(n))&&(c=r(448)),c),transformRequest:[function(e,t){return i(t,"Accept"),i(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),o.forEach(["post","put","patch"],(function(e){u.headers[e]=o.merge(a)})),e.exports=u},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var a=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,a={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}})),a):a}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,r)=>{"use strict";var n=r(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!a(e)&&null!==e.constructor&&!a(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:a,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:l,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):i(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)l(arguments[n],r);return t},extend:function(e,t,r){return l(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},689:(e,t,r)=>{window.axios=r(669),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"},910:function(e,t,r){var n=this,o=r(877).v4;t.banner=function(e,t){var r,i=o();switch(t){case"error":r="bg-red-500";break;case"info":r="bg-indigo-500";break;case"success":r="bg-green-500"}document.querySelectorAll(".alert").forEach((function(e){return e.remove()})),document.querySelector("main header").after(n.html('\n        <div class="alert relative overflow-hidden shadow-md rounded py-2 px-4 '.concat(r,' text-white" id="alert-').concat(i,'">\n            <div class="alert__progression absolute left-0 inset-y-0 transition-all bg-black opacity-20 z-0"></div>\n\n            <div class="relative flex items-center justify-between w-full z-10">\n                <span>').concat(e,'</span>\n\n                <a href="#" class="alert__close transition transition-colors rounded-lg p-2 hover:bg-white hover:bg-opacity-10">\n                    <svg xmlns="http://www.w3.org/2000/svg"\n                         width="24"\n                         height="24"\n                         viewBox="0 0 24 24"\n                         fill="none"\n                         stroke="currentColor"\n                         stroke-width="2"\n                         stroke-linecap="round"\n                         stroke-linejoin="round"\n                         class="block">\n                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>\n                    </svg>\n                </a>\n            </div>\n        </div>\n    ')));var a=document.querySelector("#alert-".concat(i));return a.querySelector(".alert__close").addEventListener("click",(function(e){e.preventDefault(),e.target.closest(".alert").remove()})),{el:a,updateProgression:function(e){a.querySelector(".alert__progression").style.width="".concat(e,"%")}}},t.plural=function(e,t){return"".concat(e).concat(t>1?"s":"")},t.html=function(e){var t=document.createElement("template");return t.innerHTML=e,t.content}},155:e=>{var t,r,n=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var s,c=[],u=!1,l=-1;function f(){u&&s&&(u=!1,s.length?c=s.concat(c):l=-1,c.length&&p())}function p(){if(!u){var e=a(f);u=!0;for(var t=c.length;t;){for(s=c,c=[];++l<t;)s&&s[l].run();l=-1,t=c.length}s=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function h(){}n.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new d(e,t)),1!==c.length||u||a(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=h,n.addListener=h,n.once=h,n.off=h,n.removeListener=h,n.removeAllListeners=h,n.emit=h,n.prependListener=h,n.prependOnceListener=h,n.listeners=function(e){return[]},n.binding=function(e){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},666:e=>{var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var o=t&&t.prototype instanceof v?t:v,i=Object.create(o.prototype),a=new T(n||[]);return i._invoke=function(e,t,r){var n=f;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw i;return C()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=k(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=l(e,t,r);if("normal"===c.type){if(n=r.done?h:p,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=h,r.method="throw",r.arg=c.arg)}}}(e,r,a),i}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",m={};function v(){}function y(){}function g(){}var w={};w[i]=function(){return this};var x=Object.getPrototypeOf,b=x&&x(x(O([])));b&&b!==r&&n.call(b,i)&&(w=b);var E=g.prototype=v.prototype=Object.create(w);function S(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function r(o,i,a,s){var c=l(e[o],e,i);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,a,s)}),(function(e){r("throw",e,a,s)})):t.resolve(f).then((function(e){u.value=e,a(u)}),(function(e){return r("throw",e,a,s)}))}s(c.arg)}var o;this._invoke=function(e,n){function i(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(i,i):i()}}function k(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,k(e,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function A(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function O(e){if(e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}return{next:C}}function C(){return{value:t,done:!0}}return y.prototype=E.constructor=g,g.constructor=y,y.displayName=c(g,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,c(e,s,"GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},S(L.prototype),L.prototype[a]=function(){return this},e.AsyncIterator=L,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new L(u(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},S(E),c(E,s,"Generator"),E[i]=function(){return this},E.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=O,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(A),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),A(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:O(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}},877:(e,t,r)=>{var n=r(570),o=r(171),i=o;i.v1=n,i.v4=o,e.exports=i},75:e=>{for(var t=[],r=0;r<256;++r)t[r]=(r+256).toString(16).substr(1);e.exports=function(e,r){var n=r||0,o=t;return[o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],"-",o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]],o[e[n++]]].join("")}},217:e=>{var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var r=new Uint8Array(16);e.exports=function(){return t(r),r}}else{var n=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}},570:(e,t,r)=>{var n,o,i=r(217),a=r(75),s=0,c=0;e.exports=function(e,t,r){var u=t&&r||0,l=t||[],f=(e=e||{}).node||n,p=void 0!==e.clockseq?e.clockseq:o;if(null==f||null==p){var d=i();null==f&&(f=n=[1|d[0],d[1],d[2],d[3],d[4],d[5]]),null==p&&(p=o=16383&(d[6]<<8|d[7]))}var h=void 0!==e.msecs?e.msecs:(new Date).getTime(),m=void 0!==e.nsecs?e.nsecs:c+1,v=h-s+(m-c)/1e4;if(v<0&&void 0===e.clockseq&&(p=p+1&16383),(v<0||h>s)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=h,c=m,o=p;var y=(1e4*(268435455&(h+=122192928e5))+m)%4294967296;l[u++]=y>>>24&255,l[u++]=y>>>16&255,l[u++]=y>>>8&255,l[u++]=255&y;var g=h/4294967296*1e4&268435455;l[u++]=g>>>8&255,l[u++]=255&g,l[u++]=g>>>24&15|16,l[u++]=g>>>16&255,l[u++]=p>>>8|128,l[u++]=255&p;for(var w=0;w<6;++w)l[u+w]=f[w];return t||a(l)}},171:(e,t,r)=>{var n=r(217),o=r(75);e.exports=function(e,t,r){var i=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var a=(e=e||{}).random||(e.rng||n)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[i+s]=a[s];return t||o(a)}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=r(757),t=r.n(e);function n(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function s(e){i(a,n,o,s,c,"next",e)}function c(e){i(a,n,o,s,c,"throw",e)}s(void 0)}))}}r(689);var s=r(910),c=s.banner,u=s.plural,l=s.html;document.querySelector("#send").addEventListener("click",function(){var e=a(t().mark((function e(r){var o,i,a,s,u,l;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),i=document.querySelector('input[type="file"]').files,a=document.querySelector("textarea").value,0!==i.length||""!==a.trim()){e.next=5;break}return e.abrupt("return",c("Fichier(s) ou message requis !","error"));case 5:return s=c("En cours d'envoi","info"),(u=new FormData).append("message",a),n(i).forEach((function(e){return u.append("files[]",e)})),l=null,e.prev=10,e.next=13,axios.post("upload",u,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){s.updateProgression(Math.round(e.loaded/e.total*100))}});case 13:l=e.sent,e.next=29;break;case 16:if(e.prev=16,e.t0=e.catch(10),e.t0.response){e.next=20;break}return e.abrupt("return",c("Une erreur est survenue","error"));case 20:e.t1=e.t0.response.status,e.next=413===e.t1?23:429===e.t1?25:27;break;case 23:return c("Fichier trop gros (1 GB max.)","error"),e.abrupt("break",29);case 25:return c("Maximum 5 envois par minute","error"),e.abrupt("break",29);case 27:return c(null!==(o=e.t0.response.statusText)&&void 0!==o?o:"Une erreur est survenue","error"),e.abrupt("break",29);case 29:if(l){e.next=31;break}return e.abrupt("return");case 31:c('C\'est fait ! Voici votre code <strong class="block text-lg tracking-widest">'.concat(l.data.message,"</strong>"),"success");case 32:case"end":return e.stop()}}),e,null,[[10,16]])})));return function(t){return e.apply(this,arguments)}}()),document.querySelector('input[type="file"]').addEventListener("change",(function(e){var t=e.target;document.querySelector('label[for="files"] span').textContent=0!==t.files.length?"".concat(t.files.length," ").concat(u("fichier",t.files.length)," ").concat(u("sélectionné",t.files.length)):"Ajoutez vos fichiers"})),document.querySelector("#retrieve").addEventListener("submit",function(){var e=a(t().mark((function e(r){var o,i;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),4===(o=n(document.querySelectorAll('#retrieve input[type="text"][maxlength="1"]')).map((function(e){return e.value})).join("")).length){e.next=4;break}return e.abrupt("return",c("Code incorrect","error"));case 4:return e.prev=4,e.next=7,axios.get("retrieve/".concat(o));case 7:i=e.sent,e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(4),e.abrupt("return",c("Transfert introuvable","error"));case 13:n(document.querySelectorAll("main > *:not(header)")).forEach((function(e){return e.classList.add("hidden")})),document.querySelector("main").append(l('\n        <div class="shadow-md rounded text-black bg-white p-4">\n            <div class="flex items-center mb-4">\n                <a href="#" class="retrieve__close transition transition-colors mr-2 rounded-lg p-1.5 hover:bg-black hover:bg-opacity-10">\n                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>\n                </a>\n\n                <strong>Contenu du transfert</strong>\n            </div>\n\n            <ul>\n                '.concat(i.data.data.map((function(e){return"\n                    <li>".concat("message"===e.type?e.content:'<a href="retrieve/'.concat(o,"/download/").concat(e.id,'" target="_blank" class="text-indigo-500 hover:underline">Télécharger ').concat(e.original_name,"</a>"),"</li>\n                ")})).join(""),"\n            </ul>\n        </div>\n    "))),document.querySelector(".retrieve__close").addEventListener("click",(function(e){e.preventDefault(),e.target.closest(".bg-white").remove(),n(document.querySelectorAll("main > *:not(header)")).forEach((function(e){return e.classList.remove("hidden")}))}));case 16:case"end":return e.stop()}}),e,null,[[4,10]])})));return function(t){return e.apply(this,arguments)}}()),document.querySelectorAll('#retrieve input[type="text"]').forEach((function(e){return e.addEventListener("click",(function(e){return e.target.select()}))})),document.querySelectorAll('#retrieve input[type="text"]').forEach((function(e){return e.addEventListener("input",(function(e){return e.target.matches(":last-of-type")?document.querySelector("#retrieve__btn").focus():e.target.nextElementSibling.select()}))})),document.querySelectorAll('#retrieve input[type="text"]').forEach((function(e){return e.addEventListener("paste",(function(e){e.stopPropagation(),e.preventDefault();var t=(e.clipboardData||window.clipboardData).getData("text");4===t.length&&(document.querySelectorAll('#retrieve input[type="text"]').forEach((function(e,r){return e.value=t[r]})),document.querySelector("#retrieve__btn").focus())}))})),console.log("\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠟⠛⠛⠛⠛⠛⠛⠛⡛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠈⠒⠀⠀⠀⠈⠑⠂⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠷⠤⣄⠈⠛⠦⣀⠀⠑⠂⠀⠀⠀⠀⠀⠐⠂⠀⠀⠀⠀⠀⠀⠙⠒⠤⣘⣯⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⡿⠓⠢⢤⣀⠀⠀⠙⢦⡀⠈⠓⢤⡀⠀⠀⠉⠐⠠⢀⠀⠀⠈⠐⠄⡀⠈⠢⡀⠀⠀⠹⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⡷⡶⠤⣄⡈⠳⣤⡀⠀⠙⠲⣄⡀⠈⠓⠤⣀⡀⠀⠀⠑⠂⠀⠀⠀⢀⡐⠀⣈⣁⣠⡀⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⡿⠉⠻⣷⣤⡙⢦⣤⣍⣓⣦⣰⣶⡽⣷⣶⡟⠛⠿⠿⠶⠟⠛⠛⠛⠛⠋⠉⠉⠋⠈⠉⠙⠉⠉⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⠃⠀⠀⠀⠉⠛⢦⣙⡄⠀⠉⠉⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⠏⠀⢀⡀⠀⣀⣀⠀⠈⠏⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⢹⡄⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡀⣦⣀⣤⣶⣒⣶⣤⣀⠀⠀⠀⠀⠀⠀⢿⠀⢀⣠⡶⠛⠉⠻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⠙⠚⠛⣦⠤⡤⠬⡙⠓⠦⠀⠀⠀⠀⢸⡇⢿⡉⠀⠒⠢⡄⢹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⠇⠀⠆⠀⣻⣛⣂⣤⠜⠀⠀⠀⠀⠀⠀⠘⣏⠳⣽⣤⡴⠦⡌⡄⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⠏⠀⡌⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⠳⡄⢸⡇⠀⢀⠇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⡟⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣴⡋⠹⣗⡙⠻⡇⠀⠈⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⠁⠀⠀⠀⠀⠤⢄⠀⠀⠀⠀⠀⠀⠀⡜⢿⠀⠹⢦⡀⢨⡁⣇⢀⣼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣦⣤⣤⣶⣤⣤⡨⠀⢰⠖⠒⢤⡀⡼⡇⠈⠳⡀⠀⠀⠀⠙⣿⡏⠘⠦⠤⠤⠤⠴⠶⠦⠴⠖⠒⠋⢙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⡇⢠⡀⢨⡙⠦⢤⣸⠟⡆⢠⢻⠃⢷⠀⠀⠘⠦⠀⠀⠁⠈⢻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣷⣦⣵⣄⠉⡀⠀⠈⢿⠁⢴⡾⠀⠈⢧⡀⠀⠀⠀⠀⠀⠈⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣷⣿⣿⣿⣿⡟⠚⣿⠿⠶⠶⠶⣦⠃⡴⠶⠶⠶⠶⣶⠾⠷⠶⠶⠶⠶⠶⠶⣦⠀⣠⡴⠶⠛⠛⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⡟⠉⠁⠀⣿⠉⠄⢻⡀⠀⠀⠀⢸⣿⡇⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀⣿⣼⠋⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⢯⠇⠀⠀⠀⣼⠀⠈⢸⣧⠀⠀⠀⠈⣿⠀⠀⠀⠀⣼⣿⠀⠀⠀⠀⠀⣀⣀⣀⣿⡏⠀⠀⠀⠀⣴⣆⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡾⢀⠀⠀⢠⠏⠀⠀⢀⣿⡄⠀⠀⠀⠟⠀⠀⠀⢰⣏⣽⠀⠀⠀⠀⠀⣿⠀⠀⠸⡇⠀⠀⠀⠀⠻⣿⣀⣀⣀⣀⣼⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣄⣸⣤⣴⠋⠄⠀⡄⠈⡻⣧⠀⠀⠀⠀⠀⠀⠀⣾⠁⢸⠀⠀⠀⠀⠀⠛⠛⠛⣷⣷⡀⠀⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⡇⠙⠋⠈⣷⠀⠀⠀⠈⠀⠁⢹⡄⠀⠀⠀⠀⠀⢸⠇⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⣄⡀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡀⡀⠄⠀⠀⠆⠀⠀⡀⢀⣬⣷⠀⠀⠀⠀⢀⡟⠀⠀⢸⠀⠀⠀⠀⠀⣴⣶⣶⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣄⣠⣄⣀⣀⣠⣿⣿⣿⣿⠀⠀⠀⠀⢸⡇⣀⣠⣼⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⣿⣷⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠛⠛⠛⢻⣷⠀⠀⠀⠀⢻⡿⠀⠀⠀⠀⢸⡟⠛⠛⠛⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⡇⠀⠀⠀⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣤⣤⣼⣿⣿⣿⣿⣦⣤⣤⣤⣤⣤⣤⣤⣼⣿⣿⣷⣦⣤⣤⣤⣤⣤⣶⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n")})()})();
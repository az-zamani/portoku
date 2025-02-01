import{s as $,z as Fe,A as Le,B as Ae,C as oe,D as Re,E as Ne,g as M,G as Be,H as ze,I as $e,J as He,K as Ue,L as re}from"./entry.a006c892.js";const qe=()=>null;function Qe(...e){const o=typeof e[e.length-1]=="string"?e.pop():void 0;typeof e[0]!="string"&&e.unshift(o);let[t,r,n={}]=e;if(typeof t!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof r!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");n.server=n.server??!0,n.default=n.default??qe,n.lazy=n.lazy??!1,n.immediate=n.immediate??!0;const s=Ne(),i=()=>s.isHydrating?s.payload.data[t]:s.static.data[t],c=()=>i()!==void 0;s._asyncData[t]||(s._asyncData[t]={data:$(i()??n.default()),pending:$(!c()),error:Fe(s.payload._errors,t),status:$("idle")});const a={...s._asyncData[t]};a.refresh=a.execute=(u={})=>{if(s._asyncDataPromises[t]){if(u.dedupe===!1)return s._asyncDataPromises[t];s._asyncDataPromises[t].cancelled=!0}if((u._initial||s.isHydrating&&u._initial!==!1)&&c())return i();a.pending.value=!0,a.status.value="pending";const y=new Promise((g,d)=>{try{g(r(s))}catch(h){d(h)}}).then(g=>{if(y.cancelled)return s._asyncDataPromises[t];let d=g;n.transform&&(d=n.transform(g)),n.pick&&(d=Ve(d,n.pick)),a.data.value=d,a.error.value=null,a.status.value="success"}).catch(g=>{if(y.cancelled)return s._asyncDataPromises[t];a.error.value=g,a.data.value=M(n.default()),a.status.value="error"}).finally(()=>{y.cancelled||(a.pending.value=!1,s.payload.data[t]=a.data.value,a.error.value&&(s.payload._errors[t]=Be(a.error.value)),delete s._asyncDataPromises[t])});return s._asyncDataPromises[t]=y,s._asyncDataPromises[t]};const l=()=>a.refresh({_initial:!0}),f=n.server!==!1&&s.payload.serverRendered;{const u=Le();if(u&&!u._nuxtOnBeforeMountCbs){u._nuxtOnBeforeMountCbs=[];const g=u._nuxtOnBeforeMountCbs;u&&(Ae(()=>{g.forEach(d=>{d()}),g.splice(0,g.length)}),oe(()=>g.splice(0,g.length)))}f&&s.isHydrating&&c()?(a.pending.value=!1,a.status.value=a.error.value?"error":"success"):u&&(s.payload.serverRendered&&s.isHydrating||n.lazy)&&n.immediate?u._nuxtOnBeforeMountCbs.push(l):n.immediate&&l(),n.watch&&Re(n.watch,()=>a.refresh());const y=s.hook("app:data:refresh",g=>{if(!g||g.includes(t))return a.refresh()});u&&oe(y)}const p=Promise.resolve(s._asyncDataPromises[t]).then(()=>a);return Object.assign(p,a),p}function Ve(e,o){const t={};for(const r of o)t[r]=e[r];return t}function Kt(e,o,t){const[r={},n]=typeof o=="string"?[{},o]:[o,t],s=r.key||ze([n,M(r.baseURL),typeof e=="string"?e:"",M(r.params||r.query)]);if(!s||typeof s!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+s);if(!e)throw new Error("[nuxt] [useFetch] request is missing.");const i=s===n?"$f"+s:s,c=$e(()=>{let I=e;return typeof I=="function"&&(I=I()),M(I)});if(!r.baseURL&&typeof c.value=="string"&&c.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:a,lazy:l,default:f,transform:p,pick:u,watch:y,immediate:g,...d}=r,h=He({...d,cache:typeof r.cache=="boolean"?void 0:r.cache}),v={server:a,lazy:l,default:f,transform:p,pick:u,immediate:g,watch:y===!1?[]:[h,c,...y||[]]};let b;return Qe(i,()=>{var k;return(k=b==null?void 0:b.abort)==null||k.call(b),b=typeof AbortController<"u"?new AbortController:{},typeof c.value=="string"&&c.value.startsWith("/"),(r.$fetch||globalThis.$fetch)(c.value,{signal:b.signal,...h})},v)}const _=/^[a-z0-9]+(-[a-z0-9]+)*$/,N=(e,o,t,r="")=>{const n=e.split(":");if(e.slice(0,1)==="@"){if(n.length<2||n.length>3)return null;r=n.shift().slice(1)}if(n.length>3||!n.length)return null;if(n.length>1){const c=n.pop(),a=n.pop(),l={provider:n.length>0?n[0]:r,prefix:a,name:c};return o&&!F(l)?null:l}const s=n[0],i=s.split("-");if(i.length>1){const c={provider:r,prefix:i.shift(),name:i.join("-")};return o&&!F(c)?null:c}if(t&&r===""){const c={provider:r,prefix:"",name:s};return o&&!F(c,t)?null:c}return null},F=(e,o)=>e?!!((e.provider===""||e.provider.match(_))&&(o&&e.prefix===""||e.prefix.match(_))&&e.name.match(_)):!1,we=Object.freeze({left:0,top:0,width:16,height:16}),R=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),B=Object.freeze({...we,...R}),q=Object.freeze({...B,body:"",hidden:!1});function Ke(e,o){const t={};!e.hFlip!=!o.hFlip&&(t.hFlip=!0),!e.vFlip!=!o.vFlip&&(t.vFlip=!0);const r=((e.rotate||0)+(o.rotate||0))%4;return r&&(t.rotate=r),t}function se(e,o){const t=Ke(e,o);for(const r in q)r in R?r in e&&!(r in t)&&(t[r]=R[r]):r in o?t[r]=o[r]:r in e&&(t[r]=e[r]);return t}function Ge(e,o){const t=e.icons,r=e.aliases||Object.create(null),n=Object.create(null);function s(i){if(t[i])return n[i]=[];if(!(i in n)){n[i]=null;const c=r[i]&&r[i].parent,a=c&&s(c);a&&(n[i]=[c].concat(a))}return n[i]}return(o||Object.keys(t).concat(Object.keys(r))).forEach(s),n}function We(e,o,t){const r=e.icons,n=e.aliases||Object.create(null);let s={};function i(c){s=se(r[c]||n[c],s)}return i(o),t.forEach(i),se(e,s)}function xe(e,o){const t=[];if(typeof e!="object"||typeof e.icons!="object")return t;e.not_found instanceof Array&&e.not_found.forEach(n=>{o(n,null),t.push(n)});const r=Ge(e);for(const n in r){const s=r[n];s&&(o(n,We(e,n,s)),t.push(n))}return t}const Je={provider:"",aliases:{},not_found:{},...we};function H(e,o){for(const t in o)if(t in e&&typeof e[t]!=typeof o[t])return!1;return!0}function ve(e){if(typeof e!="object"||e===null)return null;const o=e;if(typeof o.prefix!="string"||!e.icons||typeof e.icons!="object"||!H(e,Je))return null;const t=o.icons;for(const n in t){const s=t[n];if(!n.match(_)||typeof s.body!="string"||!H(s,q))return null}const r=o.aliases||Object.create(null);for(const n in r){const s=r[n],i=s.parent;if(!n.match(_)||typeof i!="string"||!t[i]&&!r[i]||!H(s,q))return null}return o}const ie=Object.create(null);function Xe(e,o){return{provider:e,prefix:o,icons:Object.create(null),missing:new Set}}function C(e,o){const t=ie[e]||(ie[e]=Object.create(null));return t[o]||(t[o]=Xe(e,o))}function X(e,o){return ve(o)?xe(o,(t,r)=>{r?e.icons[t]=r:e.missing.add(t)}):[]}function Ye(e,o,t){try{if(typeof t.body=="string")return e.icons[o]={...t},!0}catch{}return!1}let E=!1;function Ie(e){return typeof e=="boolean"&&(E=e),E}function Ze(e){const o=typeof e=="string"?N(e,!0,E):e;if(o){const t=C(o.provider,o.prefix),r=o.name;return t.icons[r]||(t.missing.has(r)?null:void 0)}}function et(e,o){const t=N(e,!0,E);if(!t)return!1;const r=C(t.provider,t.prefix);return Ye(r,t.name,o)}function tt(e,o){if(typeof e!="object")return!1;if(typeof o!="string"&&(o=e.provider||""),E&&!o&&!e.prefix){let n=!1;return ve(e)&&(e.prefix="",xe(e,(s,i)=>{i&&et(s,i)&&(n=!0)})),n}const t=e.prefix;if(!F({provider:o,prefix:t,name:"a"}))return!1;const r=C(o,t);return!!X(r,e)}const Se=Object.freeze({width:null,height:null}),Ce=Object.freeze({...Se,...R}),nt=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ot=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function ce(e,o,t){if(o===1)return e;if(t=t||100,typeof e=="number")return Math.ceil(e*o*t)/t;if(typeof e!="string")return e;const r=e.split(nt);if(r===null||!r.length)return e;const n=[];let s=r.shift(),i=ot.test(s);for(;;){if(i){const c=parseFloat(s);isNaN(c)?n.push(s):n.push(Math.ceil(c*o*t)/t)}else n.push(s);if(s=r.shift(),s===void 0)return n.join("");i=!i}}const rt=e=>e==="unset"||e==="undefined"||e==="none";function st(e,o){const t={...B,...e},r={...Ce,...o},n={left:t.left,top:t.top,width:t.width,height:t.height};let s=t.body;[t,r].forEach(g=>{const d=[],h=g.hFlip,v=g.vFlip;let b=g.rotate;h?v?b+=2:(d.push("translate("+(n.width+n.left).toString()+" "+(0-n.top).toString()+")"),d.push("scale(-1 1)"),n.top=n.left=0):v&&(d.push("translate("+(0-n.left).toString()+" "+(n.height+n.top).toString()+")"),d.push("scale(1 -1)"),n.top=n.left=0);let w;switch(b<0&&(b-=Math.floor(b/4)*4),b=b%4,b){case 1:w=n.height/2+n.top,d.unshift("rotate(90 "+w.toString()+" "+w.toString()+")");break;case 2:d.unshift("rotate(180 "+(n.width/2+n.left).toString()+" "+(n.height/2+n.top).toString()+")");break;case 3:w=n.width/2+n.left,d.unshift("rotate(-90 "+w.toString()+" "+w.toString()+")");break}b%2===1&&(n.left!==n.top&&(w=n.left,n.left=n.top,n.top=w),n.width!==n.height&&(w=n.width,n.width=n.height,n.height=w)),d.length&&(s='<g transform="'+d.join(" ")+'">'+s+"</g>")});const i=r.width,c=r.height,a=n.width,l=n.height;let f,p;i===null?(p=c===null?"1em":c==="auto"?l:c,f=ce(p,a/l)):(f=i==="auto"?a:i,p=c===null?ce(f,l/a):c==="auto"?l:c);const u={},y=(g,d)=>{rt(d)||(u[g]=d.toString())};return y("width",f),y("height",p),u.viewBox=n.left.toString()+" "+n.top.toString()+" "+a.toString()+" "+l.toString(),{attributes:u,body:s}}const it=/\sid="(\S+)"/g,ct="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let at=0;function lt(e,o=ct){const t=[];let r;for(;r=it.exec(e);)t.push(r[1]);if(!t.length)return e;const n="suffix"+(Math.random()*16777216|Date.now()).toString(16);return t.forEach(s=>{const i=typeof o=="function"?o(s):o+(at++).toString(),c=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+n+"$3")}),e=e.replace(new RegExp(n,"g"),""),e}const Q=Object.create(null);function ft(e,o){Q[e]=o}function V(e){return Q[e]||Q[""]}function Y(e){let o;if(typeof e.resources=="string")o=[e.resources];else if(o=e.resources,!(o instanceof Array)||!o.length)return null;return{resources:o,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const Z=Object.create(null),T=["https://api.simplesvg.com","https://api.unisvg.com"],L=[];for(;T.length>0;)T.length===1||Math.random()>.5?L.push(T.shift()):L.push(T.pop());Z[""]=Y({resources:["https://api.iconify.design"].concat(L)});function ut(e,o){const t=Y(o);return t===null?!1:(Z[e]=t,!0)}function ee(e){return Z[e]}const dt=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let ae=dt();function ht(e,o){const t=ee(e);if(!t)return 0;let r;if(!t.maxURL)r=0;else{let n=0;t.resources.forEach(i=>{n=Math.max(n,i.length)});const s=o+".json?icons=";r=t.maxURL-n-t.path.length-s.length}return r}function pt(e){return e===404}const gt=(e,o,t)=>{const r=[],n=ht(e,o),s="icons";let i={type:s,provider:e,prefix:o,icons:[]},c=0;return t.forEach((a,l)=>{c+=a.length+1,c>=n&&l>0&&(r.push(i),i={type:s,provider:e,prefix:o,icons:[]},c=a.length),i.icons.push(a)}),r.push(i),r};function mt(e){if(typeof e=="string"){const o=ee(e);if(o)return o.path}return"/"}const yt=(e,o,t)=>{if(!ae){t("abort",424);return}let r=mt(o.provider);switch(o.type){case"icons":{const s=o.prefix,c=o.icons.join(","),a=new URLSearchParams({icons:c});r+=s+".json?"+a.toString();break}case"custom":{const s=o.uri;r+=s.slice(0,1)==="/"?s.slice(1):s;break}default:t("abort",400);return}let n=503;ae(e+r).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{t(pt(i)?"abort":"next",i)});return}return n=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?t("abort",s):t("next",n)});return}setTimeout(()=>{t("success",s)})}).catch(()=>{t("next",n)})},bt={prepare:gt,send:yt};function wt(e){const o={loaded:[],missing:[],pending:[]},t=Object.create(null);e.sort((n,s)=>n.provider!==s.provider?n.provider.localeCompare(s.provider):n.prefix!==s.prefix?n.prefix.localeCompare(s.prefix):n.name.localeCompare(s.name));let r={provider:"",prefix:"",name:""};return e.forEach(n=>{if(r.name===n.name&&r.prefix===n.prefix&&r.provider===n.provider)return;r=n;const s=n.provider,i=n.prefix,c=n.name,a=t[s]||(t[s]=Object.create(null)),l=a[i]||(a[i]=C(s,i));let f;c in l.icons?f=o.loaded:i===""||l.missing.has(c)?f=o.missing:f=o.pending;const p={provider:s,prefix:i,name:c};f.push(p)}),o}function ke(e,o){e.forEach(t=>{const r=t.loaderCallbacks;r&&(t.loaderCallbacks=r.filter(n=>n.id!==o))})}function xt(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const o=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!o.length)return;let t=!1;const r=e.provider,n=e.prefix;o.forEach(s=>{const i=s.icons,c=i.pending.length;i.pending=i.pending.filter(a=>{if(a.prefix!==n)return!0;const l=a.name;if(e.icons[l])i.loaded.push({provider:r,prefix:n,name:l});else if(e.missing.has(l))i.missing.push({provider:r,prefix:n,name:l});else return t=!0,!0;return!1}),i.pending.length!==c&&(t||ke([e],s.id),s.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),s.abort))})}))}let vt=0;function It(e,o,t){const r=vt++,n=ke.bind(null,t,r);if(!o.pending.length)return n;const s={id:r,icons:o,callback:e,abort:n};return t.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(s)}),n}function St(e,o=!0,t=!1){const r=[];return e.forEach(n=>{const s=typeof n=="string"?N(n,o,t):n;s&&r.push(s)}),r}var Ct={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function kt(e,o,t,r){const n=e.resources.length,s=e.random?Math.floor(Math.random()*n):e.index;let i;if(e.random){let m=e.resources.slice(0);for(i=[];m.length>1;){const x=Math.floor(Math.random()*m.length);i.push(m[x]),m=m.slice(0,x).concat(m.slice(x+1))}i=i.concat(m)}else i=e.resources.slice(s).concat(e.resources.slice(0,s));const c=Date.now();let a="pending",l=0,f,p=null,u=[],y=[];typeof r=="function"&&y.push(r);function g(){p&&(clearTimeout(p),p=null)}function d(){a==="pending"&&(a="aborted"),g(),u.forEach(m=>{m.status==="pending"&&(m.status="aborted")}),u=[]}function h(m,x){x&&(y=[]),typeof m=="function"&&y.push(m)}function v(){return{startTime:c,payload:o,status:a,queriesSent:l,queriesPending:u.length,subscribe:h,abort:d}}function b(){a="failed",y.forEach(m=>{m(void 0,f)})}function w(){u.forEach(m=>{m.status==="pending"&&(m.status="aborted")}),u=[]}function I(m,x,P){const O=x!=="success";switch(u=u.filter(S=>S!==m),a){case"pending":break;case"failed":if(O||!e.dataAfterTimeout)return;break;default:return}if(x==="abort"){f=P,b();return}if(O){f=P,u.length||(i.length?k():b());return}if(g(),w(),!e.random){const S=e.resources.indexOf(m.resource);S!==-1&&S!==e.index&&(e.index=S)}a="completed",y.forEach(S=>{S(P)})}function k(){if(a!=="pending")return;g();const m=i.shift();if(m===void 0){if(u.length){p=setTimeout(()=>{g(),a==="pending"&&(w(),b())},e.timeout);return}b();return}const x={status:"pending",resource:m,callback:(P,O)=>{I(x,P,O)}};u.push(x),l++,p=setTimeout(k,e.rotate),t(m,o,x.callback)}return setTimeout(k),v}function Pe(e){const o={...Ct,...e};let t=[];function r(){t=t.filter(c=>c().status==="pending")}function n(c,a,l){const f=kt(o,c,a,(p,u)=>{r(),l&&l(p,u)});return t.push(f),f}function s(c){return t.find(a=>c(a))||null}return{query:n,find:s,setIndex:c=>{o.index=c},getIndex:()=>o.index,cleanup:r}}function le(){}const U=Object.create(null);function Pt(e){if(!U[e]){const o=ee(e);if(!o)return;const t=Pe(o),r={config:o,redundancy:t};U[e]=r}return U[e]}function Tt(e,o,t){let r,n;if(typeof e=="string"){const s=V(e);if(!s)return t(void 0,424),le;n=s.send;const i=Pt(e);i&&(r=i.redundancy)}else{const s=Y(e);if(s){r=Pe(s);const i=e.resources?e.resources[0]:"",c=V(i);c&&(n=c.send)}}return!r||!n?(t(void 0,424),le):r.query(o,n,t)().abort}const fe="iconify2",j="iconify",Te=j+"-count",ue=j+"-version",_e=36e5,_t=168;function K(e,o){try{return e.getItem(o)}catch{}}function te(e,o,t){try{return e.setItem(o,t),!0}catch{}}function de(e,o){try{e.removeItem(o)}catch{}}function G(e,o){return te(e,Te,o.toString())}function W(e){return parseInt(K(e,Te))||0}const z={local:!0,session:!0},Ee={local:new Set,session:new Set};let ne=!1;function Et(e){ne=e}let D=typeof window>"u"?{}:window;function je(e){const o=e+"Storage";try{if(D&&D[o]&&typeof D[o].length=="number")return D[o]}catch{}z[e]=!1}function Oe(e,o){const t=je(e);if(!t)return;const r=K(t,ue);if(r!==fe){if(r){const c=W(t);for(let a=0;a<c;a++)de(t,j+a.toString())}te(t,ue,fe),G(t,0);return}const n=Math.floor(Date.now()/_e)-_t,s=c=>{const a=j+c.toString(),l=K(t,a);if(typeof l=="string"){try{const f=JSON.parse(l);if(typeof f=="object"&&typeof f.cached=="number"&&f.cached>n&&typeof f.provider=="string"&&typeof f.data=="object"&&typeof f.data.prefix=="string"&&o(f,c))return!0}catch{}de(t,a)}};let i=W(t);for(let c=i-1;c>=0;c--)s(c)||(c===i-1?(i--,G(t,i)):Ee[e].add(c))}function De(){if(!ne){Et(!0);for(const e in z)Oe(e,o=>{const t=o.data,r=o.provider,n=t.prefix,s=C(r,n);if(!X(s,t).length)return!1;const i=t.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}function jt(e,o){const t=e.lastModifiedCached;if(t&&t>=o)return t===o;if(e.lastModifiedCached=o,t)for(const r in z)Oe(r,n=>{const s=n.data;return n.provider!==e.provider||s.prefix!==e.prefix||s.lastModified===o});return!0}function Ot(e,o){ne||De();function t(r){let n;if(!z[r]||!(n=je(r)))return;const s=Ee[r];let i;if(s.size)s.delete(i=Array.from(s).shift());else if(i=W(n),!G(n,i+1))return;const c={cached:Math.floor(Date.now()/_e),provider:e.provider,data:o};return te(n,j+i.toString(),JSON.stringify(c))}o.lastModified&&!jt(e,o.lastModified)||Object.keys(o.icons).length&&(o.not_found&&(o=Object.assign({},o),delete o.not_found),t("local")||t("session"))}function he(){}function Dt(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,xt(e)}))}function Mt(e,o){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(o).sort():e.iconsToLoad=o,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:t,prefix:r}=e,n=e.iconsToLoad;delete e.iconsToLoad;let s;if(!n||!(s=V(t)))return;s.prepare(t,r,n).forEach(c=>{Tt(t,c,a=>{if(typeof a!="object")c.icons.forEach(l=>{e.missing.add(l)});else try{const l=X(e,a);if(!l.length)return;const f=e.pendingIcons;f&&l.forEach(p=>{f.delete(p)}),Ot(e,a)}catch(l){console.error(l)}Dt(e)})})}))}const Ft=(e,o)=>{const t=St(e,!0,Ie()),r=wt(t);if(!r.pending.length){let a=!0;return o&&setTimeout(()=>{a&&o(r.loaded,r.missing,r.pending,he)}),()=>{a=!1}}const n=Object.create(null),s=[];let i,c;return r.pending.forEach(a=>{const{provider:l,prefix:f}=a;if(f===c&&l===i)return;i=l,c=f,s.push(C(l,f));const p=n[l]||(n[l]=Object.create(null));p[f]||(p[f]=[])}),r.pending.forEach(a=>{const{provider:l,prefix:f,name:p}=a,u=C(l,f),y=u.pendingIcons||(u.pendingIcons=new Set);y.has(p)||(y.add(p),n[l][f].push(p))}),s.forEach(a=>{const{provider:l,prefix:f}=a;n[l][f].length&&Mt(a,n[l][f])}),o?It(o,r,s):he};function Lt(e,o){const t={...e};for(const r in o){const n=o[r],s=typeof n;r in Se?(n===null||n&&(s==="string"||s==="number"))&&(t[r]=n):s===typeof t[r]&&(t[r]=r==="rotate"?n%4:n)}return t}const At=/[\s,]+/;function Rt(e,o){o.split(At).forEach(t=>{switch(t.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function Nt(e,o=0){const t=e.replace(/^-?[0-9.]*/,"");function r(n){for(;n<0;)n+=4;return n%4}if(t===""){const n=parseInt(e);return isNaN(n)?0:r(n)}else if(t!==e){let n=0;switch(t){case"%":n=25;break;case"deg":n=90}if(n){let s=parseFloat(e.slice(0,e.length-t.length));return isNaN(s)?0:(s=s/n,s%1===0?r(s):0)}}return o}function Bt(e,o){let t=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in o)t+=" "+r+'="'+o[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+t+">"+e+"</svg>"}function zt(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function $t(e){return"data:image/svg+xml,"+zt(e)}function Ht(e){return'url("'+$t(e)+'")'}const pe={...Ce,inline:!1},Ut={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},qt={display:"inline-block"},J={backgroundColor:"currentColor"},Me={backgroundColor:"transparent"},ge={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},me={webkitMask:J,mask:J,background:Me};for(const e in me){const o=me[e];for(const t in ge)o[e+t]=ge[t]}const A={};["horizontal","vertical"].forEach(e=>{const o=e.slice(0,1)+"Flip";A[e+"-flip"]=o,A[e.slice(0,1)+"-flip"]=o,A[e+"Flip"]=o});function ye(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}const be=(e,o)=>{const t=Lt(pe,o),r={...Ut},n=o.mode||"svg",s={},i=o.style,c=typeof i=="object"&&!(i instanceof Array)?i:{};for(let d in o){const h=o[d];if(h!==void 0)switch(d){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":t[d]=h===!0||h==="true"||h===1;break;case"flip":typeof h=="string"&&Rt(t,h);break;case"color":s.color=h;break;case"rotate":typeof h=="string"?t[d]=Nt(h):typeof h=="number"&&(t[d]=h);break;case"ariaHidden":case"aria-hidden":h!==!0&&h!=="true"&&delete r["aria-hidden"];break;default:{const v=A[d];v?(h===!0||h==="true"||h===1)&&(t[v]=!0):pe[d]===void 0&&(r[d]=h)}}}const a=st(e,t),l=a.attributes;if(t.inline&&(s.verticalAlign="-0.125em"),n==="svg"){r.style={...s,...c},Object.assign(r,l);let d=0,h=o.id;return typeof h=="string"&&(h=h.replace(/-/g,"_")),r.innerHTML=lt(a.body,h?()=>h+"ID"+d++:"iconifyVue"),re("svg",r)}const{body:f,width:p,height:u}=e,y=n==="mask"||(n==="bg"?!1:f.indexOf("currentColor")!==-1),g=Bt(f,{...l,width:p+"",height:u+""});return r.style={...s,"--svg":Ht(g),width:ye(l.width),height:ye(l.height),...qt,...y?J:Me,...c},re("span",r)};Ie(!0);ft("",bt);if(typeof document<"u"&&typeof window<"u"){De();const e=window;if(e.IconifyPreload!==void 0){const o=e.IconifyPreload,t="Invalid IconifyPreload syntax.";typeof o=="object"&&o!==null&&(o instanceof Array?o:[o]).forEach(r=>{try{(typeof r!="object"||r===null||r instanceof Array||typeof r.icons!="object"||typeof r.prefix!="string"||!tt(r))&&console.error(t)}catch{console.error(t)}})}if(e.IconifyProviders!==void 0){const o=e.IconifyProviders;if(typeof o=="object"&&o!==null)for(let t in o){const r="IconifyProviders["+t+"] is invalid.";try{const n=o[t];if(typeof n!="object"||!n||n.resources===void 0)continue;ut(t,n)||console.error(r)}catch{console.error(r)}}}}const Qt={...B,body:""},Gt=Ue({inheritAttrs:!1,data(){return{iconMounted:!1,counter:0}},mounted(){this._name="",this._loadingIcon=null,this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(e,o){if(typeof e=="object"&&e!==null&&typeof e.body=="string")return this._name="",this.abortLoading(),{data:e};let t;if(typeof e!="string"||(t=N(e,!1,!0))===null)return this.abortLoading(),null;const r=Ze(t);if(!r)return(!this._loadingIcon||this._loadingIcon.name!==e)&&(this.abortLoading(),this._name="",r!==null&&(this._loadingIcon={name:e,abort:Ft([t],()=>{this.counter++})})),null;this.abortLoading(),this._name!==e&&(this._name=e,o&&o(e));const n=["iconify"];return t.prefix!==""&&n.push("iconify--"+t.prefix),t.provider!==""&&n.push("iconify--"+t.provider),{data:r,classes:n}}},render(){this.counter;const e=this.$attrs,o=this.iconMounted?this.getIcon(e.icon,e.onLoad):null;if(!o)return be(Qt,e);let t=e;return o.classes&&(t={...e,class:(typeof e.class=="string"?e.class+" ":"")+o.classes.join(" ")}),be({...B,...o.data},t)}});export{Gt as I,Kt as u};

globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import gracefulShutdown from 'http-graceful-shutdown';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const script = "\"use strict\";(()=>{const a=window,e=document.documentElement,m=[\"dark\",\"light\"],c=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let n=c===\"system\"?f():c;const l=e.getAttribute(\"data-color-mode-forced\");l&&(n=l),i(n),a[\"__NUXT_COLOR_MODE__\"]={preference:c,value:n,getColorScheme:f,addColorScheme:i,removeColorScheme:d};function i(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.add(t):e.className+=\" \"+t,s&&e.setAttribute(\"data-\"+s,o)}function d(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp(t,\"g\"),\"\"),s&&e.removeAttribute(\"data-\"+s)}function r(o){return a.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function f(){if(a.matchMedia&&r(\"\").media!==\"not all\"){for(const o of m)if(r(\":\"+o).matches)return o}return\"light\"}})();\n";

const _qg3lpVd6qm = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _qg3lpVd6qm
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function trapUnhandledNodeErrors() {
  {
    process.on(
      "unhandledRejection",
      (err) => console.error("[nitro] [unhandledRejection] " + err)
    );
    process.on(
      "uncaughtException",
      (err) => console.error("[nitro]  [uncaughtException] " + err)
    );
  }
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(html);
});

const assets = {
  "/ads.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3a-LRyoE+tgWfu+zGMKGe3RxJ9nY2Y\"",
    "mtime": "2025-02-01T18:13:21.670Z",
    "size": 58,
    "path": "../public/ads.txt"
  },
  "/sponsor-badge.svg": {
    "type": "image/svg+xml",
    "etag": "\"2174-3ch/EyNeOHV+Zp1a2+sbRH1HZLU\"",
    "mtime": "2025-02-01T18:13:21.754Z",
    "size": 8564,
    "path": "../public/sponsor-badge.svg"
  },
  "/flags/en.png": {
    "type": "image/png",
    "etag": "\"ac66-5SHTaHyaeqrnHqSMK9iohkB2GAQ\"",
    "mtime": "2025-02-01T18:13:21.670Z",
    "size": 44134,
    "path": "../public/flags/en.png"
  },
  "/flags/id_ID.png": {
    "type": "image/png",
    "etag": "\"c3af-3TF6lluR+ax9w3PJRDKqxr6BJ0k\"",
    "mtime": "2025-02-01T18:13:21.671Z",
    "size": 50095,
    "path": "../public/flags/id_ID.png"
  },
  "/images/1.png": {
    "type": "image/png",
    "etag": "\"1ae78-yDEM2hmFkOOOjbuuw7GgqrDsyuk\"",
    "mtime": "2025-02-01T18:13:21.671Z",
    "size": 110200,
    "path": "../public/images/1.png"
  },
  "/images/2.png": {
    "type": "image/png",
    "etag": "\"1eea4-LuoSFDA7SLxhjixG4F65jIecYkk\"",
    "mtime": "2025-02-01T18:13:21.672Z",
    "size": 126628,
    "path": "../public/images/2.png"
  },
  "/images/3.png": {
    "type": "image/png",
    "etag": "\"178d1-rinzVPDut7hdypWdes+8TKN/15Y\"",
    "mtime": "2025-02-01T18:13:21.673Z",
    "size": 96465,
    "path": "../public/images/3.png"
  },
  "/images/a (2).png": {
    "type": "image/png",
    "etag": "\"f554-IPDcslQB9XiTJ1i7lwN/rkUj/RU\"",
    "mtime": "2025-02-01T18:13:21.673Z",
    "size": 62804,
    "path": "../public/images/a (2).png"
  },
  "/images/a.png": {
    "type": "image/png",
    "etag": "\"2542b-Uhl6A2DOQ76POCGmMyhg8ZJ/p9s\"",
    "mtime": "2025-02-01T18:13:21.675Z",
    "size": 152619,
    "path": "../public/images/a.png"
  },
  "/images/avatar.png": {
    "type": "image/png",
    "etag": "\"169f4a-kAOIcLunK7lphKMFeLpwu4l3PVk\"",
    "mtime": "2025-02-01T18:13:21.684Z",
    "size": 1482570,
    "path": "../public/images/avatar.png"
  },
  "/images/avatara.png": {
    "type": "image/png",
    "etag": "\"12394d-bpgNqzKBn0JsWTntGb/0a3bJIY8\"",
    "mtime": "2025-02-01T18:13:21.692Z",
    "size": 1194317,
    "path": "../public/images/avatara.png"
  },
  "/images/g.png": {
    "type": "image/png",
    "etag": "\"523341-oCz4zqkfLLamkHbgcXjiBggR01Q\"",
    "mtime": "2025-02-01T18:13:21.730Z",
    "size": 5387073,
    "path": "../public/images/g.png"
  },
  "/images/icon-app.svg": {
    "type": "image/svg+xml",
    "etag": "\"b2b-I7qHmgjLHbBZFDP/fvj9LqzHg1c\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 2859,
    "path": "../public/images/icon-app.svg"
  },
  "/images/icon-design.svg": {
    "type": "image/svg+xml",
    "etag": "\"215f-reycKMD2lyags8EgSMseEg93Tjc\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 8543,
    "path": "../public/images/icon-design.svg"
  },
  "/images/icon-dev.svg": {
    "type": "image/svg+xml",
    "etag": "\"27b0-g4Qu17RfVJqM8QXE8SxZd1Dd4t8\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 10160,
    "path": "../public/images/icon-dev.svg"
  },
  "/images/icon-photo.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f5b-vI57A35SI3PP0HryjbAcGds4sAM\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 8027,
    "path": "../public/images/icon-photo.svg"
  },
  "/images/icon-quote.svg": {
    "type": "image/svg+xml",
    "etag": "\"495-cDc1ErSlPmHR3wWEAJTcZ1aRYlw\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 1173,
    "path": "../public/images/icon-quote.svg"
  },
  "/images/icon.png": {
    "type": "image/png",
    "etag": "\"35eb-9li2VqsU1l3KH+3An0ycgzIBuHQ\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 13803,
    "path": "../public/images/icon.png"
  },
  "/images/kampusmadu.png": {
    "type": "image/png",
    "etag": "\"2847-Kt2Ouwwl210t/J64sSRQx5/uUhM\"",
    "mtime": "2025-02-01T18:13:21.731Z",
    "size": 10311,
    "path": "../public/images/kampusmadu.png"
  },
  "/images/kampusmadu1.png": {
    "type": "image/png",
    "etag": "\"2379-kGXpVa5Sr/nIyt9SxxwQntzePTg\"",
    "mtime": "2025-02-01T18:13:21.732Z",
    "size": 9081,
    "path": "../public/images/kampusmadu1.png"
  },
  "/images/kra.png": {
    "type": "image/png",
    "etag": "\"2e0ee-tkWBFE8SdilIfH2JKLDA/jeiCck\"",
    "mtime": "2025-02-01T18:13:21.733Z",
    "size": 188654,
    "path": "../public/images/kra.png"
  },
  "/images/loading.png": {
    "type": "image/png",
    "etag": "\"35eb-9li2VqsU1l3KH+3An0ycgzIBuHQ\"",
    "mtime": "2025-02-01T18:13:21.733Z",
    "size": 13803,
    "path": "../public/images/loading.png"
  },
  "/images/logo.png": {
    "type": "image/png",
    "etag": "\"ec57f-nFI/RsIhQmi3uvSKEPhLrtINB/Y\"",
    "mtime": "2025-02-01T18:13:21.740Z",
    "size": 968063,
    "path": "../public/images/logo.png"
  },
  "/images/sign.png": {
    "type": "image/png",
    "etag": "\"1fee51-YjHwJFkBh7OMvCbRuvGKhoTaXNM\"",
    "mtime": "2025-02-01T18:13:21.754Z",
    "size": 2092625,
    "path": "../public/images/sign.png"
  },
  "/_nuxt/404.ec02db00.js": {
    "type": "application/javascript",
    "etag": "\"301-adR1i5dA5+AzgL2sTPAhxwhwBAk\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 769,
    "path": "../public/_nuxt/404.ec02db00.js"
  },
  "/_nuxt/default.a9820e37.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a9-7jq75fK1o+3gp5FPkVn9h+axfV8\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 425,
    "path": "../public/_nuxt/default.a9820e37.css"
  },
  "/_nuxt/default.ea376ab4.js": {
    "type": "application/javascript",
    "etag": "\"14a8-hnZxxhTCK4C8oABQ94HJQPO87c8\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 5288,
    "path": "../public/_nuxt/default.ea376ab4.js"
  },
  "/_nuxt/entry.7930908d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1aa-jUEe/q4l2rQMZ8803rumtsRZhPU\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 426,
    "path": "../public/_nuxt/entry.7930908d.css"
  },
  "/_nuxt/entry.a006c892.js": {
    "type": "application/javascript",
    "etag": "\"4131f-/1p+CY7eOtMdlswYrJqEC71FI/g\"",
    "mtime": "2025-02-01T18:18:33.846Z",
    "size": 267039,
    "path": "../public/_nuxt/entry.a006c892.js"
  },
  "/_nuxt/error-404.3c79d67f.js": {
    "type": "application/javascript",
    "etag": "\"8d2-GhukTehDS7s6ytMUQ+4SUsqIMRs\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 2258,
    "path": "../public/_nuxt/error-404.3c79d67f.js"
  },
  "/_nuxt/error-404.8bdbaeb8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-jl7r/kE1FF0H+CLPNh+07RJXuFI\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 3696,
    "path": "../public/_nuxt/error-404.8bdbaeb8.css"
  },
  "/_nuxt/error-500.49b710fe.js": {
    "type": "application/javascript",
    "etag": "\"756-/XpvcnD7Dp4dTOjNOFkHOqiBnaA\"",
    "mtime": "2025-02-01T18:18:33.848Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.49b710fe.js"
  },
  "/_nuxt/error-500.b63a96f5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-loEWA9n4Kq4UMBzJyT6hY9SSl00\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.b63a96f5.css"
  },
  "/_nuxt/github.12d24512.js": {
    "type": "application/javascript",
    "etag": "\"757f-AObuXOrqPf+ptbc0j//dFDYGOFY\"",
    "mtime": "2025-02-01T18:18:33.848Z",
    "size": 30079,
    "path": "../public/_nuxt/github.12d24512.js"
  },
  "/_nuxt/GithubRepo.1af9661e.js": {
    "type": "application/javascript",
    "etag": "\"b49-v5k7w1k8xvLpuzNp3QQP0GMG03U\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 2889,
    "path": "../public/_nuxt/GithubRepo.1af9661e.js"
  },
  "/_nuxt/home.c6e7ce23.js": {
    "type": "application/javascript",
    "etag": "\"137-hWkxalENJ2EmZsURVFaogu9j0PA\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 311,
    "path": "../public/_nuxt/home.c6e7ce23.js"
  },
  "/_nuxt/iconify.50d158ad.js": {
    "type": "application/javascript",
    "etag": "\"5955-ItBvee2q2KGEFKZjhpdTTvjHsV0\"",
    "mtime": "2025-02-01T18:18:33.848Z",
    "size": 22869,
    "path": "../public/_nuxt/iconify.50d158ad.js"
  },
  "/_nuxt/index.2dab9560.js": {
    "type": "application/javascript",
    "etag": "\"12f1-ZT/SGyCqRP5DDuTt+Oyiy7dMjKg\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 4849,
    "path": "../public/_nuxt/index.2dab9560.js"
  },
  "/_nuxt/index.817e47a8.js": {
    "type": "application/javascript",
    "etag": "\"e10-CcMp4wdHmwCWFbCCrjCUG99/qw0\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 3600,
    "path": "../public/_nuxt/index.817e47a8.js"
  },
  "/_nuxt/kampusmadu1.0c6dfded.png": {
    "type": "image/png",
    "etag": "\"2379-kGXpVa5Sr/nIyt9SxxwQntzePTg\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 9081,
    "path": "../public/_nuxt/kampusmadu1.0c6dfded.png"
  },
  "/_nuxt/nuxt-link.814cf6d3.js": {
    "type": "application/javascript",
    "etag": "\"10fc-h3FZemrq2Ca7cCbguX253x6L0kE\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 4348,
    "path": "../public/_nuxt/nuxt-link.814cf6d3.js"
  },
  "/_nuxt/portfolio.01d11f5c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-MXTF7XWDWNulXE1iESpzy7adon0\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 720,
    "path": "../public/_nuxt/portfolio.01d11f5c.css"
  },
  "/_nuxt/portfolio.da92958f.js": {
    "type": "application/javascript",
    "etag": "\"1013-altXUC9V9duxW71hGumlLMf5/G0\"",
    "mtime": "2025-02-01T18:18:33.848Z",
    "size": 4115,
    "path": "../public/_nuxt/portfolio.da92958f.js"
  },
  "/_nuxt/resume.50403130.js": {
    "type": "application/javascript",
    "etag": "\"532-LuEGkizF1ybI3WcjmdhTNnwoVN8\"",
    "mtime": "2025-02-01T18:18:33.847Z",
    "size": 1330,
    "path": "../public/_nuxt/resume.50403130.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_Oa2vMn = () => import('../about.mjs');
const _lazy_tAXKi9 = () => import('../categories.mjs');
const _lazy_3FuOuk = () => import('../projects.mjs');
const _lazy_dHxs12 = () => import('../services.mjs');
const _lazy_V9ixXX = () => import('../testimonials.mjs');
const _lazy_TktnKO = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/about', handler: _lazy_Oa2vMn, lazy: true, middleware: false, method: undefined },
  { route: '/api/categories', handler: _lazy_tAXKi9, lazy: true, middleware: false, method: undefined },
  { route: '/api/projects', handler: _lazy_3FuOuk, lazy: true, middleware: false, method: undefined },
  { route: '/api/services', handler: _lazy_dHxs12, lazy: true, middleware: false, method: undefined },
  { route: '/api/testimonials', handler: _lazy_V9ixXX, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_TktnKO, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_TktnKO, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  gracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const listener = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map

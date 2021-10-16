// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"googlePlaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initMap;

function initMap(input) {
  if (!input) return;
  const options = {
    // componentRestrictions: { country: "us" },
    fields: ["geometry", "icon", "name"],
    strictBounds: false,
    types: ["(cities)"]
  };
  const dropdown = new google.maps.places.Autocomplete(input, options);
  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace();
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
  });
  input.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}
},{}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = test;
// Vars
let lat;
let lon; //let dateTime = "day";
//let cond = "clear";

function boo() {
  console.log("boo");
}

const apiKey = "74a29df014963a5cf46387efc2a24cc3";
console.log(apiKey); // DOM

const city = document.querySelector(".curr-weather-city");
const currTemp = document.querySelector(".curr-weather-temp");
const currCond = document.querySelector(".curr-weather-condition");
const hourWeatherList = document.querySelector(".hour-weather-list");
const currWeatherDiv = document.querySelector(".current-weather");
const currWeatherMin = document.querySelector(".curr-weather-min");
const currWeatherMax = document.querySelector(".curr-weather-max");
const searchBtn = document.querySelector("#search-btn");
const footer = document.querySelector(".footer");

const toggleLoadding = () => document.querySelector(".spinner").classList.toggle("loading"); // Get lattitide and longtitude


async function getCrd() {
  const response = await fetch("https://ipinfo.io/json?token=3631683ef9a03a");
  const json = await response.json();
  return [...json.loc.split(","), json.city];
}

async function getWeather(lat, lon) {
  const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
  const data = await weatherRes.json(); //console.log(data);

  return data;
}

const displayWeather = async (lat, lon) => {
  toggleLoadding();
  let latitude;
  let longtitude;
  let currCity;

  if (!lat && !lon) {
    const [lat, lon, currCitym] = await getCrd();
    latitude = lat;
    longtitude = lon;
    currCity = currCitym;
  } else {
    const currCitym = await getCrd();
    currCity = currCitym[3];
    latitude = lat;
    longtitude = lon;
    console.log("boo");
    console.log(currCity);
  }

  const weatherData = await getWeather(latitude, longtitude);
  console.log(weatherData);
  const {
    hourly,
    daily
  } = weatherData; // Display current weather

  city.textContent = currCity;
  currTemp.textContent = Math.floor(weatherData.current.temp) + "\u00B0F";
  currCond.textContent = weatherData.current.weather[0].main;
  currWeatherMin.textContent =
  /**"\u2193" +*/
  Math.floor(weatherData.daily[0].temp.min) + "\u00B0F";
  currWeatherMax.textContent =
  /**"\u2191" +*/
  Math.floor(weatherData.daily[0].temp.max) + "\u00B0F"; // Determine if it's day or night and display background

  let currentWeatherDayTime = "";

  if (weatherData.current.dt > weatherData.current.sunrise && weatherData.current.dt < weatherData.current.sunset) {
    currentWeatherDayTime = "day";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (weatherData.current.dt > weatherData.current.sunrise && weatherData.current.dt > weatherData.current.sunset) {
    currentWeatherDayTime = "night"; //console.log(weatherData.current.weather.main);

    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (weatherData.current.dt < weatherData.current.sunrise) {
    currentWeatherDayTime = "night";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  } // Display hourly weather


  hourly.forEach(hour => {
    const date = new Date(hour.dt * 1000);
    const hourLi = document.createElement("li");
    const time = document.createElement("p");
    const temp = document.createElement("p");
    const hourImg = document.createElement("img"); // Convert EPOCH seconds to local time and split resullting string into array
    // for using only needed parts of that string in html element

    let timeArray = date.toLocaleTimeString().split(":"); // Check if it's day or night

    let hourDayTime = "";

    if (timeArray[2].charAt(3) == "A" && timeArray[0] >= 6 && timeArray[0] <= 11) {
      hourDayTime = "day";
    } else if (timeArray[2].charAt(3) == "P" && timeArray[0] == 12) {
      hourDayTime = "day";
    } else if (timeArray[2].charAt(3) == "P" && timeArray[0] >= 1 && timeArray[0] <= 5) {
      hourDayTime = "day";
    } else if (timeArray[2].charAt(3) == "P" && timeArray[0] > 5 && timeArray[0] <= 11) {
      hourDayTime = "night";
    } else if (timeArray[2].charAt(3) == "A" && timeArray[0] == 12) {
      hourDayTime = "night";
    } else if (timeArray[2].charAt(3) == "A" && timeArray[0] >= 1 && timeArray[0] < 6) {
      hourDayTime = "night";
    } // Display only time first digit and am/pm letters


    time.innerText = timeArray[0] + timeArray[2].charAt(3) + timeArray[2].charAt(4);
    temp.innerText = `${Math.ceil(hour.temp)}\u00B0F`; // Round tempreture

    hourImg.src = `./images/icons/${hourDayTime}-${hour.weather[0].main}.png`;
    hourImg.classList.add("hour-weather-img");
    hourLi.append(time, hourImg, temp);
    hourWeatherList.appendChild(hourLi);
  }); // Display weekly weather

  daily.forEach(day => {
    const weekLi = document.createElement("li");
    const weekDayName = document.createElement("p");
    const weekImgCondDiv = document.createElement("div");
    const weekImgCond = document.createElement("img");
    const weekLowTempDiv = document.createElement("div");
    const weekImgTempLow = document.createElement("img");
    const weekTempLow = document.createElement("p");
    const weekHighTempDiv = document.createElement("div");
    const weekImgTempHigh = document.createElement("img");
    const weekTempHigh = document.createElement("p");
    const weekHumidityDiv = document.createElement("div");
    const weekImgHumidity = document.createElement("img");
    const weekHumidity = document.createElement("p");
    const weekDate = new Date(day.dt * 1000);
    let dayName = "";

    switch (weekDate.getUTCDay()) {
      case 0:
        dayName = "Sunday";
        break;

      case 1:
        dayName = "Monday";
        break;

      case 2:
        dayName = "Tuesday";
        break;

      case 3:
        dayName = "Wednesday";
        break;

      case 4:
        dayName = "Thursday";
        break;

      case 5:
        dayName = "Friday";
        break;

      case 6:
        dayName = "Saturday";
        break;
    }

    weekDayName.innerText = dayName;
    weekImgCond.src = `./images/icons/day-${day.weather[0].main}.png`;
    weekImgTempLow.src = `./images/icons/thermometer-low.png`;
    weekTempLow.innerText = `${Math.ceil(day.temp.min)}\u00B0F`;
    weekImgTempHigh.src = `./images/icons/thermometer-high.png`;
    weekTempHigh.innerText = `${Math.ceil(day.temp.max)}\u00B0F`;
    weekImgHumidity.src = `./images/icons/drop.png`;
    weekHumidity.innerText = day.humidity + `\u0025`;
    weekImgCondDiv.appendChild(weekImgCond);
    weekLowTempDiv.append(weekImgTempLow, weekTempLow);
    weekHighTempDiv.append(weekImgTempHigh, weekTempHigh);
    weekHumidityDiv.append(weekImgHumidity, weekHumidity);
    weekLi.append(weekDayName, weekImgCondDiv, weekLowTempDiv, weekHighTempDiv, weekHumidityDiv);
    const weekWeatherList = document.querySelector(".week-weather-list");
    weekWeatherList.appendChild(weekLi);
  }); // Display current weather details
  // Sunrise

  const sunriseTime = new Date(weatherData.current.sunrise * 1000);
  let sunriseTimeArray = sunriseTime.toLocaleTimeString().split(":");
  const sunrise = document.querySelector(".sunrise-value");
  sunrise.innerText = sunriseTimeArray[0] + "." + sunriseTimeArray[1] + sunriseTimeArray[2].charAt(3) + sunriseTimeArray[2].charAt(4); //Sunset

  const sunsetTime = new Date(weatherData.current.sunset * 1000);
  let sunsetTimeArray = sunsetTime.toLocaleTimeString().split(":");
  const sunset = document.querySelector(".sunset-value");
  sunset.innerText = sunsetTimeArray[0] + "." + sunsetTimeArray[1] + sunsetTimeArray[2].charAt(3) + sunsetTimeArray[2].charAt(4); // Humidity

  const humidity = document.querySelector(".humidity-value");
  humidity.innerText = weatherData.current.humidity + `\u0025`; // Feels like

  const feelsLike = document.querySelector(".feels-like-value");
  feelsLike.innerText = `${Math.ceil(weatherData.current.feels_like)}\u00B0F`; // Pressure

  let pressureConverted = weatherData.current.pressure / 33.86;
  const pressure = document.querySelector(".pressure-value");
  pressure.innerText = pressureConverted.toFixed(2) + " inHg"; // Wind

  let windDirection = "";

  if (weatherData.current.wind_dig >= 0 && weatherData.current.wind_dig <= 90) {
    windDirection = "ene";
  } else if (weatherData.current.wind_dig > 90 && weatherData.current.wind_dig < 180) {
    windDirection = "ese";
  } else if (weatherData.current.wind_dig > 180 && weatherData.current.wind_dig < 270) {
    windDirection = "wsw";
  } else {
    windDirection = "wnw";
  }

  const wind = document.querySelector(".wind-value");
  wind.innerText = windDirection + " " + weatherData.current.wind_speed + " mph";
  toggleLoadding();
};

displayWeather();
searchBtn.addEventListener("click", () => footer.classList.toggle("footer-open"));

function test() {
  return "test";
}
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _googlePlaces = _interopRequireDefault(require("./googlePlaces"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const input = document.getElementById("search-input");
(0, _googlePlaces.default)(input);
},{"./googlePlaces":"googlePlaces.js","./app":"app.js"}],"../../../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57327" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map
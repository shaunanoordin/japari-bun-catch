/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/japari-bun-catch/constants.js":
/*!*******************************************!*\
  !*** ./src/japari-bun-catch/constants.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TILE_SIZE\": () => (/* binding */ TILE_SIZE),\n/* harmony export */   \"APP_WIDTH\": () => (/* binding */ APP_WIDTH),\n/* harmony export */   \"APP_HEIGHT\": () => (/* binding */ APP_HEIGHT),\n/* harmony export */   \"PLAYER_ACTIONS\": () => (/* binding */ PLAYER_ACTIONS),\n/* harmony export */   \"EXPECTED_FRAMES_PER_SECOND\": () => (/* binding */ EXPECTED_FRAMES_PER_SECOND),\n/* harmony export */   \"EXPECTED_TIMESTEP\": () => (/* binding */ EXPECTED_TIMESTEP)\n/* harmony export */ });\nvar TILE_SIZE = 50;\nvar APP_WIDTH = 800;\nvar APP_HEIGHT = 500;\nvar PLAYER_ACTIONS = {\n  IDLE: 'idle',\n  // Player isn't doing anything\n  POINTER_DOWN: 'pointer down' // Player is actively interacting with the canvas.\n\n};\n/*\r\nWhile the engine is technically able to support any given framerate (determined\r\nby the hardware), a baseline is required to ground our video game logic to.\r\ne.g. we can say that we expect an object with \"movement speed\" of \"2\" to travel\r\n120 pixels in 1 second. (2 pixels per frame * 60 frames per second)\r\n */\n\nvar EXPECTED_FRAMES_PER_SECOND = 60;\nvar EXPECTED_TIMESTEP = 1000 / EXPECTED_FRAMES_PER_SECOND;\n\n//# sourceURL=webpack://japari-bun-catch/./src/japari-bun-catch/constants.js?");

/***/ }),

/***/ "./src/japari-bun-catch/image-asset.js":
/*!*********************************************!*\
  !*** ./src/japari-bun-catch/image-asset.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ImageAsset)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ImageAsset = function ImageAsset(url) {\n  _classCallCheck(this, ImageAsset);\n\n  this.url = url;\n  this.img = null;\n  this.loaded = false;\n  this.img = new Image();\n\n  this.img.onload = function () {\n    this.loaded = true;\n  }.bind(this);\n\n  this.img.src = this.url;\n};\n\n\n\n//# sourceURL=webpack://japari-bun-catch/./src/japari-bun-catch/image-asset.js?");

/***/ }),

/***/ "./src/japari-bun-catch/index.js":
/*!***************************************!*\
  !*** ./src/japari-bun-catch/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _japari_bun_catch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./japari-bun-catch */ \"./src/japari-bun-catch/japari-bun-catch.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_japari_bun_catch__WEBPACK_IMPORTED_MODULE_0__.default);\n\n//# sourceURL=webpack://japari-bun-catch/./src/japari-bun-catch/index.js?");

/***/ }),

/***/ "./src/japari-bun-catch/japari-bun-catch.js":
/*!**************************************************!*\
  !*** ./src/japari-bun-catch/japari-bun-catch.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/japari-bun-catch/constants.js\");\n/* harmony import */ var _image_asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-asset */ \"./src/japari-bun-catch/image-asset.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar searchParams = new URLSearchParams(window.location.search);\nvar DEBUG = searchParams.get('debug') || false;\n\nvar JapariBunCatch = /*#__PURE__*/function () {\n  function JapariBunCatch() {\n    _classCallCheck(this, JapariBunCatch);\n\n    this.html = {\n      main: document.getElementById('main'),\n      canvas: document.getElementById('canvas'),\n      buttonReload: document.getElementById('button-reload')\n    };\n    this.canvas2d = this.html.canvas.getContext('2d');\n    this.canvasWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.APP_WIDTH;\n    this.canvasHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.APP_HEIGHT;\n    this.setupUI();\n    this.initialised = false;\n    this.assets = {};\n    this.hero = null;\n    this.entities = [];\n    this.prevTime = null;\n    this.nextFrame = window.requestAnimationFrame(this.main.bind(this));\n  }\n\n  _createClass(JapariBunCatch, [{\n    key: \"initialisationCheck\",\n    value: function initialisationCheck() {\n      var _this = this;\n\n      // Assets check\n      var allAssetsLoaded = true;\n      var numLoadedAssets = 0;\n      var numTotalAssets = 0;\n      Object.keys(this.assets).forEach(function (id) {\n        var asset = _this.assets[id];\n        allAssetsLoaded = allAssetsLoaded && asset.loaded;\n        if (asset.loaded) numLoadedAssets++;\n        numTotalAssets++;\n      }); // Paint status\n\n      this.canvas2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n      this.canvas2d.textAlign = 'start';\n      this.canvas2d.textBaseline = 'top';\n      this.canvas2d.fillStyle = '#ccc';\n      this.canvas2d.font = \"1em monospace\";\n      this.canvas2d.fillText(\"Loading \".concat(numLoadedAssets, \" / \").concat(numTotalAssets, \" \"), _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);\n\n      if (allAssetsLoaded) {\n        this.initialised = true;\n        this.showUI();\n        this.startGame();\n      }\n    }\n    /*\r\n    Section: General Logic\r\n    ----------------------------------------------------------------------------\r\n     */\n\n  }, {\n    key: \"main\",\n    value: function main(time) {\n      var timeStep = this.prevTime ? time - this.prevTime : time;\n      this.prevTime = time;\n\n      if (this.initialised) {\n        this.play(timeStep);\n        this.paint();\n      } else {\n        this.initialisationCheck();\n      }\n\n      this.nextFrame = window.requestAnimationFrame(this.main.bind(this));\n    }\n  }, {\n    key: \"play\",\n    value: function play(timeStep) {\n      // Run the action gameplay\n      // ----------------\n      this.entities.forEach(function (entity) {\n        return entity.play(timeStep);\n      }); // Cleanup\n\n      this.entities = this.entities.filter(function (entity) {\n        return !entity._expired;\n      }); // ----------------\n    }\n  }, {\n    key: \"paint\",\n    value: function paint() {\n      var c2d = this.canvas2d;\n      c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n      c2d.strokeStyle = 'rgba(128, 128, 128, 0.05)';\n      c2d.lineWidth = 2; // ----------------\n      // Draw grid\n      // ----------------\n\n      var offsetX = 0;\n      var offsetY = 0;\n\n      for (var y = offsetY; y < _constants__WEBPACK_IMPORTED_MODULE_0__.APP_HEIGHT; y += _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE) {\n        for (var x = offsetX; x < _constants__WEBPACK_IMPORTED_MODULE_0__.APP_WIDTH; x += _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE) {\n          c2d.beginPath();\n          c2d.rect(x, y, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);\n          c2d.stroke(); // Debug Grid\n\n          if (DEBUG) {\n            c2d.fillStyle = '#ccc';\n            c2d.font = \"1em Source Code Pro\";\n            c2d.textAlign = 'center';\n            c2d.textBaseline = 'middle';\n            var col = Math.floor(x / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);\n            var row = Math.floor(y / _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE);\n            c2d.fillText(col + ',' + row, x + _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2, y + _constants__WEBPACK_IMPORTED_MODULE_0__.TILE_SIZE / 2); // using template strings here messes up colours in Brackets.\n          }\n        }\n      } // ----------------\n      // Draw entities\n      // ----------------\n\n\n      this.entities.forEach(function (entity) {\n        return entity.paint(layer);\n      }); // ----------------\n      // Draw UI data\n      // ----------------\n      // ----------------\n    }\n    /*\r\n    Section: UI and Event Handling\r\n    ----------------------------------------------------------------------------\r\n     */\n\n  }, {\n    key: \"setupUI\",\n    value: function setupUI() {\n      this.html.canvas.width = this.canvasWidth;\n      this.html.canvas.height = this.canvasHeight;\n      this.html.buttonReload.addEventListener('click', this.buttonReload_onClick.bind(this));\n      this.html.main.addEventListener('keypress', this.onKeyPress.bind(this));\n      window.addEventListener('resize', this.updateUI.bind(this));\n      this.updateUI();\n      this.hideUI(); // Hide until all assets are loaded\n\n      this.html.main.focus();\n    }\n  }, {\n    key: \"hideUI\",\n    value: function hideUI() {\n      this.html.buttonReload.style.visibility = 'hidden';\n    }\n  }, {\n    key: \"showUI\",\n    value: function showUI() {\n      this.html.buttonReload.style.visibility = 'visible';\n    }\n  }, {\n    key: \"updateUI\",\n    value: function updateUI() {\n      // Fit the Interaction layer to the canvas\n      var mainDivBounds = this.html.main.getBoundingClientRect();\n      var canvasBounds = this.html.canvas.getBoundingClientRect();\n    }\n  }, {\n    key: \"onKeyPress\",\n    value: function onKeyPress(e) {\n      console.log('+++ e.key: ', e.key);\n      return stopEvent(e);\n    }\n  }, {\n    key: \"buttonReload_onClick\",\n    value: function buttonReload_onClick() {\n      this.startGame();\n    }\n    /*\r\n    Section: Gameplay\r\n    ----------------------------------------------------------------------------\r\n     */\n\n  }, {\n    key: \"startGame\",\n    value: function startGame() {}\n  }]);\n\n  return JapariBunCatch;\n}();\n\nfunction stopEvent(e) {\n  if (!e) return false;\n  e.preventDefault && e.preventDefault();\n  e.stopPropagation && e.stopPropagation();\n  e.returnValue = false;\n  e.cancelBubble = true;\n  return false;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JapariBunCatch);\n\n//# sourceURL=webpack://japari-bun-catch/./src/japari-bun-catch/japari-bun-catch.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _japari_bun_catch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./japari-bun-catch */ \"./src/japari-bun-catch/index.js\");\n\nvar app;\n\nwindow.onload = function () {\n  window.app = new _japari_bun_catch__WEBPACK_IMPORTED_MODULE_0__.default();\n};\n\n//# sourceURL=webpack://japari-bun-catch/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
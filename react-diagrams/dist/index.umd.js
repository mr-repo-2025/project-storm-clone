(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["projectstorm/react-diagrams"] = factory();
	else
		root["projectstorm/react-diagrams"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@projectstorm/react-canvas-core":
/*!**************************************************!*\
  !*** external "@projectstorm/react-canvas-core" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@projectstorm/react-canvas-core");

/***/ }),

/***/ "@projectstorm/react-diagrams-core":
/*!****************************************************!*\
  !*** external "@projectstorm/react-diagrams-core" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@projectstorm/react-diagrams-core");

/***/ }),

/***/ "@projectstorm/react-diagrams-defaults":
/*!********************************************************!*\
  !*** external "@projectstorm/react-diagrams-defaults" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@projectstorm/react-diagrams-defaults");

/***/ }),

/***/ "@projectstorm/react-diagrams-routing":
/*!*******************************************************!*\
  !*** external "@projectstorm/react-diagrams-routing" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("@projectstorm/react-diagrams-routing");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _projectstorm_react_diagrams_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/react-diagrams-routing */ "@projectstorm/react-diagrams-routing");
/* harmony import */ var _projectstorm_react_diagrams_routing__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_routing__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _projectstorm_react_diagrams_routing__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _projectstorm_react_diagrams_routing__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);








/**
 * Construct an engine with the defaults installed
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((options = {}) => {
    const engine = new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.DiagramEngine(options);
    // register model factories
    engine.getLayerFactories().registerFactory(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.NodeLayerFactory());
    engine.getLayerFactories().registerFactory(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.NodeWLayerFactory());
    engine.getLayerFactories().registerFactory(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.LinkLayerFactory());
    engine.getLayerFactories().registerFactory(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__.SelectionBoxLayerFactory());
    engine.getLabelFactories().registerFactory(new _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultLabelFactory());
    engine.getNodeFactories().registerFactory(new _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultNodeFactory()); // i cant figure out why
    engine.getLinkFactories().registerFactory(new _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultLinkFactory());
    engine.getLinkFactories().registerFactory(new _projectstorm_react_diagrams_routing__WEBPACK_IMPORTED_MODULE_2__.PathFindingLinkFactory());
    engine.getPortFactories().registerFactory(new _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultPortFactory());
    // register the default interaction behaviours
    engine.getStateMachine().pushState(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.DefaultDiagramState());
    return engine;
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map
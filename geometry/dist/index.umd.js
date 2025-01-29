(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["@projectstorm/react-diagrams-geometry"] = factory();
	else
		root["@projectstorm/react-diagrams-geometry"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/BezierCurve.js":
/*!*****************************!*\
  !*** ./dist/BezierCurve.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BezierCurve: () => (/* binding */ BezierCurve),
/* harmony export */   BezierCurvepPoints: () => (/* binding */ BezierCurvepPoints)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./dist/Point.js");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Polygon */ "./dist/Polygon.js");


var BezierCurvepPoints;
(function (BezierCurvepPoints) {
    BezierCurvepPoints[BezierCurvepPoints["SOURCE"] = 0] = "SOURCE";
    BezierCurvepPoints[BezierCurvepPoints["SOURCE_CONTROL"] = 1] = "SOURCE_CONTROL";
    BezierCurvepPoints[BezierCurvepPoints["TARGET_CONTROL"] = 2] = "TARGET_CONTROL";
    BezierCurvepPoints[BezierCurvepPoints["TARGET"] = 3] = "TARGET";
})(BezierCurvepPoints || (BezierCurvepPoints = {}));
class BezierCurve extends _Polygon__WEBPACK_IMPORTED_MODULE_1__.Polygon {
    constructor() {
        super([new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(0, 0), new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(0, 0), new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(0, 0), new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(0, 0)]);
    }
    getSVGCurve() {
        return `M${this.getSource().toSVG()} C${this.getSourceControl().toSVG()}, ${this.getTargetControl().toSVG()}, ${this.getTarget().toSVG()}`;
    }
    setPoints(points) {
        if (points.length !== 4) {
            throw new Error('BezierCurve must have extactly 4 points');
        }
        super.setPoints(points);
    }
    getSource() {
        return this.points[BezierCurvepPoints.SOURCE];
    }
    getSourceControl() {
        return this.points[BezierCurvepPoints.SOURCE_CONTROL];
    }
    getTargetControl() {
        return this.points[BezierCurvepPoints.TARGET_CONTROL];
    }
    getTarget() {
        return this.points[BezierCurvepPoints.TARGET];
    }
    setSource(point) {
        this.points[BezierCurvepPoints.SOURCE] = point;
    }
    setSourceControl(point) {
        this.points[BezierCurvepPoints.SOURCE_CONTROL] = point;
    }
    setTargetControl(point) {
        this.points[BezierCurvepPoints.TARGET_CONTROL] = point;
    }
    setTarget(point) {
        this.points[BezierCurvepPoints.TARGET] = point;
    }
}


/***/ }),

/***/ "./dist/Bounds.js":
/*!************************!*\
  !*** ./dist/Bounds.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoundsCorner: () => (/* binding */ BoundsCorner),
/* harmony export */   boundsFromPositionAndSize: () => (/* binding */ boundsFromPositionAndSize),
/* harmony export */   createEmptyBounds: () => (/* binding */ createEmptyBounds)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./dist/Point.js");

var BoundsCorner;
(function (BoundsCorner) {
    BoundsCorner["TOP_LEFT"] = "TL";
    BoundsCorner["TOP_RIGHT"] = "TR";
    BoundsCorner["BOTTOM_RIGHT"] = "BR";
    BoundsCorner["BOTTOM_LEFT"] = "BL";
})(BoundsCorner || (BoundsCorner = {}));
const boundsFromPositionAndSize = (x, y, width, height) => {
    return {
        [BoundsCorner.TOP_LEFT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(x, y),
        [BoundsCorner.TOP_RIGHT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(x + width, y),
        [BoundsCorner.BOTTOM_RIGHT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(x + width, y + height),
        [BoundsCorner.BOTTOM_LEFT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(x, y + height)
    };
};
const createEmptyBounds = () => {
    return {
        [BoundsCorner.TOP_LEFT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(),
        [BoundsCorner.TOP_RIGHT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(),
        [BoundsCorner.BOTTOM_RIGHT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(),
        [BoundsCorner.BOTTOM_LEFT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point()
    };
};


/***/ }),

/***/ "./dist/Matrix.js":
/*!************************!*\
  !*** ./dist/Matrix.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Matrix: () => (/* binding */ Matrix)
/* harmony export */ });
class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
    }
    mmul(matrix) {
        this.matrix = this.matrix.map((row, i) => matrix.asArray()[0].map((_, j) => row.reduce((acc, _, n) => acc + this.matrix[i][n] * matrix.asArray()[n][j], 0)));
        return this;
    }
    asArray() {
        return this.matrix;
    }
    get(rowIndex, columnIndex) {
        return this.asArray()[rowIndex][columnIndex];
    }
    static multiply(...matrices) {
        let m = matrices[0];
        for (let i = 1; i < matrices.length; i++) {
            m = m.mmul(matrices[i]);
        }
        return m;
    }
    static scaleMatrix(x, y) {
        return new Matrix([
            [x, 0, 0],
            [0, y, 0],
            [0, 0, 1]
        ]);
    }
    static translateMatrix(x, y) {
        return new Matrix([
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ]);
    }
    static rotateMatrix(deg) {
        return new Matrix([
            [Math.cos(deg), -1 * Math.sin(deg), 0],
            [Math.sin(deg), Math.cos(deg), 0],
            [0, 0, 1]
        ]);
    }
    static createScaleMatrix(x, y, origin) {
        return this.multiply(Matrix.translateMatrix(origin.x, origin.y), Matrix.scaleMatrix(x, y), Matrix.translateMatrix(-origin.x, -origin.y));
    }
    static createRotateMatrix(deg, origin) {
        return this.multiply(Matrix.translateMatrix(origin.x, origin.y), Matrix.rotateMatrix(deg), Matrix.translateMatrix(-origin.x, -origin.y));
    }
}


/***/ }),

/***/ "./dist/Point.js":
/*!***********************!*\
  !*** ./dist/Point.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Point: () => (/* binding */ Point)
/* harmony export */ });
/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Matrix */ "./dist/Matrix.js");

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    translate(x, y) {
        this.x += x;
        this.y += y;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    toSVG() {
        return this.x + ' ' + this.y;
    }
    asMatrix() {
        return new _Matrix__WEBPACK_IMPORTED_MODULE_0__.Matrix([[this.x], [this.y], [1]]);
    }
    transform(matrix) {
        let final = matrix.mmul(this.asMatrix());
        this.x = final.get(0, 0);
        this.y = final.get(1, 0);
    }
    static middlePoint(pointA, pointB) {
        return new Point((pointB.x + pointA.x) / 2, (pointB.y + pointA.y) / 2);
    }
}


/***/ }),

/***/ "./dist/Polygon.js":
/*!*************************!*\
  !*** ./dist/Polygon.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Polygon: () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./dist/Point.js");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Matrix */ "./dist/Matrix.js");
/* harmony import */ var _toolkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolkit */ "./dist/toolkit.js");
/* harmony import */ var _Bounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Bounds */ "./dist/Bounds.js");






class Polygon {
    constructor(points = []) {
        this.points = points;
    }
    serialize() {
        return lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.points, (point) => {
            return [point.x, point.y];
        });
    }
    deserialize(data) {
        this.points = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(data, (point) => {
            return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(point[0], point[1]);
        });
    }
    scale(x, y, origin) {
        let matrix = _Matrix__WEBPACK_IMPORTED_MODULE_3__.Matrix.createScaleMatrix(x, y, origin);
        lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(this.points, (point) => {
            point.transform(matrix);
        });
    }
    transform(matrix) {
        lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(this.points, (point) => {
            point.transform(matrix);
        });
    }
    setPoints(points) {
        this.points = points;
    }
    getPoints() {
        return this.points;
    }
    rotate(degrees) {
        this.transform(_Matrix__WEBPACK_IMPORTED_MODULE_3__.Matrix.createRotateMatrix(degrees / (180 / Math.PI), this.getOrigin()));
    }
    translate(offsetX, offsetY) {
        lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(this.points, (point) => {
            point.translate(offsetX, offsetY);
        });
    }
    doClone(ob) {
        this.points = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(ob.points, (point) => {
            return point.clone();
        });
    }
    clone() {
        let ob = Object.create(this);
        ob.doClone(this);
        return ob;
    }
    getOrigin() {
        if (this.points.length === 0) {
            return null;
        }
        let dimensions = (0,_toolkit__WEBPACK_IMPORTED_MODULE_4__.boundingBoxFromPoints)(this.points);
        return _Point__WEBPACK_IMPORTED_MODULE_0__.Point.middlePoint(dimensions[_Bounds__WEBPACK_IMPORTED_MODULE_5__.BoundsCorner.TOP_LEFT], dimensions[_Bounds__WEBPACK_IMPORTED_MODULE_5__.BoundsCorner.BOTTOM_RIGHT]);
    }
    getBoundingBox() {
        return (0,_toolkit__WEBPACK_IMPORTED_MODULE_4__.boundingBoxFromPoints)(this.points);
    }
}


/***/ }),

/***/ "./dist/Rectangle.js":
/*!***************************!*\
  !*** ./dist/Rectangle.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rectangle: () => (/* binding */ Rectangle)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./dist/Point.js");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Polygon */ "./dist/Polygon.js");
/* harmony import */ var _Bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bounds */ "./dist/Bounds.js");



class Rectangle extends _Polygon__WEBPACK_IMPORTED_MODULE_1__.Polygon {
    static fromPositionAndSize(x, y, width, height) {
        return new Rectangle((0,_Bounds__WEBPACK_IMPORTED_MODULE_2__.boundsFromPositionAndSize)(x, y, width, height));
    }
    static fromPointAndSize(position, width, height) {
        return new Rectangle((0,_Bounds__WEBPACK_IMPORTED_MODULE_2__.boundsFromPositionAndSize)(position.x, position.y, width, height));
    }
    constructor(points) {
        if (!points) {
            points = (0,_Bounds__WEBPACK_IMPORTED_MODULE_2__.createEmptyBounds)();
        }
        super([
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.TOP_LEFT],
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.TOP_RIGHT],
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.BOTTOM_RIGHT],
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.BOTTOM_LEFT]
        ]);
    }
    updateDimensions(x, y, width, height) {
        const points = (0,_Bounds__WEBPACK_IMPORTED_MODULE_2__.boundsFromPositionAndSize)(x, y, width, height);
        this.setPoints([
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.TOP_LEFT],
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.TOP_RIGHT],
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.BOTTOM_RIGHT],
            points[_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.BOTTOM_LEFT]
        ]);
    }
    setPoints(points) {
        if (points.length !== 4) {
            throw 'Rectangles must always have 4 points';
        }
        super.setPoints(points);
    }
    containsPoint(point) {
        const tl = this.getTopLeft();
        const br = this.getBottomRight();
        return point.x >= tl.x && point.x <= br.x && point.y >= tl.y && point.y <= br.y;
    }
    getWidth() {
        return Math.sqrt(Math.pow(this.getTopLeft().x - this.getTopRight().x, 2) + Math.pow(this.getTopLeft().y - this.getTopRight().y, 2));
    }
    getHeight() {
        return Math.sqrt(Math.pow(this.getBottomLeft().x - this.getTopLeft().x, 2) +
            Math.pow(this.getBottomLeft().y - this.getTopLeft().y, 2));
    }
    getTopMiddle() {
        return _Point__WEBPACK_IMPORTED_MODULE_0__.Point.middlePoint(this.getTopLeft(), this.getTopRight());
    }
    getBottomMiddle() {
        return _Point__WEBPACK_IMPORTED_MODULE_0__.Point.middlePoint(this.getBottomLeft(), this.getBottomRight());
    }
    getLeftMiddle() {
        return _Point__WEBPACK_IMPORTED_MODULE_0__.Point.middlePoint(this.getBottomLeft(), this.getTopLeft());
    }
    getRightMiddle() {
        return _Point__WEBPACK_IMPORTED_MODULE_0__.Point.middlePoint(this.getBottomRight(), this.getTopRight());
    }
    getTopLeft() {
        return this.points[0];
    }
    getTopRight() {
        return this.points[1];
    }
    getBottomRight() {
        return this.points[2];
    }
    getBottomLeft() {
        return this.points[3];
    }
}


/***/ }),

/***/ "./dist/toolkit.js":
/*!*************************!*\
  !*** ./dist/toolkit.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boundingBoxFromPoints: () => (/* binding */ boundingBoxFromPoints),
/* harmony export */   boundingBoxFromPolygons: () => (/* binding */ boundingBoxFromPolygons)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./dist/Point.js");
/* harmony import */ var lodash_flatMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/flatMap */ "lodash/flatMap");
/* harmony import */ var lodash_flatMap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_flatMap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Bounds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bounds */ "./dist/Bounds.js");



const boundingBoxFromPoints = (points) => {
    if (points.length === 0) {
        return (0,_Bounds__WEBPACK_IMPORTED_MODULE_2__.createEmptyBounds)();
    }
    let minX = points[0].x;
    let maxX = points[0].x;
    let minY = points[0].y;
    let maxY = points[0].y;
    for (let i = 1; i < points.length; i++) {
        if (points[i].x < minX) {
            minX = points[i].x;
        }
        if (points[i].x > maxX) {
            maxX = points[i].x;
        }
        if (points[i].y < minY) {
            minY = points[i].y;
        }
        if (points[i].y > maxY) {
            maxY = points[i].y;
        }
    }
    return {
        [_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.TOP_LEFT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(minX, minY),
        [_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.TOP_RIGHT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(maxX, minY),
        [_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.BOTTOM_RIGHT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(maxX, maxY),
        [_Bounds__WEBPACK_IMPORTED_MODULE_2__.BoundsCorner.BOTTOM_LEFT]: new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(minX, maxY)
    };
};
const boundingBoxFromPolygons = (polygons) => {
    return boundingBoxFromPoints(lodash_flatMap__WEBPACK_IMPORTED_MODULE_1___default()(polygons, (polygon) => {
        return polygon.getPoints();
    }));
};


/***/ }),

/***/ "lodash/flatMap":
/*!*********************************!*\
  !*** external "lodash/flatMap" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("lodash/flatMap");

/***/ }),

/***/ "lodash/forEach":
/*!*********************************!*\
  !*** external "lodash/forEach" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("lodash/forEach");

/***/ }),

/***/ "lodash/map":
/*!*****************************!*\
  !*** external "lodash/map" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/map");

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
/* harmony export */   BezierCurve: () => (/* reexport safe */ _BezierCurve__WEBPACK_IMPORTED_MODULE_4__.BezierCurve),
/* harmony export */   BezierCurvepPoints: () => (/* reexport safe */ _BezierCurve__WEBPACK_IMPORTED_MODULE_4__.BezierCurvepPoints),
/* harmony export */   BoundsCorner: () => (/* reexport safe */ _Bounds__WEBPACK_IMPORTED_MODULE_6__.BoundsCorner),
/* harmony export */   Matrix: () => (/* reexport safe */ _Matrix__WEBPACK_IMPORTED_MODULE_1__.Matrix),
/* harmony export */   Point: () => (/* reexport safe */ _Point__WEBPACK_IMPORTED_MODULE_0__.Point),
/* harmony export */   Polygon: () => (/* reexport safe */ _Polygon__WEBPACK_IMPORTED_MODULE_2__.Polygon),
/* harmony export */   Rectangle: () => (/* reexport safe */ _Rectangle__WEBPACK_IMPORTED_MODULE_3__.Rectangle),
/* harmony export */   boundingBoxFromPoints: () => (/* reexport safe */ _toolkit__WEBPACK_IMPORTED_MODULE_5__.boundingBoxFromPoints),
/* harmony export */   boundingBoxFromPolygons: () => (/* reexport safe */ _toolkit__WEBPACK_IMPORTED_MODULE_5__.boundingBoxFromPolygons),
/* harmony export */   boundsFromPositionAndSize: () => (/* reexport safe */ _Bounds__WEBPACK_IMPORTED_MODULE_6__.boundsFromPositionAndSize),
/* harmony export */   createEmptyBounds: () => (/* reexport safe */ _Bounds__WEBPACK_IMPORTED_MODULE_6__.createEmptyBounds)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./dist/Point.js");
/* harmony import */ var _Matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Matrix */ "./dist/Matrix.js");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Polygon */ "./dist/Polygon.js");
/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rectangle */ "./dist/Rectangle.js");
/* harmony import */ var _BezierCurve__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BezierCurve */ "./dist/BezierCurve.js");
/* harmony import */ var _toolkit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toolkit */ "./dist/toolkit.js");
/* harmony import */ var _Bounds__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Bounds */ "./dist/Bounds.js");








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map
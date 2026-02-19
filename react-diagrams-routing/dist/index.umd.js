(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["projectstorm/react-diagrams-routing"] = factory();
	else
		root["projectstorm/react-diagrams-routing"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/dagre/DagreEngine.js":
/*!***********************************!*\
  !*** ./dist/dagre/DagreEngine.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DagreEngine = void 0;
var react_diagrams_core_1 = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
var dagre = __webpack_require__(/*! dagre */ "dagre");
var every_1 = __webpack_require__(/*! lodash/every */ "lodash/every");
var findIndex_1 = __webpack_require__(/*! lodash/findIndex */ "lodash/findIndex");
var forEach_1 = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
var map_1 = __webpack_require__(/*! lodash/map */ "lodash/map");
var range_1 = __webpack_require__(/*! lodash/range */ "lodash/range");
var sortBy_1 = __webpack_require__(/*! lodash/sortBy */ "lodash/sortBy");
var geometry_1 = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
var DagreEngine = /** @class */ (function () {
    function DagreEngine(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    DagreEngine.prototype.redistribute = function (model) {
        // Create a new directed graph
        var g = new dagre.graphlib.Graph({
            multigraph: true,
            compound: true
        });
        g.setGraph(this.options.graph || {});
        g.setDefaultEdgeLabel(function () {
            return {};
        });
        // set nodes
        (0, forEach_1.default)(model.getNodes(), function (node) {
            g.setNode(node.getID(), { width: node.width, height: node.height });
        });
        (0, forEach_1.default)(model.getLinks(), function (link) {
            // set edges
            if (link.getSourcePort() && link.getTargetPort()) {
                g.setEdge({
                    v: link.getSourcePort().getNode().getID(),
                    w: link.getTargetPort().getNode().getID(),
                    name: link.getID()
                });
            }
        });
        // layout the graph
        dagre.layout(g);
        g.nodes().forEach(function (v) {
            var node = g.node(v);
            model.getNode(v).setPosition(node.x - node.width / 2, node.y - node.height / 2);
        });
        // also include links?
        if (this.options.includeLinks) {
            g.edges().forEach(function (e) {
                var edge = g.edge(e);
                var link = model.getLink(e.name);
                var points = [link.getFirstPoint()];
                for (var i = 1; i < edge.points.length - 1; i++) {
                    points.push(new react_diagrams_core_1.PointModel({ link: link, position: new geometry_1.Point(edge.points[i].x, edge.points[i].y) }));
                }
                link.setPoints(points.concat(link.getLastPoint()));
            });
        }
    };
    /**
     * TODO cleanup this method into smaller methods
     */
    DagreEngine.prototype.refreshLinks = function (diagram) {
        var nodeMargin = this.options.nodeMargin;
        var nodes = diagram.getNodes();
        var links = diagram.getLinks();
        var maxChunkRowIndex = -1;
        // build the chunk matrix
        var chunks = {}; // true: occupied, false: blank
        var NodeXColumnIndexDictionary = {};
        var verticalLines = [];
        (0, forEach_1.default)(nodes, function (node) {
            // find vertical lines. vertical lines go through maximum number of nodes located under each other.
            var nodeColumnCenter = node.getX() + node.width / 2;
            if ((0, every_1.default)(verticalLines, function (vLine) {
                return Math.abs(nodeColumnCenter - vLine) > nodeMargin;
            })) {
                verticalLines.push(nodeColumnCenter);
            }
        });
        // sort chunk columns
        verticalLines = verticalLines.sort(function (a, b) { return a - b; });
        (0, forEach_1.default)(verticalLines, function (line, index) {
            chunks[index] = {};
            chunks[index + 0.5] = {};
        });
        // set occupied chunks
        (0, forEach_1.default)(nodes, function (node) {
            var nodeColumnCenter = node.getX() + node.width / 2;
            var startChunkIndex = Math.floor(node.getY() / nodeMargin);
            var endChunkIndex = Math.floor((node.getY() + node.height) / nodeMargin);
            // find max ChunkRowIndex
            if (endChunkIndex > maxChunkRowIndex)
                maxChunkRowIndex = endChunkIndex;
            var nodeColumnIndex = (0, findIndex_1.default)(verticalLines, function (vLine) {
                return Math.abs(nodeColumnCenter - vLine) <= nodeMargin;
            });
            (0, forEach_1.default)((0, range_1.default)(startChunkIndex, endChunkIndex + 1), function (chunkIndex) {
                chunks[nodeColumnIndex][chunkIndex] = true;
            });
            NodeXColumnIndexDictionary[node.getX()] = nodeColumnIndex;
        });
        // sort links based on their distances
        var edges = (0, map_1.default)(links, function (link) {
            if (link.getSourcePort() && link.getTargetPort()) {
                var source = link.getSourcePort().getNode();
                var target = link.getTargetPort().getNode();
                var sourceIndex = NodeXColumnIndexDictionary[source.getX()];
                var targetIndex = NodeXColumnIndexDictionary[target.getX()];
                return sourceIndex > targetIndex
                    ? {
                        link: link,
                        sourceIndex: sourceIndex,
                        sourceY: source.getY() + source.height / 2,
                        source: source,
                        targetIndex: targetIndex,
                        targetY: target.getY() + source.height / 2,
                        target: target
                    }
                    : {
                        link: link,
                        sourceIndex: targetIndex,
                        sourceY: target.getY() + target.height / 2,
                        source: target,
                        targetIndex: sourceIndex,
                        targetY: source.getY() + source.height / 2,
                        target: source
                    };
            }
        });
        var sortedEdges = (0, sortBy_1.default)(edges, function (link) {
            return Math.abs(link.targetIndex - link.sourceIndex);
        });
        // set link points
        if (this.options.includeLinks) {
            (0, forEach_1.default)(sortedEdges, function (edge) {
                var link = diagram.getLink(edge.link.getID());
                // re-draw
                if (Math.abs(edge.sourceIndex - edge.targetIndex) > 1) {
                    // get the length of link in column
                    var columns = (0, range_1.default)(edge.sourceIndex - 1, edge.targetIndex);
                    var chunkIndex = Math.floor(edge.sourceY / nodeMargin);
                    var targetChunkIndex = Math.floor(edge.targetY / nodeMargin);
                    // check upper paths
                    var northCost = 1;
                    var aboveRowIndex_1 = chunkIndex;
                    for (; aboveRowIndex_1 >= 0; aboveRowIndex_1--, northCost++) {
                        if ((0, every_1.default)(columns, function (columnIndex) {
                            return !(chunks[columnIndex][aboveRowIndex_1] ||
                                chunks[columnIndex + 0.5][aboveRowIndex_1] ||
                                chunks[columnIndex - 0.5][aboveRowIndex_1]);
                        })) {
                            break;
                        }
                    }
                    // check lower paths
                    var southCost = 0;
                    var belowRowIndex_1 = chunkIndex;
                    for (; belowRowIndex_1 <= maxChunkRowIndex; belowRowIndex_1++, southCost++) {
                        if ((0, every_1.default)(columns, function (columnIndex) {
                            return !(chunks[columnIndex][belowRowIndex_1] ||
                                chunks[columnIndex + 0.5][belowRowIndex_1] ||
                                chunks[columnIndex - 0.5][belowRowIndex_1]);
                        })) {
                            break;
                        }
                    }
                    // pick the cheapest path
                    var pathRowIndex_1 = southCost + (belowRowIndex_1 - targetChunkIndex) < northCost + (targetChunkIndex - aboveRowIndex_1)
                        ? belowRowIndex_1 + 1
                        : aboveRowIndex_1 - 1;
                    // Finally update the link points
                    var points_1 = [link.getFirstPoint()];
                    points_1.push(new react_diagrams_core_1.PointModel({
                        link: link,
                        position: new geometry_1.Point((verticalLines[columns[0]] + verticalLines[columns[0] + 1]) / 2, (pathRowIndex_1 + 0.5) * nodeMargin)
                    }));
                    (0, forEach_1.default)(columns, function (column) {
                        points_1.push(new react_diagrams_core_1.PointModel({
                            link: link,
                            position: new geometry_1.Point(verticalLines[column], (pathRowIndex_1 + 0.5) * nodeMargin)
                        }));
                        points_1.push(new react_diagrams_core_1.PointModel({
                            link: link,
                            position: new geometry_1.Point((verticalLines[column] + verticalLines[column - 1]) / 2, (pathRowIndex_1 + 0.5) * nodeMargin)
                        }));
                        chunks[column][pathRowIndex_1] = true;
                        chunks[column][pathRowIndex_1 + 1] = true;
                        chunks[column + 0.5][pathRowIndex_1] = true;
                        chunks[column + 0.5][pathRowIndex_1 + 1] = true;
                    });
                    link.setPoints(points_1.concat(link.getLastPoint()));
                }
                else {
                    // refresh
                    link.setPoints([link.getFirstPoint(), link.getLastPoint()]);
                    var columnIndex = (edge.sourceIndex + edge.targetIndex) / 2;
                    if (!chunks[columnIndex]) {
                        chunks[columnIndex] = {};
                    }
                    var rowIndex = Math.floor((edge.sourceY + edge.targetY) / 2 / nodeMargin);
                    chunks[columnIndex][rowIndex] = true;
                    chunks[columnIndex][rowIndex + 1] = true;
                }
            });
        }
    };
    return DagreEngine;
}());
exports.DagreEngine = DagreEngine;


/***/ }),

/***/ "./dist/engine/PathFinding.js":
/*!************************************!*\
  !*** ./dist/engine/PathFinding.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PathFinding = void 0;
var PF = __webpack_require__(/*! pathfinding */ "pathfinding");
/*
it can be very expensive to calculate routes when every single pixel on the canvas
is individually represented. Using the factor below, we combine values in order
to achieve the best trade-off between accuracy and performance.
*/
var pathFinderInstance = new PF.JumpPointFinder({
    heuristic: PF.Heuristic.manhattan,
    diagonalMovement: PF.DiagonalMovement.Never
});
var PathFinding = /** @class */ (function () {
    function PathFinding(factory) {
        this.instance = pathFinderInstance;
        this.factory = factory;
    }
    /**
     * Taking as argument a fully unblocked walking matrix, this method
     * finds a direct path from point A to B.
     */
    PathFinding.prototype.calculateDirectPath = function (from, to) {
        var matrix = this.factory.getCanvasMatrix();
        var grid = new PF.Grid(matrix);
        return pathFinderInstance.findPath(this.factory.translateRoutingX(Math.floor(from.getX() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingY(Math.floor(from.getY() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingX(Math.floor(to.getX() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingY(Math.floor(to.getY() / this.factory.ROUTING_SCALING_FACTOR)), grid);
    };
    /**
     * Using @link{#calculateDirectPath}'s result as input, we here
     * determine the first walkable point found in the matrix that includes
     * blocked paths.
     */
    PathFinding.prototype.calculateLinkStartEndCoords = function (matrix, path) {
        var startIndex = path.findIndex(function (point) {
            if (matrix[point[1]])
                return matrix[point[1]][point[0]] === 0;
            else
                return false;
        });
        var endIndex = path.length -
            1 -
            path
                .slice()
                .reverse()
                .findIndex(function (point) {
                if (matrix[point[1]])
                    return matrix[point[1]][point[0]] === 0;
                else
                    return false;
            });
        // are we trying to create a path exclusively through blocked areas?
        // if so, let's fallback to the linear routing
        if (startIndex === -1 || endIndex === -1) {
            return undefined;
        }
        var pathToStart = path.slice(0, startIndex);
        var pathToEnd = path.slice(endIndex);
        return {
            start: {
                x: path[startIndex][0],
                y: path[startIndex][1]
            },
            end: {
                x: path[endIndex][0],
                y: path[endIndex][1]
            },
            pathToStart: pathToStart,
            pathToEnd: pathToEnd
        };
    };
    /**
     * Puts everything together: merges the paths from/to the centre of the ports,
     * with the path calculated around other elements.
     */
    PathFinding.prototype.calculateDynamicPath = function (routingMatrix, start, end, pathToStart, pathToEnd) {
        var _this = this;
        // generate the path based on the matrix with obstacles
        var grid = new PF.Grid(routingMatrix);
        var dynamicPath = pathFinderInstance.findPath(start.x, start.y, end.x, end.y, grid);
        // aggregate everything to have the calculated path ready for rendering
        var pathCoords = pathToStart
            .concat(dynamicPath, pathToEnd)
            .map(function (coords) { return [
            _this.factory.translateRoutingX(coords[0], true),
            _this.factory.translateRoutingY(coords[1], true)
        ]; });
        return PF.Util.compressPath(pathCoords);
    };
    return PathFinding;
}());
exports.PathFinding = PathFinding;


/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./link/PathFindingLinkFactory */ "./dist/link/PathFindingLinkFactory.js"), exports);
__exportStar(__webpack_require__(/*! ./link/PathFindingLinkModel */ "./dist/link/PathFindingLinkModel.js"), exports);
__exportStar(__webpack_require__(/*! ./link/PathFindingLinkWidget */ "./dist/link/PathFindingLinkWidget.js"), exports);
__exportStar(__webpack_require__(/*! ./link/RightAngleLinkWidget */ "./dist/link/RightAngleLinkWidget.js"), exports);
__exportStar(__webpack_require__(/*! ./link/RightAngleLinkFactory */ "./dist/link/RightAngleLinkFactory.js"), exports);
__exportStar(__webpack_require__(/*! ./link/RightAngleLinkModel */ "./dist/link/RightAngleLinkModel.js"), exports);
__exportStar(__webpack_require__(/*! ./engine/PathFinding */ "./dist/engine/PathFinding.js"), exports);
__exportStar(__webpack_require__(/*! ./dagre/DagreEngine */ "./dist/dagre/DagreEngine.js"), exports);


/***/ }),

/***/ "./dist/link/PathFindingLinkFactory.js":
/*!*********************************************!*\
  !*** ./dist/link/PathFindingLinkFactory.js ***!
  \*********************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (170:15)\nFile was processed with these loaders:\n * ../node_modules/source-map-loader/dist/cjs.js\nYou may need an additional loader to handle the result of these loaders.\n|     };\n|     PathFindingLinkFactory.prototype.generateReactWidget = function (event) {\n>         return <PathFindingLinkWidget_1.PathFindingLinkWidget diagramEngine={this.engine} link={event.model} factory={this}/>;\n|     };\n|     PathFindingLinkFactory.prototype.generateModel = function (event) {");

/***/ }),

/***/ "./dist/link/PathFindingLinkModel.js":
/*!*******************************************!*\
  !*** ./dist/link/PathFindingLinkModel.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PathFindingLinkModel = void 0;
var PathFindingLinkFactory_1 = __webpack_require__(/*! ./PathFindingLinkFactory */ "./dist/link/PathFindingLinkFactory.js");
var react_diagrams_defaults_1 = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
var PathFindingLinkModel = /** @class */ (function (_super) {
    __extends(PathFindingLinkModel, _super);
    function PathFindingLinkModel(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, __assign({ type: PathFindingLinkFactory_1.PathFindingLinkFactory.NAME }, options)) || this;
    }
    PathFindingLinkModel.prototype.performanceTune = function () {
        return false;
    };
    return PathFindingLinkModel;
}(react_diagrams_defaults_1.DefaultLinkModel));
exports.PathFindingLinkModel = PathFindingLinkModel;


/***/ }),

/***/ "./dist/link/PathFindingLinkWidget.js":
/*!********************************************!*\
  !*** ./dist/link/PathFindingLinkWidget.js ***!
  \********************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (52:16)\nFile was processed with these loaders:\n * ../node_modules/source-map-loader/dist/cjs.js\nYou may need an additional loader to handle the result of these loaders.\n|         var ref = React.createRef();\n|         this.refPaths.push(ref);\n>         return (<react_diagrams_defaults_1.DefaultLinkSegmentWidget key={\"link-\".concat(id)} path={path} selected={this.state.selected} diagramEngine={this.props.diagramEngine} factory={this.props.diagramEngine.getFactoryForLink(this.props.link)} link={this.props.link} forwardRef={ref} onSelection={function (selected) {\n|                 _this.setState({ selected: selected });\n|             }} extras={{}}/>);");

/***/ }),

/***/ "./dist/link/RightAngleLinkFactory.js":
/*!********************************************!*\
  !*** ./dist/link/RightAngleLinkFactory.js ***!
  \********************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (35:15)\nFile was processed with these loaders:\n * ../node_modules/source-map-loader/dist/cjs.js\nYou may need an additional loader to handle the result of these loaders.\n|     };\n|     RightAngleLinkFactory.prototype.generateReactWidget = function (event) {\n>         return <RightAngleLinkWidget_1.RightAngleLinkWidget diagramEngine={this.engine} link={event.model} factory={this}/>;\n|     };\n|     RightAngleLinkFactory.NAME = 'rightAngle';");

/***/ }),

/***/ "./dist/link/RightAngleLinkModel.js":
/*!******************************************!*\
  !*** ./dist/link/RightAngleLinkModel.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RightAngleLinkModel = void 0;
var react_diagrams_defaults_1 = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
var RightAngleLinkFactory_1 = __webpack_require__(/*! ./RightAngleLinkFactory */ "./dist/link/RightAngleLinkFactory.js");
var RightAngleLinkModel = /** @class */ (function (_super) {
    __extends(RightAngleLinkModel, _super);
    function RightAngleLinkModel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, __assign({ type: RightAngleLinkFactory_1.RightAngleLinkFactory.NAME }, options)) || this;
        _this.lastHoverIndexOfPath = 0;
        _this._lastPathXdirection = false;
        _this._firstPathXdirection = false;
        return _this;
    }
    RightAngleLinkModel.prototype.setFirstAndLastPathsDirection = function () {
        var points = this.getPoints();
        for (var i = 1; i < points.length; i += points.length - 2) {
            var dx = Math.abs(points[i].getX() - points[i - 1].getX());
            var dy = Math.abs(points[i].getY() - points[i - 1].getY());
            if (i - 1 === 0) {
                this._firstPathXdirection = dx > dy;
            }
            else {
                this._lastPathXdirection = dx > dy;
            }
        }
    };
    // @ts-ignore
    RightAngleLinkModel.prototype.addPoint = function (pointModel, index) {
        if (index === void 0) { index = 1; }
        // @ts-ignore
        _super.prototype.addPoint.call(this, pointModel, index);
        this.setFirstAndLastPathsDirection();
        return pointModel;
    };
    RightAngleLinkModel.prototype.deserialize = function (event) {
        _super.prototype.deserialize.call(this, event);
        this.setFirstAndLastPathsDirection();
    };
    RightAngleLinkModel.prototype.setManuallyFirstAndLastPathsDirection = function (first, last) {
        this._firstPathXdirection = first;
        this._lastPathXdirection = last;
    };
    RightAngleLinkModel.prototype.getLastPathXdirection = function () {
        return this._lastPathXdirection;
    };
    RightAngleLinkModel.prototype.getFirstPathXdirection = function () {
        return this._firstPathXdirection;
    };
    RightAngleLinkModel.prototype.setWidth = function (width) {
        this.options.width = width;
        this.fireEvent({ width: width }, 'widthChanged');
    };
    RightAngleLinkModel.prototype.setColor = function (color) {
        this.options.color = color;
        this.fireEvent({ color: color }, 'colorChanged');
    };
    return RightAngleLinkModel;
}(react_diagrams_defaults_1.DefaultLinkModel));
exports.RightAngleLinkModel = RightAngleLinkModel;


/***/ }),

/***/ "./dist/link/RightAngleLinkWidget.js":
/*!*******************************************!*\
  !*** ./dist/link/RightAngleLinkWidget.js ***!
  \*******************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (70:16)\nFile was processed with these loaders:\n * ../node_modules/source-map-loader/dist/cjs.js\nYou may need an additional loader to handle the result of these loaders.\n|         var ref = React.createRef();\n|         this.refPaths.push(ref);\n>         return (<react_diagrams_defaults_1.DefaultLinkSegmentWidget key={\"link-\".concat(id)} path={path} selected={this.state.selected} diagramEngine={this.props.diagramEngine} factory={this.props.diagramEngine.getFactoryForLink(this.props.link)} link={this.props.link} forwardRef={ref} onSelection={function (selected) {\n|                 _this.setState({ selected: selected });\n|             }} extras={extraProps}/>);");

/***/ }),

/***/ "@projectstorm/geometry":
/*!*****************************************!*\
  !*** external "@projectstorm/geometry" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@projectstorm/geometry");

/***/ }),

/***/ "@projectstorm/react-diagrams-core":
/*!****************************************************!*\
  !*** external "@projectstorm/react-diagrams-core" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@projectstorm/react-diagrams-core");

/***/ }),

/***/ "@projectstorm/react-diagrams-defaults":
/*!********************************************************!*\
  !*** external "@projectstorm/react-diagrams-defaults" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@projectstorm/react-diagrams-defaults");

/***/ }),

/***/ "dagre":
/*!************************!*\
  !*** external "dagre" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("dagre");

/***/ }),

/***/ "lodash/every":
/*!*******************************!*\
  !*** external "lodash/every" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/every");

/***/ }),

/***/ "lodash/findIndex":
/*!***********************************!*\
  !*** external "lodash/findIndex" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/findIndex");

/***/ }),

/***/ "lodash/forEach":
/*!*********************************!*\
  !*** external "lodash/forEach" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/forEach");

/***/ }),

/***/ "lodash/map":
/*!*****************************!*\
  !*** external "lodash/map" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/map");

/***/ }),

/***/ "lodash/range":
/*!*******************************!*\
  !*** external "lodash/range" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/range");

/***/ }),

/***/ "lodash/sortBy":
/*!********************************!*\
  !*** external "lodash/sortBy" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/sortBy");

/***/ }),

/***/ "pathfinding":
/*!******************************!*\
  !*** external "pathfinding" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("pathfinding");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map
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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/dagre/DagreEngine.js":
/*!***********************************!*\
  !*** ./dist/dagre/DagreEngine.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DagreEngine: () => (/* binding */ DagreEngine)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dagre__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dagre */ "dagre");
/* harmony import */ var dagre__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dagre__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_every__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/every */ "lodash/every");
/* harmony import */ var lodash_every__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_every__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/findIndex */ "lodash/findIndex");
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/range */ "lodash/range");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/sortBy */ "lodash/sortBy");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8__);









class DagreEngine {
    constructor(options = {}) {
        this.options = options;
    }
    redistribute(model) {
        // Create a new directed graph
        var g = new dagre__WEBPACK_IMPORTED_MODULE_1__.graphlib.Graph({
            multigraph: true,
            compound: true
        });
        g.setGraph(this.options.graph || {});
        g.setDefaultEdgeLabel(function () {
            return {};
        });
        // set nodes
        lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(model.getNodes(), (node) => {
            g.setNode(node.getID(), { width: node.width, height: node.height });
        });
        lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(model.getLinks(), (link) => {
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
        dagre__WEBPACK_IMPORTED_MODULE_1__.layout(g);
        g.nodes().forEach((v) => {
            const node = g.node(v);
            model.getNode(v).setPosition(node.x - node.width / 2, node.y - node.height / 2);
        });
        // also include links?
        if (this.options.includeLinks) {
            g.edges().forEach((e) => {
                const edge = g.edge(e);
                const link = model.getLink(e.name);
                const points = [link.getFirstPoint()];
                for (let i = 1; i < edge.points.length - 1; i++) {
                    points.push(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PointModel({ link: link, position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8__.Point(edge.points[i].x, edge.points[i].y) }));
                }
                link.setPoints(points.concat(link.getLastPoint()));
            });
        }
    }
    /**
     * TODO cleanup this method into smaller methods
     */
    refreshLinks(diagram) {
        const { nodeMargin } = this.options;
        const nodes = diagram.getNodes();
        const links = diagram.getLinks();
        let maxChunkRowIndex = -1;
        // build the chunk matrix
        const chunks = {}; // true: occupied, false: blank
        const NodeXColumnIndexDictionary = {};
        let verticalLines = [];
        lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(nodes, (node) => {
            // find vertical lines. vertical lines go through maximum number of nodes located under each other.
            const nodeColumnCenter = node.getX() + node.width / 2;
            if (lodash_every__WEBPACK_IMPORTED_MODULE_2___default()(verticalLines, (vLine) => {
                return Math.abs(nodeColumnCenter - vLine) > nodeMargin;
            })) {
                verticalLines.push(nodeColumnCenter);
            }
        });
        // sort chunk columns
        verticalLines = verticalLines.sort((a, b) => a - b);
        lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(verticalLines, (line, index) => {
            chunks[index] = {};
            chunks[index + 0.5] = {};
        });
        // set occupied chunks
        lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(nodes, (node) => {
            const nodeColumnCenter = node.getX() + node.width / 2;
            const startChunkIndex = Math.floor(node.getY() / nodeMargin);
            const endChunkIndex = Math.floor((node.getY() + node.height) / nodeMargin);
            // find max ChunkRowIndex
            if (endChunkIndex > maxChunkRowIndex)
                maxChunkRowIndex = endChunkIndex;
            const nodeColumnIndex = lodash_findIndex__WEBPACK_IMPORTED_MODULE_3___default()(verticalLines, (vLine) => {
                return Math.abs(nodeColumnCenter - vLine) <= nodeMargin;
            });
            lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(lodash_range__WEBPACK_IMPORTED_MODULE_6___default()(startChunkIndex, endChunkIndex + 1), (chunkIndex) => {
                chunks[nodeColumnIndex][chunkIndex] = true;
            });
            NodeXColumnIndexDictionary[node.getX()] = nodeColumnIndex;
        });
        // sort links based on their distances
        const edges = lodash_map__WEBPACK_IMPORTED_MODULE_5___default()(links, (link) => {
            if (link.getSourcePort() && link.getTargetPort()) {
                const source = link.getSourcePort().getNode();
                const target = link.getTargetPort().getNode();
                const sourceIndex = NodeXColumnIndexDictionary[source.getX()];
                const targetIndex = NodeXColumnIndexDictionary[target.getX()];
                return sourceIndex > targetIndex
                    ? {
                        link,
                        sourceIndex,
                        sourceY: source.getY() + source.height / 2,
                        source,
                        targetIndex,
                        targetY: target.getY() + source.height / 2,
                        target
                    }
                    : {
                        link,
                        sourceIndex: targetIndex,
                        sourceY: target.getY() + target.height / 2,
                        source: target,
                        targetIndex: sourceIndex,
                        targetY: source.getY() + source.height / 2,
                        target: source
                    };
            }
        });
        const sortedEdges = lodash_sortBy__WEBPACK_IMPORTED_MODULE_7___default()(edges, (link) => {
            return Math.abs(link.targetIndex - link.sourceIndex);
        });
        // set link points
        if (this.options.includeLinks) {
            lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(sortedEdges, (edge) => {
                const link = diagram.getLink(edge.link.getID());
                // re-draw
                if (Math.abs(edge.sourceIndex - edge.targetIndex) > 1) {
                    // get the length of link in column
                    const columns = lodash_range__WEBPACK_IMPORTED_MODULE_6___default()(edge.sourceIndex - 1, edge.targetIndex);
                    const chunkIndex = Math.floor(edge.sourceY / nodeMargin);
                    const targetChunkIndex = Math.floor(edge.targetY / nodeMargin);
                    // check upper paths
                    let northCost = 1;
                    let aboveRowIndex = chunkIndex;
                    for (; aboveRowIndex >= 0; aboveRowIndex--, northCost++) {
                        if (lodash_every__WEBPACK_IMPORTED_MODULE_2___default()(columns, (columnIndex) => {
                            return !(chunks[columnIndex][aboveRowIndex] ||
                                chunks[columnIndex + 0.5][aboveRowIndex] ||
                                chunks[columnIndex - 0.5][aboveRowIndex]);
                        })) {
                            break;
                        }
                    }
                    // check lower paths
                    let southCost = 0;
                    let belowRowIndex = chunkIndex;
                    for (; belowRowIndex <= maxChunkRowIndex; belowRowIndex++, southCost++) {
                        if (lodash_every__WEBPACK_IMPORTED_MODULE_2___default()(columns, (columnIndex) => {
                            return !(chunks[columnIndex][belowRowIndex] ||
                                chunks[columnIndex + 0.5][belowRowIndex] ||
                                chunks[columnIndex - 0.5][belowRowIndex]);
                        })) {
                            break;
                        }
                    }
                    // pick the cheapest path
                    const pathRowIndex = southCost + (belowRowIndex - targetChunkIndex) < northCost + (targetChunkIndex - aboveRowIndex)
                        ? belowRowIndex + 1
                        : aboveRowIndex - 1;
                    // Finally update the link points
                    const points = [link.getFirstPoint()];
                    points.push(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PointModel({
                        link: link,
                        position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8__.Point((verticalLines[columns[0]] + verticalLines[columns[0] + 1]) / 2, (pathRowIndex + 0.5) * nodeMargin)
                    }));
                    lodash_forEach__WEBPACK_IMPORTED_MODULE_4___default()(columns, (column) => {
                        points.push(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PointModel({
                            link: link,
                            position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8__.Point(verticalLines[column], (pathRowIndex + 0.5) * nodeMargin)
                        }));
                        points.push(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PointModel({
                            link: link,
                            position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_8__.Point((verticalLines[column] + verticalLines[column - 1]) / 2, (pathRowIndex + 0.5) * nodeMargin)
                        }));
                        chunks[column][pathRowIndex] = true;
                        chunks[column][pathRowIndex + 1] = true;
                        chunks[column + 0.5][pathRowIndex] = true;
                        chunks[column + 0.5][pathRowIndex + 1] = true;
                    });
                    link.setPoints(points.concat(link.getLastPoint()));
                }
                else {
                    // refresh
                    link.setPoints([link.getFirstPoint(), link.getLastPoint()]);
                    const columnIndex = (edge.sourceIndex + edge.targetIndex) / 2;
                    if (!chunks[columnIndex]) {
                        chunks[columnIndex] = {};
                    }
                    const rowIndex = Math.floor((edge.sourceY + edge.targetY) / 2 / nodeMargin);
                    chunks[columnIndex][rowIndex] = true;
                    chunks[columnIndex][rowIndex + 1] = true;
                }
            });
        }
    }
}


/***/ }),

/***/ "./dist/engine/PathFinding.js":
/*!************************************!*\
  !*** ./dist/engine/PathFinding.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathFinding: () => (/* binding */ PathFinding)
/* harmony export */ });
/* harmony import */ var pathfinding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pathfinding */ "pathfinding");
/* harmony import */ var pathfinding__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pathfinding__WEBPACK_IMPORTED_MODULE_0__);

/*
it can be very expensive to calculate routes when every single pixel on the canvas
is individually represented. Using the factor below, we combine values in order
to achieve the best trade-off between accuracy and performance.
*/
const pathFinderInstance = new pathfinding__WEBPACK_IMPORTED_MODULE_0__.JumpPointFinder({
    heuristic: pathfinding__WEBPACK_IMPORTED_MODULE_0__.Heuristic.manhattan,
    diagonalMovement: pathfinding__WEBPACK_IMPORTED_MODULE_0__.DiagonalMovement.Never
});
class PathFinding {
    constructor(factory) {
        this.instance = pathFinderInstance;
        this.factory = factory;
    }
    /**
     * Taking as argument a fully unblocked walking matrix, this method
     * finds a direct path from point A to B.
     */
    calculateDirectPath(from, to) {
        const matrix = this.factory.getCanvasMatrix();
        const grid = new pathfinding__WEBPACK_IMPORTED_MODULE_0__.Grid(matrix);
        return pathFinderInstance.findPath(this.factory.translateRoutingX(Math.floor(from.getX() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingY(Math.floor(from.getY() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingX(Math.floor(to.getX() / this.factory.ROUTING_SCALING_FACTOR)), this.factory.translateRoutingY(Math.floor(to.getY() / this.factory.ROUTING_SCALING_FACTOR)), grid);
    }
    /**
     * Using @link{#calculateDirectPath}'s result as input, we here
     * determine the first walkable point found in the matrix that includes
     * blocked paths.
     */
    calculateLinkStartEndCoords(matrix, path) {
        const startIndex = path.findIndex((point) => {
            if (matrix[point[1]])
                return matrix[point[1]][point[0]] === 0;
            else
                return false;
        });
        const endIndex = path.length -
            1 -
            path
                .slice()
                .reverse()
                .findIndex((point) => {
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
        const pathToStart = path.slice(0, startIndex);
        const pathToEnd = path.slice(endIndex);
        return {
            start: {
                x: path[startIndex][0],
                y: path[startIndex][1]
            },
            end: {
                x: path[endIndex][0],
                y: path[endIndex][1]
            },
            pathToStart,
            pathToEnd
        };
    }
    /**
     * Puts everything together: merges the paths from/to the centre of the ports,
     * with the path calculated around other elements.
     */
    calculateDynamicPath(routingMatrix, start, end, pathToStart, pathToEnd) {
        // generate the path based on the matrix with obstacles
        const grid = new pathfinding__WEBPACK_IMPORTED_MODULE_0__.Grid(routingMatrix);
        const dynamicPath = pathFinderInstance.findPath(start.x, start.y, end.x, end.y, grid);
        // aggregate everything to have the calculated path ready for rendering
        const pathCoords = pathToStart
            .concat(dynamicPath, pathToEnd)
            .map((coords) => [
            this.factory.translateRoutingX(coords[0], true),
            this.factory.translateRoutingY(coords[1], true)
        ]);
        return pathfinding__WEBPACK_IMPORTED_MODULE_0__.Util.compressPath(pathCoords);
    }
}


/***/ }),

/***/ "./dist/link/PathFindingLinkFactory.js":
/*!*********************************************!*\
  !*** ./dist/link/PathFindingLinkFactory.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathFindingLinkFactory: () => (/* binding */ PathFindingLinkFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PathFindingLinkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PathFindingLinkModel */ "./dist/link/PathFindingLinkModel.js");
/* harmony import */ var _PathFindingLinkWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PathFindingLinkWidget */ "./dist/link/PathFindingLinkWidget.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/cloneDeep */ "lodash/cloneDeep");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_concat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/concat */ "lodash/concat");
/* harmony import */ var lodash_concat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_concat__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_defer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/defer */ "lodash/defer");
/* harmony import */ var lodash_defer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_defer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_flatMap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/flatMap */ "lodash/flatMap");
/* harmony import */ var lodash_flatMap__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_flatMap__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/get */ "lodash/get");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_minBy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/minBy */ "lodash/minBy");
/* harmony import */ var lodash_minBy__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_minBy__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_maxBy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/maxBy */ "lodash/maxBy");
/* harmony import */ var lodash_maxBy__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_maxBy__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash/range */ "lodash/range");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash/reduce */ "lodash/reduce");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash/values */ "lodash/values");
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var paths_js_path__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! paths-js/path */ "paths-js/path");
/* harmony import */ var paths_js_path__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(paths_js_path__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_15__);
















class PathFindingLinkFactory extends _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_14__.DefaultLinkFactory {
    constructor() {
        super(PathFindingLinkFactory.NAME);
        this.ROUTING_SCALING_FACTOR = 5;
        // calculated only when smart routing is active
        this.canvasMatrix = [];
        this.routingMatrix = [];
        // used when at least one element has negative coordinates
        this.hAdjustmentFactor = 0;
        this.vAdjustmentFactor = 0;
        /**
         * Despite being a long method, we simply iterate over all three collections (nodes, ports and points)
         * to find the highest X and Y dimensions, so we can build the matrix large enough to contain all elements.
         */
        this.calculateMatrixDimensions = () => {
            const allNodesCoords = lodash_values__WEBPACK_IMPORTED_MODULE_12___default()(this.engine.getModel().getNodes()).map((item) => ({
                x: item.getX(),
                width: item.width,
                y: item.getY(),
                height: item.height
            }));
            const allLinks = lodash_values__WEBPACK_IMPORTED_MODULE_12___default()(this.engine.getModel().getLinks());
            const allPortsCoords = lodash_flatMap__WEBPACK_IMPORTED_MODULE_6___default()(allLinks.map((link) => [link.getSourcePort(), link.getTargetPort()]))
                .filter((port) => port !== null)
                .map((item) => ({
                x: item.getX(),
                width: item.width,
                y: item.getY(),
                height: item.height
            }));
            const allPointsCoords = lodash_flatMap__WEBPACK_IMPORTED_MODULE_6___default()(allLinks.map((link) => link.getPoints())).map((item) => ({
                // points don't have width/height, so let's just use 0
                x: item.getX(),
                width: 0,
                y: item.getY(),
                height: 0
            }));
            const sumProps = (object, props) => lodash_reduce__WEBPACK_IMPORTED_MODULE_11___default()(props, (acc, prop) => acc + lodash_get__WEBPACK_IMPORTED_MODULE_7___default()(object, prop, 0), 0);
            const canvas = this.engine.getCanvas();
            const concatedCoords = lodash_concat__WEBPACK_IMPORTED_MODULE_4___default()(allNodesCoords, allPortsCoords, allPointsCoords);
            const minX = Math.floor(Math.min(lodash_get__WEBPACK_IMPORTED_MODULE_7___default()(lodash_minBy__WEBPACK_IMPORTED_MODULE_8___default()(concatedCoords, 'x'), 'x', 0), 0) / this.ROUTING_SCALING_FACTOR) *
                this.ROUTING_SCALING_FACTOR;
            const maxXElement = lodash_maxBy__WEBPACK_IMPORTED_MODULE_9___default()(concatedCoords, (item) => sumProps(item, ['x', 'width']));
            const maxX = Math.max(sumProps(maxXElement, ['x', 'width']), canvas.offsetWidth);
            const minYCoords = lodash_minBy__WEBPACK_IMPORTED_MODULE_8___default()(concatedCoords, 'y');
            const minY = Math.floor(Math.min(lodash_get__WEBPACK_IMPORTED_MODULE_7___default()(minYCoords, 'y', 0), 0) / this.ROUTING_SCALING_FACTOR) * this.ROUTING_SCALING_FACTOR;
            const maxYElement = lodash_maxBy__WEBPACK_IMPORTED_MODULE_9___default()(concatedCoords, (item) => sumProps(item, ['y', 'height']));
            const maxY = Math.max(sumProps(maxYElement, ['y', 'height']), canvas.offsetHeight);
            return {
                width: Math.ceil(Math.abs(minX) + maxX),
                hAdjustmentFactor: Math.abs(minX) / this.ROUTING_SCALING_FACTOR + 1,
                height: Math.ceil(Math.abs(minY) + maxY),
                vAdjustmentFactor: Math.abs(minY) / this.ROUTING_SCALING_FACTOR + 1
            };
        };
        /**
         * Updates (by reference) where nodes will be drawn on the matrix passed in.
         */
        this.markNodes = (matrix) => {
            lodash_values__WEBPACK_IMPORTED_MODULE_12___default()(this.engine.getModel().getNodes()).forEach((node) => {
                const startX = Math.floor(node.getX() / this.ROUTING_SCALING_FACTOR);
                const endX = Math.ceil((node.getX() + node.width) / this.ROUTING_SCALING_FACTOR);
                const startY = Math.floor(node.getY() / this.ROUTING_SCALING_FACTOR);
                const endY = Math.ceil((node.getY() + node.height) / this.ROUTING_SCALING_FACTOR);
                for (let x = startX - 1; x <= endX + 1; x++) {
                    for (let y = startY - 1; y < endY + 1; y++) {
                        this.markMatrixPoint(matrix, this.translateRoutingX(x), this.translateRoutingY(y));
                    }
                }
            });
        };
        /**
         * Updates (by reference) where ports will be drawn on the matrix passed in.
         */
        this.markPorts = (matrix) => {
            const allElements = lodash_flatMap__WEBPACK_IMPORTED_MODULE_6___default()(lodash_values__WEBPACK_IMPORTED_MODULE_12___default()(this.engine.getModel().getLinks()).map((link) => [].concat(link.getSourcePort(), link.getTargetPort())));
            allElements
                .filter((port) => port !== null)
                .forEach((port) => {
                const startX = Math.floor(port.x / this.ROUTING_SCALING_FACTOR);
                const endX = Math.ceil((port.x + port.width) / this.ROUTING_SCALING_FACTOR);
                const startY = Math.floor(port.y / this.ROUTING_SCALING_FACTOR);
                const endY = Math.ceil((port.y + port.height) / this.ROUTING_SCALING_FACTOR);
                for (let x = startX - 1; x <= endX + 1; x++) {
                    for (let y = startY - 1; y < endY + 1; y++) {
                        this.markMatrixPoint(matrix, this.translateRoutingX(x), this.translateRoutingY(y));
                    }
                }
            });
        };
        this.markMatrixPoint = (matrix, x, y) => {
            if (matrix[y] !== undefined && matrix[y][x] !== undefined) {
                matrix[y][x] = 1;
            }
        };
    }
    setDiagramEngine(engine) {
        super.setDiagramEngine(engine);
        // listen for drag changes
        engine.getStateMachine().registerListener({
            stateChanged: (event) => {
                if (event.newState instanceof _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_15__.AbstractDisplacementState) {
                    const deRegister = engine.getActionEventBus().registerAction(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_15__.Action({
                        type: _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_15__.InputType.MOUSE_UP,
                        fire: () => {
                            this.calculateRoutingMatrix();
                            engine.repaintCanvas();
                            deRegister();
                        }
                    }));
                }
            }
        });
        this.listener = engine.registerListener({
            canvasReady: () => {
                lodash_defer__WEBPACK_IMPORTED_MODULE_5___default()(() => {
                    this.calculateRoutingMatrix();
                    engine.repaintCanvas();
                });
            }
        });
    }
    setFactoryBank(bank) {
        super.setFactoryBank(bank);
        if (!bank && this.listener) {
            this.listener.deregister();
        }
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PathFindingLinkWidget__WEBPACK_IMPORTED_MODULE_2__.PathFindingLinkWidget, { diagramEngine: this.engine, link: event.model, factory: this });
    }
    generateModel(event) {
        return new _PathFindingLinkModel__WEBPACK_IMPORTED_MODULE_1__.PathFindingLinkModel();
    }
    /**
     * A representation of the canvas in the following format:
     *
     * +-----------------+
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * | 0 0 0 0 0 0 0 0 |
     * +-----------------+
     *
     * In which all walkable points are marked by zeros.
     * It uses @link{#ROUTING_SCALING_FACTOR} to reduce the matrix dimensions and improve performance.
     */
    getCanvasMatrix() {
        if (this.canvasMatrix.length === 0) {
            this.calculateCanvasMatrix();
        }
        return this.canvasMatrix;
    }
    calculateCanvasMatrix() {
        const { width: canvasWidth, hAdjustmentFactor, height: canvasHeight, vAdjustmentFactor } = this.calculateMatrixDimensions();
        this.hAdjustmentFactor = hAdjustmentFactor;
        this.vAdjustmentFactor = vAdjustmentFactor;
        const matrixWidth = Math.ceil(canvasWidth / this.ROUTING_SCALING_FACTOR);
        const matrixHeight = Math.ceil(canvasHeight / this.ROUTING_SCALING_FACTOR);
        this.canvasMatrix = lodash_range__WEBPACK_IMPORTED_MODULE_10___default()(0, matrixHeight).map(() => {
            return new Array(matrixWidth).fill(0);
        });
    }
    /**
     * A representation of the canvas in the following format:
     *
     * +-----------------+
     * | 0 0 1 1 0 0 0 0 |
     * | 0 0 1 1 0 0 1 1 |
     * | 0 0 0 0 0 0 1 1 |
     * | 1 1 0 0 0 0 0 0 |
     * | 1 1 0 0 0 0 0 0 |
     * +-----------------+
     *
     * In which all points blocked by a node (and its ports) are
     * marked as 1; points were there is nothing (ie, free) receive 0.
     */
    getRoutingMatrix() {
        if (this.routingMatrix.length === 0) {
            this.calculateRoutingMatrix();
        }
        return this.routingMatrix;
    }
    calculateRoutingMatrix() {
        const matrix = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_3___default()(this.getCanvasMatrix());
        // nodes need to be marked as blocked points
        this.markNodes(matrix);
        // same thing for ports
        this.markPorts(matrix);
        this.routingMatrix = matrix;
    }
    /**
     * The routing matrix does not have negative indexes, but elements could be negatively positioned.
     * We use the functions below to translate back and forth between these coordinates, relying on the
     * calculated values of hAdjustmentFactor and vAdjustmentFactor.
     */
    translateRoutingX(x, reverse = false) {
        return x + this.hAdjustmentFactor * (reverse ? -1 : 1);
    }
    translateRoutingY(y, reverse = false) {
        return y + this.vAdjustmentFactor * (reverse ? -1 : 1);
    }
    generateDynamicPath(pathCoords) {
        let path = paths_js_path__WEBPACK_IMPORTED_MODULE_13__();
        path = path.moveto(pathCoords[0][0] * this.ROUTING_SCALING_FACTOR, pathCoords[0][1] * this.ROUTING_SCALING_FACTOR);
        pathCoords.slice(1).forEach((coords) => {
            path = path.lineto(coords[0] * this.ROUTING_SCALING_FACTOR, coords[1] * this.ROUTING_SCALING_FACTOR);
        });
        return path.print();
    }
}
PathFindingLinkFactory.NAME = 'pathfinding';


/***/ }),

/***/ "./dist/link/PathFindingLinkModel.js":
/*!*******************************************!*\
  !*** ./dist/link/PathFindingLinkModel.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathFindingLinkModel: () => (/* binding */ PathFindingLinkModel)
/* harmony export */ });
/* harmony import */ var _PathFindingLinkFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PathFindingLinkFactory */ "./dist/link/PathFindingLinkFactory.js");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__);


class PathFindingLinkModel extends _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_1__.DefaultLinkModel {
    constructor(options = {}) {
        super(Object.assign({ type: _PathFindingLinkFactory__WEBPACK_IMPORTED_MODULE_0__.PathFindingLinkFactory.NAME }, options));
    }
    performanceTune() {
        return false;
    }
}


/***/ }),

/***/ "./dist/link/PathFindingLinkWidget.js":
/*!********************************************!*\
  !*** ./dist/link/PathFindingLinkWidget.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathFindingLinkWidget: () => (/* binding */ PathFindingLinkWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_first__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/first */ "lodash/first");
/* harmony import */ var lodash_first__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_first__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_last__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/last */ "lodash/last");
/* harmony import */ var lodash_last__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_last__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _engine_PathFinding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../engine/PathFinding */ "./dist/engine/PathFinding.js");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_4__);





class PathFindingLinkWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.refPaths = [];
        this.state = {
            selected: false
        };
        this.pathFinding = new _engine_PathFinding__WEBPACK_IMPORTED_MODULE_3__.PathFinding(this.props.factory);
    }
    componentDidUpdate() {
        this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
            return ref.current;
        }));
    }
    componentDidMount() {
        this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
            return ref.current;
        }));
    }
    componentWillUnmount() {
        this.props.link.setRenderedPaths([]);
    }
    generateLink(path, id) {
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
        this.refPaths.push(ref);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_4__.DefaultLinkSegmentWidget, { key: `link-${id}`, path: path, selected: this.state.selected, diagramEngine: this.props.diagramEngine, factory: this.props.diagramEngine.getFactoryForLink(this.props.link), link: this.props.link, forwardRef: ref, onSelection: (selected) => {
                this.setState({ selected: selected });
            }, extras: {} }));
    }
    render() {
        this.refPaths = [];
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        // first step: calculate a direct path between the points being linked
        const directPathCoords = this.pathFinding.calculateDirectPath(lodash_first__WEBPACK_IMPORTED_MODULE_1___default()(points), lodash_last__WEBPACK_IMPORTED_MODULE_2___default()(points));
        const routingMatrix = this.props.factory.getRoutingMatrix();
        // now we need to extract, from the routing matrix, the very first walkable points
        // so they can be used as origin and destination of the link to be created
        const smartLink = this.pathFinding.calculateLinkStartEndCoords(routingMatrix, directPathCoords);
        if (smartLink) {
            const { start, end, pathToStart, pathToEnd } = smartLink;
            // second step: calculate a path avoiding hitting other elements
            const simplifiedPath = this.pathFinding.calculateDynamicPath(routingMatrix, start, end, pathToStart, pathToEnd);
            paths.push(
            //smooth: boolean, extraProps: any, id: string | number, firstPoint: PointModel, lastPoint: PointModel
            this.generateLink(this.props.factory.generateDynamicPath(simplifiedPath), '0'));
        }
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, paths);
    }
}


/***/ }),

/***/ "./dist/link/RightAngleLinkFactory.js":
/*!********************************************!*\
  !*** ./dist/link/RightAngleLinkFactory.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RightAngleLinkFactory: () => (/* binding */ RightAngleLinkFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RightAngleLinkWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RightAngleLinkWidget */ "./dist/link/RightAngleLinkWidget.js");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _RightAngleLinkModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RightAngleLinkModel */ "./dist/link/RightAngleLinkModel.js");




/**
 * @author Daniel Lazar
 */
class RightAngleLinkFactory extends _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2__.DefaultLinkFactory {
    constructor() {
        super(RightAngleLinkFactory.NAME);
    }
    generateModel(event) {
        return new _RightAngleLinkModel__WEBPACK_IMPORTED_MODULE_3__.RightAngleLinkModel();
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_RightAngleLinkWidget__WEBPACK_IMPORTED_MODULE_1__.RightAngleLinkWidget, { diagramEngine: this.engine, link: event.model, factory: this });
    }
}
RightAngleLinkFactory.NAME = 'rightAngle';


/***/ }),

/***/ "./dist/link/RightAngleLinkModel.js":
/*!******************************************!*\
  !*** ./dist/link/RightAngleLinkModel.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RightAngleLinkModel: () => (/* binding */ RightAngleLinkModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RightAngleLinkFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RightAngleLinkFactory */ "./dist/link/RightAngleLinkFactory.js");


class RightAngleLinkModel extends _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_0__.DefaultLinkModel {
    constructor(options = {}) {
        super(Object.assign({ type: _RightAngleLinkFactory__WEBPACK_IMPORTED_MODULE_1__.RightAngleLinkFactory.NAME }, options));
        this.lastHoverIndexOfPath = 0;
        this._lastPathXdirection = false;
        this._firstPathXdirection = false;
    }
    setFirstAndLastPathsDirection() {
        let points = this.getPoints();
        for (let i = 1; i < points.length; i += points.length - 2) {
            let dx = Math.abs(points[i].getX() - points[i - 1].getX());
            let dy = Math.abs(points[i].getY() - points[i - 1].getY());
            if (i - 1 === 0) {
                this._firstPathXdirection = dx > dy;
            }
            else {
                this._lastPathXdirection = dx > dy;
            }
        }
    }
    // @ts-ignore
    addPoint(pointModel, index = 1) {
        // @ts-ignore
        super.addPoint(pointModel, index);
        this.setFirstAndLastPathsDirection();
        return pointModel;
    }
    deserialize(event) {
        super.deserialize(event);
        this.setFirstAndLastPathsDirection();
    }
    setManuallyFirstAndLastPathsDirection(first, last) {
        this._firstPathXdirection = first;
        this._lastPathXdirection = last;
    }
    getLastPathXdirection() {
        return this._lastPathXdirection;
    }
    getFirstPathXdirection() {
        return this._firstPathXdirection;
    }
    setWidth(width) {
        this.options.width = width;
        this.fireEvent({ width }, 'widthChanged');
    }
    setColor(color) {
        this.options.color = color;
        this.fireEvent({ color }, 'colorChanged');
    }
}


/***/ }),

/***/ "./dist/link/RightAngleLinkWidget.js":
/*!*******************************************!*\
  !*** ./dist/link/RightAngleLinkWidget.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RightAngleLinkWidget: () => (/* binding */ RightAngleLinkWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/react-diagrams-defaults */ "@projectstorm/react-diagrams-defaults");
/* harmony import */ var _projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__);




class RightAngleLinkWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.handleMove = function (event) {
            this.draggingEvent(event, this.dragging_index);
        }.bind(this);
        this.handleUp = function (event) {
            // Unregister handlers to avoid multiple event handlers for other links
            this.setState({ canDrag: false, selected: false });
            window.removeEventListener('mousemove', this.handleMove);
            window.removeEventListener('mouseup', this.handleUp);
        }.bind(this);
        this.refPaths = [];
        this.state = {
            selected: false,
            canDrag: false
        };
        this.dragging_index = 0;
    }
    componentDidUpdate() {
        this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
            return ref.current;
        }));
    }
    componentDidMount() {
        this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
            return ref.current;
        }));
    }
    componentWillUnmount() {
        this.props.link.setRenderedPaths([]);
    }
    generateLink(path, extraProps, id) {
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
        this.refPaths.push(ref);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_projectstorm_react_diagrams_defaults__WEBPACK_IMPORTED_MODULE_2__.DefaultLinkSegmentWidget, { key: `link-${id}`, path: path, selected: this.state.selected, diagramEngine: this.props.diagramEngine, factory: this.props.diagramEngine.getFactoryForLink(this.props.link), link: this.props.link, forwardRef: ref, onSelection: (selected) => {
                this.setState({ selected: selected });
            }, extras: extraProps }));
    }
    calculatePositions(points, event, index, coordinate) {
        // If path is first or last add another point to keep node port on its position
        if (index === 0) {
            let point = new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PointModel({
                link: this.props.link,
                position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__.Point(points[index].getX(), points[index].getY())
            });
            this.props.link.addPoint(point, index);
            this.dragging_index++;
            return;
        }
        else if (index === points.length - 2) {
            let point = new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PointModel({
                link: this.props.link,
                position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__.Point(points[index + 1].getX(), points[index + 1].getY())
            });
            this.props.link.addPoint(point, index + 1);
            return;
        }
        // Merge two points if it is not close to node port and close to each other
        if (index - 2 > 0) {
            let _points = {
                [index - 2]: points[index - 2].getPosition(),
                [index + 1]: points[index + 1].getPosition(),
                [index - 1]: points[index - 1].getPosition()
            };
            if (Math.abs(_points[index - 1][coordinate] - _points[index + 1][coordinate]) < 5) {
                _points[index - 2][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                _points[index + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                points[index - 2].setPosition(_points[index - 2]);
                points[index + 1].setPosition(_points[index + 1]);
                points[index - 1].remove();
                points[index - 1].remove();
                this.dragging_index--;
                this.dragging_index--;
                return;
            }
        }
        // Merge two points if it is not close to node port
        if (index + 2 < points.length - 2) {
            let _points = {
                [index + 3]: points[index + 3].getPosition(),
                [index + 2]: points[index + 2].getPosition(),
                [index + 1]: points[index + 1].getPosition(),
                [index]: points[index].getPosition()
            };
            if (Math.abs(_points[index + 1][coordinate] - _points[index + 2][coordinate]) < 5) {
                _points[index][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                _points[index + 3][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                points[index].setPosition(_points[index]);
                points[index + 3].setPosition(_points[index + 3]);
                points[index + 1].remove();
                points[index + 1].remove();
                return;
            }
        }
        // If no condition above handled then just update path points position
        let _points = {
            [index]: points[index].getPosition(),
            [index + 1]: points[index + 1].getPosition()
        };
        _points[index][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        _points[index + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        points[index].setPosition(_points[index]);
        points[index + 1].setPosition(_points[index + 1]);
    }
    draggingEvent(event, index) {
        let points = this.props.link.getPoints();
        // get moving difference. Index + 1 will work because links indexes has
        // length = points.lenght - 1
        let dx = Math.abs(points[index].getX() - points[index + 1].getX());
        let dy = Math.abs(points[index].getY() - points[index + 1].getY());
        // moving with y direction
        if (dx === 0) {
            this.calculatePositions(points, event, index, 'x');
        }
        else if (dy === 0) {
            this.calculatePositions(points, event, index, 'y');
        }
        this.props.link.setFirstAndLastPathsDirection();
    }
    render() {
        //ensure id is present for all points on the path
        let points = this.props.link.getPoints();
        let paths = [];
        // Get points based on link orientation
        let pointLeft = points[0];
        let pointRight = points[points.length - 1];
        let hadToSwitch = false;
        if (pointLeft.getX() > pointRight.getX()) {
            pointLeft = points[points.length - 1];
            pointRight = points[0];
            hadToSwitch = true;
        }
        let dy = Math.abs(points[0].getY() - points[points.length - 1].getY());
        // When new link add one middle point to get everywhere 90° angle
        if (this.props.link.getTargetPort() === null && points.length === 2) {
            [...Array(2)].forEach((item) => {
                this.props.link.addPoint(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PointModel({
                    link: this.props.link,
                    position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__.Point(pointLeft.getX(), pointRight.getY())
                }), 1);
            });
            this.props.link.setManuallyFirstAndLastPathsDirection(true, true);
        }
        // When new link is moving and not connected to target port move with middle point
        // TODO: @DanielLazarLDAPPS This will be better to update in DragNewLinkState
        //  in function fireMouseMoved to avoid calling this unexpectedly e.g. after Deserialize
        else if (this.props.link.getTargetPort() === null && this.props.link.getSourcePort() !== null) {
            points[1].setPosition(pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2, !hadToSwitch ? pointLeft.getY() : pointRight.getY());
            points[2].setPosition(pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2, !hadToSwitch ? pointRight.getY() : pointLeft.getY());
        }
        // Render was called but link is not moved but user.
        // Node is moved and in this case fix coordinates to get 90° angle.
        // For loop just for first and last path
        else if (!this.state.canDrag && points.length > 2) {
            // Those points and its position only will be moved
            for (let i = 1; i < points.length; i += points.length - 2) {
                if (i - 1 === 0) {
                    if (this.props.link.getFirstPathXdirection()) {
                        points[i].setPosition(points[i].getX(), points[i - 1].getY());
                    }
                    else {
                        points[i].setPosition(points[i - 1].getX(), points[i].getY());
                    }
                }
                else {
                    if (this.props.link.getLastPathXdirection()) {
                        points[i - 1].setPosition(points[i - 1].getX(), points[i].getY());
                    }
                    else {
                        points[i - 1].setPosition(points[i].getX(), points[i - 1].getY());
                    }
                }
            }
        }
        // If there is existing link which has two points add one
        // NOTE: It doesn't matter if check is for dy or dx
        if (points.length === 2 && dy !== 0 && !this.state.canDrag) {
            this.props.link.addPoint(new _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PointModel({
                link: this.props.link,
                position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__.Point(pointLeft.getX(), pointRight.getY())
            }));
        }
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(this.generateLink(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.LinkWidget.generateLinePath(points[j], points[j + 1]), {
                'data-linkid': this.props.link.getID(),
                'data-point': j,
                onMouseDown: (event) => {
                    if (event.button === 0) {
                        this.setState({ canDrag: true });
                        this.dragging_index = j;
                        // Register mouse move event to track mouse position
                        // On mouse up these events are unregistered check "this.handleUp"
                        window.addEventListener('mousemove', this.handleMove);
                        window.addEventListener('mouseup', this.handleUp);
                    }
                },
                onMouseEnter: (event) => {
                    this.setState({ selected: true });
                    this.props.link.lastHoverIndexOfPath = j;
                }
            }, j));
        }
        this.refPaths = [];
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { "data-default-link-test": this.props.link.getOptions().testName }, paths);
    }
}
RightAngleLinkWidget.defaultProps = {
    color: 'red',
    width: 3,
    link: null,
    smooth: false,
    diagramEngine: null,
    factory: null
};


/***/ }),

/***/ "@projectstorm/geometry":
/*!*****************************************!*\
  !*** external "@projectstorm/geometry" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@projectstorm/geometry");

/***/ }),

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

/***/ "dagre":
/*!************************!*\
  !*** external "dagre" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dagre");

/***/ }),

/***/ "lodash/cloneDeep":
/*!***********************************!*\
  !*** external "lodash/cloneDeep" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("lodash/cloneDeep");

/***/ }),

/***/ "lodash/concat":
/*!********************************!*\
  !*** external "lodash/concat" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/concat");

/***/ }),

/***/ "lodash/defer":
/*!*******************************!*\
  !*** external "lodash/defer" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/defer");

/***/ }),

/***/ "lodash/every":
/*!*******************************!*\
  !*** external "lodash/every" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/every");

/***/ }),

/***/ "lodash/findIndex":
/*!***********************************!*\
  !*** external "lodash/findIndex" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("lodash/findIndex");

/***/ }),

/***/ "lodash/first":
/*!*******************************!*\
  !*** external "lodash/first" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/first");

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

/***/ "lodash/get":
/*!*****************************!*\
  !*** external "lodash/get" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/get");

/***/ }),

/***/ "lodash/last":
/*!******************************!*\
  !*** external "lodash/last" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/last");

/***/ }),

/***/ "lodash/map":
/*!*****************************!*\
  !*** external "lodash/map" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/map");

/***/ }),

/***/ "lodash/maxBy":
/*!*******************************!*\
  !*** external "lodash/maxBy" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/maxBy");

/***/ }),

/***/ "lodash/minBy":
/*!*******************************!*\
  !*** external "lodash/minBy" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/minBy");

/***/ }),

/***/ "lodash/range":
/*!*******************************!*\
  !*** external "lodash/range" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/range");

/***/ }),

/***/ "lodash/reduce":
/*!********************************!*\
  !*** external "lodash/reduce" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/reduce");

/***/ }),

/***/ "lodash/sortBy":
/*!********************************!*\
  !*** external "lodash/sortBy" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/sortBy");

/***/ }),

/***/ "lodash/values":
/*!********************************!*\
  !*** external "lodash/values" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/values");

/***/ }),

/***/ "pathfinding":
/*!******************************!*\
  !*** external "pathfinding" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("pathfinding");

/***/ }),

/***/ "paths-js/path":
/*!********************************!*\
  !*** external "paths-js/path" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("paths-js/path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

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
/* harmony export */   DagreEngine: () => (/* reexport safe */ _dagre_DagreEngine__WEBPACK_IMPORTED_MODULE_7__.DagreEngine),
/* harmony export */   PathFinding: () => (/* reexport safe */ _engine_PathFinding__WEBPACK_IMPORTED_MODULE_6__.PathFinding),
/* harmony export */   PathFindingLinkFactory: () => (/* reexport safe */ _link_PathFindingLinkFactory__WEBPACK_IMPORTED_MODULE_0__.PathFindingLinkFactory),
/* harmony export */   PathFindingLinkModel: () => (/* reexport safe */ _link_PathFindingLinkModel__WEBPACK_IMPORTED_MODULE_1__.PathFindingLinkModel),
/* harmony export */   PathFindingLinkWidget: () => (/* reexport safe */ _link_PathFindingLinkWidget__WEBPACK_IMPORTED_MODULE_2__.PathFindingLinkWidget),
/* harmony export */   RightAngleLinkFactory: () => (/* reexport safe */ _link_RightAngleLinkFactory__WEBPACK_IMPORTED_MODULE_4__.RightAngleLinkFactory),
/* harmony export */   RightAngleLinkModel: () => (/* reexport safe */ _link_RightAngleLinkModel__WEBPACK_IMPORTED_MODULE_5__.RightAngleLinkModel),
/* harmony export */   RightAngleLinkWidget: () => (/* reexport safe */ _link_RightAngleLinkWidget__WEBPACK_IMPORTED_MODULE_3__.RightAngleLinkWidget)
/* harmony export */ });
/* harmony import */ var _link_PathFindingLinkFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./link/PathFindingLinkFactory */ "./dist/link/PathFindingLinkFactory.js");
/* harmony import */ var _link_PathFindingLinkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./link/PathFindingLinkModel */ "./dist/link/PathFindingLinkModel.js");
/* harmony import */ var _link_PathFindingLinkWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./link/PathFindingLinkWidget */ "./dist/link/PathFindingLinkWidget.js");
/* harmony import */ var _link_RightAngleLinkWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./link/RightAngleLinkWidget */ "./dist/link/RightAngleLinkWidget.js");
/* harmony import */ var _link_RightAngleLinkFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./link/RightAngleLinkFactory */ "./dist/link/RightAngleLinkFactory.js");
/* harmony import */ var _link_RightAngleLinkModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./link/RightAngleLinkModel */ "./dist/link/RightAngleLinkModel.js");
/* harmony import */ var _engine_PathFinding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./engine/PathFinding */ "./dist/engine/PathFinding.js");
/* harmony import */ var _dagre_DagreEngine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dagre/DagreEngine */ "./dist/dagre/DagreEngine.js");









})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathFindingLinkFactory = void 0;
var React = require("react");
var PathFindingLinkModel_1 = require("./PathFindingLinkModel");
var PathFindingLinkWidget_1 = require("./PathFindingLinkWidget");
var cloneDeep_1 = require("lodash/cloneDeep");
var concat_1 = require("lodash/concat");
var defer_1 = require("lodash/defer");
var flatMap_1 = require("lodash/flatMap");
var get_1 = require("lodash/get");
var minBy_1 = require("lodash/minBy");
var maxBy_1 = require("lodash/maxBy");
var range_1 = require("lodash/range");
var reduce_1 = require("lodash/reduce");
var values_1 = require("lodash/values");
var Path = require("paths-js/path");
var react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
var react_canvas_core_1 = require("@projectstorm/react-canvas-core");
var PathFindingLinkFactory = /** @class */ (function (_super) {
    __extends(PathFindingLinkFactory, _super);
    function PathFindingLinkFactory() {
        var _this = _super.call(this, PathFindingLinkFactory.NAME) || this;
        _this.ROUTING_SCALING_FACTOR = 5;
        // calculated only when smart routing is active
        _this.canvasMatrix = [];
        _this.routingMatrix = [];
        // used when at least one element has negative coordinates
        _this.hAdjustmentFactor = 0;
        _this.vAdjustmentFactor = 0;
        /**
         * Despite being a long method, we simply iterate over all three collections (nodes, ports and points)
         * to find the highest X and Y dimensions, so we can build the matrix large enough to contain all elements.
         */
        _this.calculateMatrixDimensions = function () {
            var allNodesCoords = (0, values_1.default)(_this.engine.getModel().getNodes()).map(function (item) { return ({
                x: item.getX(),
                width: item.width,
                y: item.getY(),
                height: item.height
            }); });
            var allLinks = (0, values_1.default)(_this.engine.getModel().getLinks());
            var allPortsCoords = (0, flatMap_1.default)(allLinks.map(function (link) { return [link.getSourcePort(), link.getTargetPort()]; }))
                .filter(function (port) { return port !== null; })
                .map(function (item) { return ({
                x: item.getX(),
                width: item.width,
                y: item.getY(),
                height: item.height
            }); });
            var allPointsCoords = (0, flatMap_1.default)(allLinks.map(function (link) { return link.getPoints(); })).map(function (item) { return ({
                // points don't have width/height, so let's just use 0
                x: item.getX(),
                width: 0,
                y: item.getY(),
                height: 0
            }); });
            var sumProps = function (object, props) { return (0, reduce_1.default)(props, function (acc, prop) { return acc + (0, get_1.default)(object, prop, 0); }, 0); };
            var canvas = _this.engine.getCanvas();
            var concatedCoords = (0, concat_1.default)(allNodesCoords, allPortsCoords, allPointsCoords);
            var minX = Math.floor(Math.min((0, get_1.default)((0, minBy_1.default)(concatedCoords, 'x'), 'x', 0), 0) / _this.ROUTING_SCALING_FACTOR) *
                _this.ROUTING_SCALING_FACTOR;
            var maxXElement = (0, maxBy_1.default)(concatedCoords, function (item) { return sumProps(item, ['x', 'width']); });
            var maxX = Math.max(sumProps(maxXElement, ['x', 'width']), canvas.offsetWidth);
            var minYCoords = (0, minBy_1.default)(concatedCoords, 'y');
            var minY = Math.floor(Math.min((0, get_1.default)(minYCoords, 'y', 0), 0) / _this.ROUTING_SCALING_FACTOR) * _this.ROUTING_SCALING_FACTOR;
            var maxYElement = (0, maxBy_1.default)(concatedCoords, function (item) { return sumProps(item, ['y', 'height']); });
            var maxY = Math.max(sumProps(maxYElement, ['y', 'height']), canvas.offsetHeight);
            return {
                width: Math.ceil(Math.abs(minX) + maxX),
                hAdjustmentFactor: Math.abs(minX) / _this.ROUTING_SCALING_FACTOR + 1,
                height: Math.ceil(Math.abs(minY) + maxY),
                vAdjustmentFactor: Math.abs(minY) / _this.ROUTING_SCALING_FACTOR + 1
            };
        };
        /**
         * Updates (by reference) where nodes will be drawn on the matrix passed in.
         */
        _this.markNodes = function (matrix) {
            (0, values_1.default)(_this.engine.getModel().getNodes()).forEach(function (node) {
                var startX = Math.floor(node.getX() / _this.ROUTING_SCALING_FACTOR);
                var endX = Math.ceil((node.getX() + node.width) / _this.ROUTING_SCALING_FACTOR);
                var startY = Math.floor(node.getY() / _this.ROUTING_SCALING_FACTOR);
                var endY = Math.ceil((node.getY() + node.height) / _this.ROUTING_SCALING_FACTOR);
                for (var x = startX - 1; x <= endX + 1; x++) {
                    for (var y = startY - 1; y < endY + 1; y++) {
                        _this.markMatrixPoint(matrix, _this.translateRoutingX(x), _this.translateRoutingY(y));
                    }
                }
            });
        };
        /**
         * Updates (by reference) where ports will be drawn on the matrix passed in.
         */
        _this.markPorts = function (matrix) {
            var allElements = (0, flatMap_1.default)((0, values_1.default)(_this.engine.getModel().getLinks()).map(function (link) { return [].concat(link.getSourcePort(), link.getTargetPort()); }));
            allElements
                .filter(function (port) { return port !== null; })
                .forEach(function (port) {
                var startX = Math.floor(port.x / _this.ROUTING_SCALING_FACTOR);
                var endX = Math.ceil((port.x + port.width) / _this.ROUTING_SCALING_FACTOR);
                var startY = Math.floor(port.y / _this.ROUTING_SCALING_FACTOR);
                var endY = Math.ceil((port.y + port.height) / _this.ROUTING_SCALING_FACTOR);
                for (var x = startX - 1; x <= endX + 1; x++) {
                    for (var y = startY - 1; y < endY + 1; y++) {
                        _this.markMatrixPoint(matrix, _this.translateRoutingX(x), _this.translateRoutingY(y));
                    }
                }
            });
        };
        _this.markMatrixPoint = function (matrix, x, y) {
            if (matrix[y] !== undefined && matrix[y][x] !== undefined) {
                matrix[y][x] = 1;
            }
        };
        return _this;
    }
    PathFindingLinkFactory.prototype.setDiagramEngine = function (engine) {
        var _this = this;
        _super.prototype.setDiagramEngine.call(this, engine);
        // listen for drag changes
        engine.getStateMachine().registerListener({
            stateChanged: function (event) {
                if (event.newState instanceof react_canvas_core_1.AbstractDisplacementState) {
                    var deRegister_1 = engine.getActionEventBus().registerAction(new react_canvas_core_1.Action({
                        type: react_canvas_core_1.InputType.MOUSE_UP,
                        fire: function () {
                            _this.calculateRoutingMatrix();
                            engine.repaintCanvas();
                            deRegister_1();
                        }
                    }));
                }
            }
        });
        this.listener = engine.registerListener({
            canvasReady: function () {
                (0, defer_1.default)(function () {
                    _this.calculateRoutingMatrix();
                    engine.repaintCanvas();
                });
            }
        });
    };
    PathFindingLinkFactory.prototype.setFactoryBank = function (bank) {
        _super.prototype.setFactoryBank.call(this, bank);
        if (!bank && this.listener) {
            this.listener.deregister();
        }
    };
    PathFindingLinkFactory.prototype.generateReactWidget = function (event) {
        return <PathFindingLinkWidget_1.PathFindingLinkWidget diagramEngine={this.engine} link={event.model} factory={this}/>;
    };
    PathFindingLinkFactory.prototype.generateModel = function (event) {
        return new PathFindingLinkModel_1.PathFindingLinkModel();
    };
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
    PathFindingLinkFactory.prototype.getCanvasMatrix = function () {
        if (this.canvasMatrix.length === 0) {
            this.calculateCanvasMatrix();
        }
        return this.canvasMatrix;
    };
    PathFindingLinkFactory.prototype.calculateCanvasMatrix = function () {
        var _a = this.calculateMatrixDimensions(), canvasWidth = _a.width, hAdjustmentFactor = _a.hAdjustmentFactor, canvasHeight = _a.height, vAdjustmentFactor = _a.vAdjustmentFactor;
        this.hAdjustmentFactor = hAdjustmentFactor;
        this.vAdjustmentFactor = vAdjustmentFactor;
        var matrixWidth = Math.ceil(canvasWidth / this.ROUTING_SCALING_FACTOR);
        var matrixHeight = Math.ceil(canvasHeight / this.ROUTING_SCALING_FACTOR);
        this.canvasMatrix = (0, range_1.default)(0, matrixHeight).map(function () {
            return new Array(matrixWidth).fill(0);
        });
    };
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
    PathFindingLinkFactory.prototype.getRoutingMatrix = function () {
        if (this.routingMatrix.length === 0) {
            this.calculateRoutingMatrix();
        }
        return this.routingMatrix;
    };
    PathFindingLinkFactory.prototype.calculateRoutingMatrix = function () {
        var matrix = (0, cloneDeep_1.default)(this.getCanvasMatrix());
        // nodes need to be marked as blocked points
        this.markNodes(matrix);
        // same thing for ports
        this.markPorts(matrix);
        this.routingMatrix = matrix;
    };
    /**
     * The routing matrix does not have negative indexes, but elements could be negatively positioned.
     * We use the functions below to translate back and forth between these coordinates, relying on the
     * calculated values of hAdjustmentFactor and vAdjustmentFactor.
     */
    PathFindingLinkFactory.prototype.translateRoutingX = function (x, reverse) {
        if (reverse === void 0) { reverse = false; }
        return x + this.hAdjustmentFactor * (reverse ? -1 : 1);
    };
    PathFindingLinkFactory.prototype.translateRoutingY = function (y, reverse) {
        if (reverse === void 0) { reverse = false; }
        return y + this.vAdjustmentFactor * (reverse ? -1 : 1);
    };
    PathFindingLinkFactory.prototype.generateDynamicPath = function (pathCoords) {
        var _this = this;
        var path = Path();
        path = path.moveto(pathCoords[0][0] * this.ROUTING_SCALING_FACTOR, pathCoords[0][1] * this.ROUTING_SCALING_FACTOR);
        pathCoords.slice(1).forEach(function (coords) {
            path = path.lineto(coords[0] * _this.ROUTING_SCALING_FACTOR, coords[1] * _this.ROUTING_SCALING_FACTOR);
        });
        return path.print();
    };
    PathFindingLinkFactory.NAME = 'pathfinding';
    return PathFindingLinkFactory;
}(react_diagrams_defaults_1.DefaultLinkFactory));
exports.PathFindingLinkFactory = PathFindingLinkFactory;

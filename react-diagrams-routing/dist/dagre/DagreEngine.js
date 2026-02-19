"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DagreEngine = void 0;
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var dagre = require("dagre");
var every_1 = require("lodash/every");
var findIndex_1 = require("lodash/findIndex");
var forEach_1 = require("lodash/forEach");
var map_1 = require("lodash/map");
var range_1 = require("lodash/range");
var sortBy_1 = require("lodash/sortBy");
var geometry_1 = require("@projectstorm/geometry");
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

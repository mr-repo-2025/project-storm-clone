"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathFinding = void 0;
var PF = require("pathfinding");
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

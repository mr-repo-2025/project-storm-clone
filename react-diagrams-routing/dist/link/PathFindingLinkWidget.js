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
exports.PathFindingLinkWidget = void 0;
var React = require("react");
var first_1 = require("lodash/first");
var last_1 = require("lodash/last");
var PathFinding_1 = require("../engine/PathFinding");
var react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
var PathFindingLinkWidget = /** @class */ (function (_super) {
    __extends(PathFindingLinkWidget, _super);
    function PathFindingLinkWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.refPaths = [];
        _this.state = {
            selected: false
        };
        _this.pathFinding = new PathFinding_1.PathFinding(_this.props.factory);
        return _this;
    }
    PathFindingLinkWidget.prototype.componentDidUpdate = function () {
        this.props.link.setRenderedPaths(this.refPaths.map(function (ref) {
            return ref.current;
        }));
    };
    PathFindingLinkWidget.prototype.componentDidMount = function () {
        this.props.link.setRenderedPaths(this.refPaths.map(function (ref) {
            return ref.current;
        }));
    };
    PathFindingLinkWidget.prototype.componentWillUnmount = function () {
        this.props.link.setRenderedPaths([]);
    };
    PathFindingLinkWidget.prototype.generateLink = function (path, id) {
        var _this = this;
        var ref = React.createRef();
        this.refPaths.push(ref);
        return (<react_diagrams_defaults_1.DefaultLinkSegmentWidget key={"link-".concat(id)} path={path} selected={this.state.selected} diagramEngine={this.props.diagramEngine} factory={this.props.diagramEngine.getFactoryForLink(this.props.link)} link={this.props.link} forwardRef={ref} onSelection={function (selected) {
                _this.setState({ selected: selected });
            }} extras={{}}/>);
    };
    PathFindingLinkWidget.prototype.render = function () {
        this.refPaths = [];
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        // first step: calculate a direct path between the points being linked
        var directPathCoords = this.pathFinding.calculateDirectPath((0, first_1.default)(points), (0, last_1.default)(points));
        var routingMatrix = this.props.factory.getRoutingMatrix();
        // now we need to extract, from the routing matrix, the very first walkable points
        // so they can be used as origin and destination of the link to be created
        var smartLink = this.pathFinding.calculateLinkStartEndCoords(routingMatrix, directPathCoords);
        if (smartLink) {
            var start = smartLink.start, end = smartLink.end, pathToStart = smartLink.pathToStart, pathToEnd = smartLink.pathToEnd;
            // second step: calculate a path avoiding hitting other elements
            var simplifiedPath = this.pathFinding.calculateDynamicPath(routingMatrix, start, end, pathToStart, pathToEnd);
            paths.push(
            //smooth: boolean, extraProps: any, id: string | number, firstPoint: PointModel, lastPoint: PointModel
            this.generateLink(this.props.factory.generateDynamicPath(simplifiedPath), '0'));
        }
        return <>{paths}</>;
    };
    return PathFindingLinkWidget;
}(React.Component));
exports.PathFindingLinkWidget = PathFindingLinkWidget;

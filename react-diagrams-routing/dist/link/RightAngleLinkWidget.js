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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightAngleLinkWidget = void 0;
var React = require("react");
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
var geometry_1 = require("@projectstorm/geometry");
var RightAngleLinkWidget = /** @class */ (function (_super) {
    __extends(RightAngleLinkWidget, _super);
    function RightAngleLinkWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMove = function (event) {
            this.draggingEvent(event, this.dragging_index);
        }.bind(_this);
        _this.handleUp = function (event) {
            // Unregister handlers to avoid multiple event handlers for other links
            this.setState({ canDrag: false, selected: false });
            window.removeEventListener('mousemove', this.handleMove);
            window.removeEventListener('mouseup', this.handleUp);
        }.bind(_this);
        _this.refPaths = [];
        _this.state = {
            selected: false,
            canDrag: false
        };
        _this.dragging_index = 0;
        return _this;
    }
    RightAngleLinkWidget.prototype.componentDidUpdate = function () {
        this.props.link.setRenderedPaths(this.refPaths.map(function (ref) {
            return ref.current;
        }));
    };
    RightAngleLinkWidget.prototype.componentDidMount = function () {
        this.props.link.setRenderedPaths(this.refPaths.map(function (ref) {
            return ref.current;
        }));
    };
    RightAngleLinkWidget.prototype.componentWillUnmount = function () {
        this.props.link.setRenderedPaths([]);
    };
    RightAngleLinkWidget.prototype.generateLink = function (path, extraProps, id) {
        var _this = this;
        var ref = React.createRef();
        this.refPaths.push(ref);
        return (<react_diagrams_defaults_1.DefaultLinkSegmentWidget key={"link-".concat(id)} path={path} selected={this.state.selected} diagramEngine={this.props.diagramEngine} factory={this.props.diagramEngine.getFactoryForLink(this.props.link)} link={this.props.link} forwardRef={ref} onSelection={function (selected) {
                _this.setState({ selected: selected });
            }} extras={extraProps}/>);
    };
    RightAngleLinkWidget.prototype.calculatePositions = function (points, event, index, coordinate) {
        var _a, _b, _c;
        // If path is first or last add another point to keep node port on its position
        if (index === 0) {
            var point = new react_diagrams_core_1.PointModel({
                link: this.props.link,
                position: new geometry_1.Point(points[index].getX(), points[index].getY())
            });
            this.props.link.addPoint(point, index);
            this.dragging_index++;
            return;
        }
        else if (index === points.length - 2) {
            var point = new react_diagrams_core_1.PointModel({
                link: this.props.link,
                position: new geometry_1.Point(points[index + 1].getX(), points[index + 1].getY())
            });
            this.props.link.addPoint(point, index + 1);
            return;
        }
        // Merge two points if it is not close to node port and close to each other
        if (index - 2 > 0) {
            var _points_1 = (_a = {},
                _a[index - 2] = points[index - 2].getPosition(),
                _a[index + 1] = points[index + 1].getPosition(),
                _a[index - 1] = points[index - 1].getPosition(),
                _a);
            if (Math.abs(_points_1[index - 1][coordinate] - _points_1[index + 1][coordinate]) < 5) {
                _points_1[index - 2][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                _points_1[index + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                points[index - 2].setPosition(_points_1[index - 2]);
                points[index + 1].setPosition(_points_1[index + 1]);
                points[index - 1].remove();
                points[index - 1].remove();
                this.dragging_index--;
                this.dragging_index--;
                return;
            }
        }
        // Merge two points if it is not close to node port
        if (index + 2 < points.length - 2) {
            var _points_2 = (_b = {},
                _b[index + 3] = points[index + 3].getPosition(),
                _b[index + 2] = points[index + 2].getPosition(),
                _b[index + 1] = points[index + 1].getPosition(),
                _b[index] = points[index].getPosition(),
                _b);
            if (Math.abs(_points_2[index + 1][coordinate] - _points_2[index + 2][coordinate]) < 5) {
                _points_2[index][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                _points_2[index + 3][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
                points[index].setPosition(_points_2[index]);
                points[index + 3].setPosition(_points_2[index + 3]);
                points[index + 1].remove();
                points[index + 1].remove();
                return;
            }
        }
        // If no condition above handled then just update path points position
        var _points = (_c = {},
            _c[index] = points[index].getPosition(),
            _c[index + 1] = points[index + 1].getPosition(),
            _c);
        _points[index][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        _points[index + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        points[index].setPosition(_points[index]);
        points[index + 1].setPosition(_points[index + 1]);
    };
    RightAngleLinkWidget.prototype.draggingEvent = function (event, index) {
        var points = this.props.link.getPoints();
        // get moving difference. Index + 1 will work because links indexes has
        // length = points.lenght - 1
        var dx = Math.abs(points[index].getX() - points[index + 1].getX());
        var dy = Math.abs(points[index].getY() - points[index + 1].getY());
        // moving with y direction
        if (dx === 0) {
            this.calculatePositions(points, event, index, 'x');
        }
        else if (dy === 0) {
            this.calculatePositions(points, event, index, 'y');
        }
        this.props.link.setFirstAndLastPathsDirection();
    };
    RightAngleLinkWidget.prototype.render = function () {
        var _this = this;
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        // Get points based on link orientation
        var pointLeft = points[0];
        var pointRight = points[points.length - 1];
        var hadToSwitch = false;
        if (pointLeft.getX() > pointRight.getX()) {
            pointLeft = points[points.length - 1];
            pointRight = points[0];
            hadToSwitch = true;
        }
        var dy = Math.abs(points[0].getY() - points[points.length - 1].getY());
        // When new link add one middle point to get everywhere 90° angle
        if (this.props.link.getTargetPort() === null && points.length === 2) {
            __spreadArray([], Array(2), true).forEach(function (item) {
                _this.props.link.addPoint(new react_diagrams_core_1.PointModel({
                    link: _this.props.link,
                    position: new geometry_1.Point(pointLeft.getX(), pointRight.getY())
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
            for (var i = 1; i < points.length; i += points.length - 2) {
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
            this.props.link.addPoint(new react_diagrams_core_1.PointModel({
                link: this.props.link,
                position: new geometry_1.Point(pointLeft.getX(), pointRight.getY())
            }));
        }
        var _loop_1 = function (j) {
            paths.push(this_1.generateLink(react_diagrams_core_1.LinkWidget.generateLinePath(points[j], points[j + 1]), {
                'data-linkid': this_1.props.link.getID(),
                'data-point': j,
                onMouseDown: function (event) {
                    if (event.button === 0) {
                        _this.setState({ canDrag: true });
                        _this.dragging_index = j;
                        // Register mouse move event to track mouse position
                        // On mouse up these events are unregistered check "this.handleUp"
                        window.addEventListener('mousemove', _this.handleMove);
                        window.addEventListener('mouseup', _this.handleUp);
                    }
                },
                onMouseEnter: function (event) {
                    _this.setState({ selected: true });
                    _this.props.link.lastHoverIndexOfPath = j;
                }
            }, j));
        };
        var this_1 = this;
        for (var j = 0; j < points.length - 1; j++) {
            _loop_1(j);
        }
        this.refPaths = [];
        return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
    };
    RightAngleLinkWidget.defaultProps = {
        color: 'red',
        width: 3,
        link: null,
        smooth: false,
        diagramEngine: null,
        factory: null
    };
    return RightAngleLinkWidget;
}(React.Component));
exports.RightAngleLinkWidget = RightAngleLinkWidget;

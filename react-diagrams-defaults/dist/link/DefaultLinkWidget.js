"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLinkWidget = void 0;
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var React = require("react");
var react_1 = require("react");
var DefaultLinkPointWidget_1 = require("./DefaultLinkPointWidget");
var DefaultLinkSegmentWidget_1 = require("./DefaultLinkSegmentWidget");
var DefaultLinkWidget = function (props) {
    var _a = React.useState(false), selected = _a[0], setSelected = _a[1];
    var refPaths = (0, react_1.useRef)([]);
    var renderPoints = function () {
        var _a;
        return (_a = props.renderPoints) !== null && _a !== void 0 ? _a : true;
    };
    (0, react_1.useEffect)(function () {
        props.link.setRenderedPaths(refPaths.current.map(function (ref) { return ref.current; }).filter(Boolean));
        return function () {
            props.link.setRenderedPaths([]);
        };
    }, [props.link]);
    var generateRef = function () {
        var ref = React.createRef();
        refPaths.current.push(ref);
        return ref;
    };
    var addPointToLink = function (event, index) {
        if (!event.shiftKey &&
            !props.link.isLocked() &&
            props.link.getPoints().length - 1 <= props.diagramEngine.getMaxNumberPointsPerLink()) {
            var position = props.diagramEngine.getRelativeMousePoint(event);
            var point = props.link.point(position.x, position.y, index);
            event.persist();
            event.stopPropagation();
            props.diagramEngine.getActionEventBus().fireAction({
                event: event,
                model: point
            });
        }
    };
    var generatePoint = function (point) {
        var _a;
        return (<DefaultLinkPointWidget_1.DefaultLinkPointWidget key={point.getID()} point={point} colorSelected={(_a = props.link.getOptions().selectedColor) !== null && _a !== void 0 ? _a : ''} color={props.link.getOptions().color}/>);
    };
    var generateLink = function (path, extraProps, id) {
        return (<DefaultLinkSegmentWidget_1.DefaultLinkSegmentWidget key={"link-".concat(id)} path={path} selected={selected} diagramEngine={props.diagramEngine} factory={props.diagramEngine.getFactoryForLink(props.link)} link={props.link} forwardRef={generateRef()} onSelection={setSelected} extras={extraProps}/>);
    };
    var points = props.link.getPoints();
    var paths = [];
    refPaths.current = []; // Reset the refPaths for the current render
    if (points.length === 2) {
        paths.push(generateLink(props.link.getSVGPath(), {
            onMouseDown: function (event) {
                var _a;
                (_a = props.selected) === null || _a === void 0 ? void 0 : _a.call(props, event);
                addPointToLink(event, 1);
            }
        }, '0'));
        if (props.link.getTargetPort() == null) {
            paths.push(generatePoint(points[1]));
        }
    }
    else {
        var _loop_1 = function (j) {
            paths.push(generateLink(react_diagrams_core_1.LinkWidget.generateLinePath(points[j], points[j + 1]), {
                'data-linkid': props.link.getID(),
                'data-point': j,
                onMouseDown: function (event) {
                    var _a;
                    (_a = props.selected) === null || _a === void 0 ? void 0 : _a.call(props, event);
                    addPointToLink(event, j + 1);
                }
            }, j));
        };
        for (var j = 0; j < points.length - 1; j++) {
            _loop_1(j);
        }
        if (renderPoints()) {
            for (var i = 1; i < points.length - 1; i++) {
                paths.push(generatePoint(points[i]));
            }
            if (props.link.getTargetPort() == null) {
                paths.push(generatePoint(points[points.length - 1]));
            }
        }
    }
    return <g data-default-link-test={props.link.getOptions().testName}>{paths}</g>;
};
exports.DefaultLinkWidget = DefaultLinkWidget;

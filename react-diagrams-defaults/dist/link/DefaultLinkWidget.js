import { LinkWidget } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { DefaultLinkPointWidget } from './DefaultLinkPointWidget';
import { DefaultLinkSegmentWidget } from './DefaultLinkSegmentWidget';
const CustomLinkArrowWidget = (props) => {
    const { point, previousPoint, path, points } = props;
    const angle = 270 +
        (Math.atan2(point.getPosition().y - previousPoint.getPosition().y, point.getPosition().x - previousPoint.getPosition().x) *
            180) /
            Math.PI;
    var distancer = { x: 0, y: 0 };
    for (let j = 0; j < points.length - 1; j++) {
        distancer = calculate(points[j], points[j + 1]);
    }
    return (React.createElement("g", { className: "arrow", transform: 'translate(' + (distancer.x) + ', ' + (distancer.y) + ')' },
        React.createElement("g", { style: { transform: 'rotate(' + angle + 'deg)' } },
            React.createElement("g", { transform: 'translate(-10, -15)' },
                React.createElement("polygon", { points: "0,10 8,30 -8,30", fill: props.color, "data-id": point.getID(), "data-linkid": point.getLink().getID() })))));
};
const calculate = (point1, point2) => {
    const dx = point2.position.x - point1.position.x;
    const dy = point2.position.y - point1.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const midX = (point1.position.x + point2.position.x) / 2;
    const midY = (point1.position.y + point2.position.y) / 2;
    // setDistance(dist);
    return { x: midX, y: midY };
};
export const DefaultLinkWidget = (props) => {
    const [selected, setSelected] = React.useState(false);
    const refPaths = useRef([]);
    const renderPoints = () => {
        var _a;
        return (_a = props.renderPoints) !== null && _a !== void 0 ? _a : true;
    };
    useEffect(() => {
        props.link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean));
        return () => {
            props.link.setRenderedPaths([]);
        };
    }, [props.link]);
    const generateRef = () => {
        const ref = React.createRef();
        refPaths.current.push(ref);
        return ref;
    };
    const addPointToLink = (event, index) => {
        if (!event.shiftKey &&
            !props.link.isLocked() &&
            props.link.getPoints().length - 1 <= props.diagramEngine.getMaxNumberPointsPerLink()) {
            const position = props.diagramEngine.getRelativeMousePoint(event);
            const point = props.link.point(position.x, position.y, index);
            event.persist();
            event.stopPropagation();
            props.diagramEngine.getActionEventBus().fireAction({
                event,
                model: point
            });
        }
    };
    const generatePoint = (point) => {
        var _a;
        return (React.createElement(DefaultLinkPointWidget, { key: point.getID(), point: point, colorSelected: (_a = props.link.getOptions().selectedColor) !== null && _a !== void 0 ? _a : '', color: props.link.getOptions().color }));
    };
    const generateLink = (path, extraProps, id) => {
        return (React.createElement(DefaultLinkSegmentWidget, { key: `link-${id}`, path: path, selected: selected, diagramEngine: props.diagramEngine, factory: props.diagramEngine.getFactoryForLink(props.link), link: props.link, forwardRef: generateRef(), onSelection: setSelected, extras: extraProps }));
    };
    const generateArrow = (point, previousPoint, points) => {
        return (React.createElement(CustomLinkArrowWidget, { key: point.getID(), point: point, points: points, previousPoint: previousPoint, colorSelected: props.link.getOptions().selectedColor, color: props.link.getOptions().color }));
    };
    const points = props.link.getPoints();
    const paths = [];
    refPaths.current = []; // Reset the refPaths for the current render
    if (points.length === 2) {
        paths.push(generateLink(props.link.getSVGPath(), {
            onMouseDown: (event) => {
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
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(generateLink(LinkWidget.generateLinePath(points[j], points[j + 1]), {
                'data-linkid': props.link.getID(),
                'data-point': j,
                onMouseDown: (event) => {
                    var _a;
                    (_a = props.selected) === null || _a === void 0 ? void 0 : _a.call(props, event);
                    addPointToLink(event, j + 1);
                }
            }, j));
        }
        if (renderPoints()) {
            for (let i = 1; i < points.length - 1; i++) {
                paths.push(generatePoint(points[i]));
            }
            if (props.link.getTargetPort() !== null) {
                paths.push(generateArrow(points[points.length - 1], points[points.length - 2], points));
            }
            else {
                paths.push(generatePoint(points[points.length - 1]));
            }
        }
    }
    return React.createElement("g", { "data-default-link-test": props.link.getOptions().testName }, paths);
};
//# sourceMappingURL=DefaultLinkWidget.js.map
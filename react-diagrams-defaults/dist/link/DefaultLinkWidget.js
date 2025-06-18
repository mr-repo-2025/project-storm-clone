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
            React.createElement("g", { transform: 'translate(-10, 0)' },
                React.createElement("path", { d: "M8.58779 10.6148C9.09159 11.1284 9.90841 11.1284 10.4122 10.6148L18.6221 2.24512C19.126 1.73152 19.126 0.898812 18.6221 0.385203C18.1183 -0.128401 17.3015 -0.128401 16.7977 0.385203C16.7977 0.385203 10.4122 7.78405 9.5 7.82489C8.58779 7.86574 2.20227 0.385203 2.20227 0.385203C1.69848 -0.128401 0.881658 -0.128401 0.377851 0.385203C-0.12595 0.898812 -0.12595 1.73152 0.377851 2.24512L8.58779 10.6148Z", fill: "#ACACAC" })))));
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
    const generateLink = (path, extraProps, id, propst) => {
        return (React.createElement(DefaultLinkSegmentWidget, { key: `link-${id}`, path: path, selected: selected, diagramEngine: props.diagramEngine, factory: props.diagramEngine.getFactoryForLink(props.link), link: props.link, forwardRef: generateRef(), onSelection: setSelected, extras: extraProps, propsE: propst }));
    };
    const generateArrow = (point, previousPoint, points) => {
        return (React.createElement(CustomLinkArrowWidget, { key: point.getID(), point: point, points: points, previousPoint: previousPoint, colorSelected: props.link.getOptions().selectedColor, color: props.link.getOptions().color }));
    };
    const points = props.link.getPoints();
    const paths = [];
    refPaths.current = []; // Reset the refPaths for the current render
    for (let j = 0; j < points.length - 1; j++) {
        paths.push(generateLink(LinkWidget.generateLinePath(points[j], points[j + 1]), {
            'data-linkid': props.link.getID(),
            'data-point': j,
            onMouseDown: (event) => {
                var _a;
                (_a = props.selected) === null || _a === void 0 ? void 0 : _a.call(props, event);
                addPointToLink(event, j + 1);
            }
        }, j, props.propst));
    }
    for (let i = 1; i < points.length - 1; i++) {
        paths.push(generatePoint(points[i]));
    }
    if (props.link.getTargetPort() !== null) {
        paths.push(generateArrow(points[points.length - 1], points[points.length - 2], points));
    }
    else {
        paths.push(generatePoint(points[points.length - 1]));
    }
    return React.createElement("g", { "data-default-link-test": props.link.getOptions().testName }, paths);
};
//# sourceMappingURL=DefaultLinkWidget.js.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["projectstorm/react-diagrams-defaults"] = factory();
	else
		root["projectstorm/react-diagrams-defaults"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/label/DefaultLabelFactory.js":
/*!*******************************************!*\
  !*** ./dist/label/DefaultLabelFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLabelFactory: () => (/* binding */ DefaultLabelFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DefaultLabelModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultLabelModel */ "./dist/label/DefaultLabelModel.js");
/* harmony import */ var _DefaultLabelWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultLabelWidget */ "./dist/label/DefaultLabelWidget.js");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__);




/**
 * @author Dylan Vorster
 */
class DefaultLabelFactory extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__.AbstractReactFactory {
    constructor() {
        super('default');
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DefaultLabelWidget__WEBPACK_IMPORTED_MODULE_2__.DefaultLabelWidget, { model: event.model });
    }
    generateModel(event) {
        return new _DefaultLabelModel__WEBPACK_IMPORTED_MODULE_1__.DefaultLabelModel();
    }
}


/***/ }),

/***/ "./dist/label/DefaultLabelModel.js":
/*!*****************************************!*\
  !*** ./dist/label/DefaultLabelModel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLabelModel: () => (/* binding */ DefaultLabelModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__);

class DefaultLabelModel extends _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.LabelModel {
    constructor(options = {}) {
        super(Object.assign({ offsetY: options.offsetY == null ? -23 : options.offsetY, type: 'default' }, options));
    }
    setLabel(label) {
        this.options.label = label;
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.label = event.data.label;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { label: this.options.label });
    }
}


/***/ }),

/***/ "./dist/label/DefaultLabelWidget.js":
/*!******************************************!*\
  !*** ./dist/label/DefaultLabelWidget.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLabelWidget: () => (/* binding */ DefaultLabelWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);


var S;
(function (S) {
    S.Label = (_emotion_styled__WEBPACK_IMPORTED_MODULE_1___default().div) `
		background: rgba(0, 0, 0, 0.8);
		border-radius: 5px;
		color: white;
		font-size: 12px;
		padding: 4px 8px;
		font-family: sans-serif;
		user-select: none;
	`;
})(S || (S = {}));
class DefaultLabelWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Label, null, this.props.model.getOptions().label);
    }
}


/***/ }),

/***/ "./dist/link/DefaultLinkFactory.js":
/*!*****************************************!*\
  !*** ./dist/link/DefaultLinkFactory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLinkFactory: () => (/* binding */ DefaultLinkFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DefaultLinkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultLinkModel */ "./dist/link/DefaultLinkModel.js");
/* harmony import */ var _DefaultLinkWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultLinkWidget */ "./dist/link/DefaultLinkWidget.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react */ "@emotion/react");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_5__);






var S;
(function (S) {
    S.Keyframes = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.keyframes) `
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;
    const selected = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.css) `
		stroke-dasharray: 10, 2;
		animation: ${S.Keyframes} 1s linear infinite;
	`;
    S.Path = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().path) `
		${(p) => p.selected && selected};
		fill: none;
		pointer-events: auto;
	`;
})(S || (S = {}));
class DefaultLinkFactory extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4__.AbstractReactFactory {
    constructor(type = 'default') {
        super(type);
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DefaultLinkWidget__WEBPACK_IMPORTED_MODULE_2__.DefaultLinkWidget, { link: event.model, diagramEngine: this.engine });
    }
    generateModel(event) {
        return new _DefaultLinkModel__WEBPACK_IMPORTED_MODULE_1__.DefaultLinkModel();
    }
    generateLinkSegment(model, selected, path) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Path, { selected: selected, stroke: selected ? model.getOptions().selectedColor : model.getOptions().color, strokeWidth: model.getOptions().width, d: path }));
    }
}


/***/ }),

/***/ "./dist/link/DefaultLinkModel.js":
/*!***************************************!*\
  !*** ./dist/link/DefaultLinkModel.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLinkModel: () => (/* binding */ DefaultLinkModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _label_DefaultLabelModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../label/DefaultLabelModel */ "./dist/label/DefaultLabelModel.js");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_2__);



class DefaultLinkModel extends _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.LinkModel {
    constructor(options = {}) {
        super(Object.assign({ type: 'default', width: options.width || 3, color: options.color || 'gray', selectedColor: options.selectedColor || 'rgb(0,192,255)', curvyness: 50 }, options));
    }
    calculateControlOffset(port) {
        if (port.getOptions().alignment === _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PortModelAlignment.RIGHT) {
            return [this.options.curvyness, 0];
        }
        else if (port.getOptions().alignment === _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PortModelAlignment.LEFT) {
            return [-this.options.curvyness, 0];
        }
        else if (port.getOptions().alignment === _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PortModelAlignment.TOP) {
            return [0, -this.options.curvyness];
        }
        return [0, this.options.curvyness];
    }
    getSVGPath() {
        if (this.points.length == 2) {
            const curve = new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_2__.BezierCurve();
            curve.setSource(this.getFirstPoint().getPosition());
            curve.setTarget(this.getLastPoint().getPosition());
            curve.setSourceControl(this.getFirstPoint().getPosition().clone());
            curve.setTargetControl(this.getLastPoint().getPosition().clone());
            if (this.sourcePort) {
                curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
            }
            if (this.targetPort) {
                curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
            }
            return curve.getSVGCurve();
        }
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { width: this.options.width, color: this.options.color, curvyness: this.options.curvyness, selectedColor: this.options.selectedColor });
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.color = event.data.color;
        this.options.width = event.data.width;
        this.options.curvyness = event.data.curvyness;
        this.options.selectedColor = event.data.selectedColor;
    }
    addLabel(label) {
        if (label instanceof _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.LabelModel) {
            return super.addLabel(label);
        }
        let labelOb = new _label_DefaultLabelModel__WEBPACK_IMPORTED_MODULE_1__.DefaultLabelModel();
        labelOb.setLabel(label);
        return super.addLabel(labelOb);
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

/***/ "./dist/link/DefaultLinkPointWidget.js":
/*!*********************************************!*\
  !*** ./dist/link/DefaultLinkPointWidget.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLinkPointWidget: () => (/* binding */ DefaultLinkPointWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);


var S;
(function (S) {
    S.PointTop = (_emotion_styled__WEBPACK_IMPORTED_MODULE_1___default().circle) `
		pointer-events: all;
	`;
})(S || (S = {}));
class DefaultLinkPointWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }
    render() {
        const { point } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: point.getPosition().x, cy: point.getPosition().y, r: 5, fill: this.state.selected || this.props.point.isSelected() ? this.props.colorSelected : this.props.color }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.PointTop, { className: "point", onMouseLeave: () => {
                    this.setState({ selected: false });
                }, onMouseEnter: () => {
                    this.setState({ selected: true });
                }, "data-id": point.getID(), "data-linkid": point.getLink().getID(), cx: point.getPosition().x, cy: point.getPosition().y, r: 15, opacity: 0.0 })));
    }
}


/***/ }),

/***/ "./dist/link/DefaultLinkSegmentWidget.js":
/*!***********************************************!*\
  !*** ./dist/link/DefaultLinkSegmentWidget.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLinkSegmentWidget: () => (/* binding */ DefaultLinkSegmentWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class DefaultLinkSegmentWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        const Bottom = react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(this.props.factory.generateLinkSegment(this.props.link, this.props.selected || this.props.link.isSelected(), this.props.path), {
            ref: this.props.forwardRef
        });
        const Top = react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(Bottom, Object.assign(Object.assign({ strokeLinecap: 'round', onMouseLeave: () => {
                this.props.onSelection(false);
            }, onMouseEnter: () => {
                this.props.onSelection(true);
            } }, this.props.extras), { ref: null, 'data-linkid': this.props.link.getID(), strokeOpacity: this.props.selected ? 0.1 : 0, strokeWidth: 20, fill: 'none', onContextMenu: () => {
                if (!this.props.link.isLocked()) {
                    event.preventDefault();
                    this.props.link.remove();
                }
            } }));
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", null,
            Bottom,
            Top));
    }
}


/***/ }),

/***/ "./dist/link/DefaultLinkWidget.js":
/*!****************************************!*\
  !*** ./dist/link/DefaultLinkWidget.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultLinkWidget: () => (/* binding */ DefaultLinkWidget)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DefaultLinkPointWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultLinkPointWidget */ "./dist/link/DefaultLinkPointWidget.js");
/* harmony import */ var _DefaultLinkSegmentWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultLinkSegmentWidget */ "./dist/link/DefaultLinkSegmentWidget.js");





const DefaultLinkWidget = (props) => {
    const [selected, setSelected] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
    const refPaths = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const renderPoints = () => {
        var _a;
        return (_a = props.renderPoints) !== null && _a !== void 0 ? _a : true;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        props.link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean));
        return () => {
            props.link.setRenderedPaths([]);
        };
    }, [props.link]);
    const generateRef = () => {
        const ref = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
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
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_DefaultLinkPointWidget__WEBPACK_IMPORTED_MODULE_2__.DefaultLinkPointWidget, { key: point.getID(), point: point, colorSelected: (_a = props.link.getOptions().selectedColor) !== null && _a !== void 0 ? _a : '', color: props.link.getOptions().color }));
    };
    const generateLink = (path, extraProps, id) => {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_DefaultLinkSegmentWidget__WEBPACK_IMPORTED_MODULE_3__.DefaultLinkSegmentWidget, { key: `link-${id}`, path: path, selected: selected, diagramEngine: props.diagramEngine, factory: props.diagramEngine.getFactoryForLink(props.link), link: props.link, forwardRef: generateRef(), onSelection: setSelected, extras: extraProps }));
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
            paths.push(generateLink(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.LinkWidget.generateLinePath(points[j], points[j + 1]), {
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
            if (props.link.getTargetPort() == null) {
                paths.push(generatePoint(points[points.length - 1]));
            }
        }
    }
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement("g", { "data-default-link-test": props.link.getOptions().testName }, paths);
};


/***/ }),

/***/ "./dist/node/DefaultNodeFactory.js":
/*!*****************************************!*\
  !*** ./dist/node/DefaultNodeFactory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultNodeFactory: () => (/* binding */ DefaultNodeFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DefaultNodeModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultNodeModel */ "./dist/node/DefaultNodeModel.js");
/* harmony import */ var _DefaultNodeWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultNodeWidget */ "./dist/node/DefaultNodeWidget.js");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__);




class DefaultNodeFactory extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__.AbstractReactFactory {
    constructor() {
        super('default');
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DefaultNodeWidget__WEBPACK_IMPORTED_MODULE_2__.DefaultNodeWidget, { engine: this.engine, node: event.model });
    }
    generateModel(event) {
        return new _DefaultNodeModel__WEBPACK_IMPORTED_MODULE_1__.DefaultNodeModel();
    }
}


/***/ }),

/***/ "./dist/node/DefaultNodeModel.js":
/*!***************************************!*\
  !*** ./dist/node/DefaultNodeModel.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultNodeModel: () => (/* binding */ DefaultNodeModel)
/* harmony export */ });
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _port_DefaultPortModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../port/DefaultPortModel */ "./dist/port/DefaultPortModel.js");



class DefaultNodeModel extends _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.NodeModel {
    constructor(options = {}, color) {
        if (typeof options === 'string') {
            options = {
                name: options,
                color: color
            };
        }
        super(Object.assign({ type: 'default', name: 'Untitled', color: 'rgb(0,192,255)' }, options));
        this.portsOut = [];
        this.portsIn = [];
    }
    doClone(lookupTable, clone) {
        clone.portsIn = [];
        clone.portsOut = [];
        super.doClone(lookupTable, clone);
    }
    removePort(port) {
        super.removePort(port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        }
        else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    }
    addPort(port) {
        super.addPort(port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                this.portsIn.push(port);
            }
        }
        else {
            if (this.portsOut.indexOf(port) === -1) {
                this.portsOut.push(port);
            }
        }
        return port;
    }
    addInPort(label, after = true) {
        const p = new _port_DefaultPortModel__WEBPACK_IMPORTED_MODULE_2__.DefaultPortModel({
            in: true,
            name: label,
            label: label,
            alignment: _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }
    addOutPort(label, after = true) {
        const p = new _port_DefaultPortModel__WEBPACK_IMPORTED_MODULE_2__.DefaultPortModel({
            in: false,
            name: label,
            label: label,
            alignment: _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.name = event.data.name;
        this.options.color = event.data.color;
        this.portsIn = lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(event.data.portsInOrder, (id) => {
            return this.getPortFromID(id);
        });
        this.portsOut = lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(event.data.portsOutOrder, (id) => {
            return this.getPortFromID(id);
        });
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { name: this.options.name, color: this.options.color, portsInOrder: lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.portsIn, (port) => {
                return port.getID();
            }), portsOutOrder: lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.portsOut, (port) => {
                return port.getID();
            }) });
    }
    getInPorts() {
        return this.portsIn;
    }
    getOutPorts() {
        return this.portsOut;
    }
}


/***/ }),

/***/ "./dist/node/DefaultNodeWidget.js":
/*!****************************************!*\
  !*** ./dist/node/DefaultNodeWidget.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultNodeWidget: () => (/* binding */ DefaultNodeWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _port_DefaultPortLabelWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../port/DefaultPortLabelWidget */ "./dist/port/DefaultPortLabelWidget.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);




var S;
(function (S) {
    S.Node = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().div) `
		background-color: ${(p) => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};
	`;
    S.Title = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().div) `
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;
    S.TitleName = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().div) `
		flex-grow: 1;
		padding: 5px 5px;
	`;
    S.Ports = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().div) `
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;
    S.PortsContainer = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().div) `
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
})(S || (S = {}));
/**
 * Default node that models the DefaultNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
class DefaultNodeWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.generatePort = (port) => {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_port_DefaultPortLabelWidget__WEBPACK_IMPORTED_MODULE_2__.DefaultPortLabel, { engine: this.props.engine, port: port, key: port.getID() });
        };
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Node, { "data-default-node-name": this.props.node.getOptions().name, selected: this.props.node.isSelected(), background: this.props.node.getOptions().color },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Title, null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.TitleName, null, this.props.node.getOptions().name)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Ports, null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.PortsContainer, null, lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(this.props.node.getInPorts(), this.generatePort)),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.PortsContainer, null, lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(this.props.node.getOutPorts(), this.generatePort)))));
    }
}


/***/ }),

/***/ "./dist/port/DefaultPortFactory.js":
/*!*****************************************!*\
  !*** ./dist/port/DefaultPortFactory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultPortFactory: () => (/* binding */ DefaultPortFactory)
/* harmony export */ });
/* harmony import */ var _DefaultPortModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultPortModel */ "./dist/port/DefaultPortModel.js");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__);


class DefaultPortFactory extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__.AbstractModelFactory {
    constructor() {
        super('default');
    }
    generateModel() {
        return new _DefaultPortModel__WEBPACK_IMPORTED_MODULE_0__.DefaultPortModel({
            name: 'unknown'
        });
    }
}


/***/ }),

/***/ "./dist/port/DefaultPortLabelWidget.js":
/*!*********************************************!*\
  !*** ./dist/port/DefaultPortLabelWidget.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultPortLabel: () => (/* binding */ DefaultPortLabel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);



var S;
(function (S) {
    S.PortLabel = (_emotion_styled__WEBPACK_IMPORTED_MODULE_2___default().div) `
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;
    S.Label = (_emotion_styled__WEBPACK_IMPORTED_MODULE_2___default().div) `
		padding: 0 5px;
		flex-grow: 1;
	`;
    S.Port = (_emotion_styled__WEBPACK_IMPORTED_MODULE_2___default().div) `
		width: 15px;
		height: 15px;
		background: rgba(255, 255, 255, 0.1);

		&:hover {
			background: rgb(192, 255, 0);
		}
	`;
})(S || (S = {}));
class DefaultPortLabel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        const port = (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_1__.PortWidget, { engine: this.props.engine, port: this.props.port },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Port, null)));
        const label = react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Label, null, this.props.port.getOptions().label);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.PortLabel, null,
            this.props.port.getOptions().in ? port : label,
            this.props.port.getOptions().in ? label : port));
    }
}


/***/ }),

/***/ "./dist/port/DefaultPortModel.js":
/*!***************************************!*\
  !*** ./dist/port/DefaultPortModel.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultPortModel: () => (/* binding */ DefaultPortModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-diagrams-core */ "@projectstorm/react-diagrams-core");
/* harmony import */ var _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _link_DefaultLinkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../link/DefaultLinkModel */ "./dist/link/DefaultLinkModel.js");


class DefaultPortModel extends _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PortModel {
    constructor(options, name, label) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options;
        super(Object.assign({ label: options.label || options.name, alignment: options.in ? _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PortModelAlignment.LEFT : _projectstorm_react_diagrams_core__WEBPACK_IMPORTED_MODULE_0__.PortModelAlignment.RIGHT, type: 'default' }, options));
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.in = event.data.in;
        this.options.label = event.data.label;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { in: this.options.in, label: this.options.label });
    }
    link(port, factory) {
        let link = this.createLinkModel(factory);
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }
    canLinkToPort(port) {
        if (port instanceof DefaultPortModel) {
            return this.options.in !== port.getOptions().in;
        }
        return true;
    }
    createLinkModel(factory) {
        let link = super.createLinkModel();
        if (!link && factory) {
            return factory.generateModel({});
        }
        return link || new _link_DefaultLinkModel__WEBPACK_IMPORTED_MODULE_1__.DefaultLinkModel();
    }
}


/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/react");

/***/ }),

/***/ "@emotion/styled":
/*!**********************************!*\
  !*** external "@emotion/styled" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@emotion/styled");

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

/***/ "lodash/map":
/*!*****************************!*\
  !*** external "lodash/map" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/map");

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
/* harmony export */   DefaultLabelFactory: () => (/* reexport safe */ _label_DefaultLabelFactory__WEBPACK_IMPORTED_MODULE_0__.DefaultLabelFactory),
/* harmony export */   DefaultLabelModel: () => (/* reexport safe */ _label_DefaultLabelModel__WEBPACK_IMPORTED_MODULE_1__.DefaultLabelModel),
/* harmony export */   DefaultLabelWidget: () => (/* reexport safe */ _label_DefaultLabelWidget__WEBPACK_IMPORTED_MODULE_2__.DefaultLabelWidget),
/* harmony export */   DefaultLinkFactory: () => (/* reexport safe */ _link_DefaultLinkFactory__WEBPACK_IMPORTED_MODULE_3__.DefaultLinkFactory),
/* harmony export */   DefaultLinkModel: () => (/* reexport safe */ _link_DefaultLinkModel__WEBPACK_IMPORTED_MODULE_4__.DefaultLinkModel),
/* harmony export */   DefaultLinkPointWidget: () => (/* reexport safe */ _link_DefaultLinkPointWidget__WEBPACK_IMPORTED_MODULE_7__.DefaultLinkPointWidget),
/* harmony export */   DefaultLinkSegmentWidget: () => (/* reexport safe */ _link_DefaultLinkSegmentWidget__WEBPACK_IMPORTED_MODULE_6__.DefaultLinkSegmentWidget),
/* harmony export */   DefaultLinkWidget: () => (/* reexport safe */ _link_DefaultLinkWidget__WEBPACK_IMPORTED_MODULE_5__.DefaultLinkWidget),
/* harmony export */   DefaultNodeFactory: () => (/* reexport safe */ _node_DefaultNodeFactory__WEBPACK_IMPORTED_MODULE_8__.DefaultNodeFactory),
/* harmony export */   DefaultNodeModel: () => (/* reexport safe */ _node_DefaultNodeModel__WEBPACK_IMPORTED_MODULE_9__.DefaultNodeModel),
/* harmony export */   DefaultNodeWidget: () => (/* reexport safe */ _node_DefaultNodeWidget__WEBPACK_IMPORTED_MODULE_10__.DefaultNodeWidget),
/* harmony export */   DefaultPortFactory: () => (/* reexport safe */ _port_DefaultPortFactory__WEBPACK_IMPORTED_MODULE_11__.DefaultPortFactory),
/* harmony export */   DefaultPortLabel: () => (/* reexport safe */ _port_DefaultPortLabelWidget__WEBPACK_IMPORTED_MODULE_12__.DefaultPortLabel),
/* harmony export */   DefaultPortModel: () => (/* reexport safe */ _port_DefaultPortModel__WEBPACK_IMPORTED_MODULE_13__.DefaultPortModel)
/* harmony export */ });
/* harmony import */ var _label_DefaultLabelFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./label/DefaultLabelFactory */ "./dist/label/DefaultLabelFactory.js");
/* harmony import */ var _label_DefaultLabelModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./label/DefaultLabelModel */ "./dist/label/DefaultLabelModel.js");
/* harmony import */ var _label_DefaultLabelWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./label/DefaultLabelWidget */ "./dist/label/DefaultLabelWidget.js");
/* harmony import */ var _link_DefaultLinkFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./link/DefaultLinkFactory */ "./dist/link/DefaultLinkFactory.js");
/* harmony import */ var _link_DefaultLinkModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./link/DefaultLinkModel */ "./dist/link/DefaultLinkModel.js");
/* harmony import */ var _link_DefaultLinkWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./link/DefaultLinkWidget */ "./dist/link/DefaultLinkWidget.js");
/* harmony import */ var _link_DefaultLinkSegmentWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./link/DefaultLinkSegmentWidget */ "./dist/link/DefaultLinkSegmentWidget.js");
/* harmony import */ var _link_DefaultLinkPointWidget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./link/DefaultLinkPointWidget */ "./dist/link/DefaultLinkPointWidget.js");
/* harmony import */ var _node_DefaultNodeFactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node/DefaultNodeFactory */ "./dist/node/DefaultNodeFactory.js");
/* harmony import */ var _node_DefaultNodeModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node/DefaultNodeModel */ "./dist/node/DefaultNodeModel.js");
/* harmony import */ var _node_DefaultNodeWidget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node/DefaultNodeWidget */ "./dist/node/DefaultNodeWidget.js");
/* harmony import */ var _port_DefaultPortFactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./port/DefaultPortFactory */ "./dist/port/DefaultPortFactory.js");
/* harmony import */ var _port_DefaultPortLabelWidget__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./port/DefaultPortLabelWidget */ "./dist/port/DefaultPortLabelWidget.js");
/* harmony import */ var _port_DefaultPortModel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./port/DefaultPortModel */ "./dist/port/DefaultPortModel.js");















})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["projectstorm/react-canvas-core"] = factory();
	else
		root["projectstorm/react-canvas-core"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/DiagramEngine.js":
/*!*******************************!*\
  !*** ./dist/DiagramEngine.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramEngine: () => (/* binding */ DiagramEngine)
/* harmony export */ });
/* harmony import */ var _entities_node_NodeModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/node/NodeModel */ "./dist/entities/node/NodeModel.js");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Passed as a parameter to the DiagramWidget
 */
class DiagramEngine extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.CanvasEngine {
    constructor(options = {}) {
        super(options);
        this.maxNumberPointsPerLink = 1000;
        // create banks for the different factory types
        this.nodeFactories = new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.FactoryBank();
        this.linkFactories = new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.FactoryBank();
        this.portFactories = new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.FactoryBank();
        this.labelFactories = new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.FactoryBank();
        const setup = (factory) => {
            factory.registerListener({
                factoryAdded: (event) => {
                    event.factory.setDiagramEngine(this);
                },
                factoryRemoved: (event) => {
                    event.factory.setDiagramEngine(null);
                }
            });
        };
        setup(this.nodeFactories);
        setup(this.linkFactories);
        setup(this.portFactories);
        setup(this.labelFactories);
    }
    /**
     * Gets a model and element under the mouse cursor
     */
    getMouseElement(event) {
        var target = event.target;
        var diagramModel = this.model;
        //is it a port
        var element = _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.Toolkit.closest(target, '.port[data-name]');
        if (element) {
            var nodeElement = _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.Toolkit.closest(target, '.node[data-nodeid]');
            return diagramModel.getNode(nodeElement.getAttribute('data-nodeid')).getPort(element.getAttribute('data-name'));
        }
        //look for a point
        element = _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.Toolkit.closest(target, '.point[data-id]');
        if (element) {
            return diagramModel.getLink(element.getAttribute('data-linkid')).getPointModel(element.getAttribute('data-id'));
        }
        //look for a link
        element = _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.Toolkit.closest(target, '[data-linkid]');
        if (element) {
            return diagramModel.getLink(element.getAttribute('data-linkid'));
        }
        //look for a node
        element = _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.Toolkit.closest(target, '.node[data-nodeid]');
        if (element) {
            return diagramModel.getNode(element.getAttribute('data-nodeid'));
        }
        return null;
    }
    //!-------------- FACTORIES ------------
    getNodeFactories() {
        return this.nodeFactories;
    }
    getLinkFactories() {
        return this.linkFactories;
    }
    getLabelFactories() {
        return this.labelFactories;
    }
    getPortFactories() {
        return this.portFactories;
    }
    getFactoryForNode(node) {
        if (typeof node === 'string') {
            return this.nodeFactories.getFactory(node);
        }
        return this.nodeFactories.getFactory(node.getType());
    }
    getFactoryForLink(link) {
        if (typeof link === 'string') {
            return this.linkFactories.getFactory(link);
        }
        return this.linkFactories.getFactory(link.getType());
    }
    getFactoryForLabel(label) {
        if (typeof label === 'string') {
            return this.labelFactories.getFactory(label);
        }
        return this.labelFactories.getFactory(label.getType());
    }
    getFactoryForPort(port) {
        if (typeof port === 'string') {
            return this.portFactories.getFactory(port);
        }
        return this.portFactories.getFactory(port.getType());
    }
    generateWidgetForLink(link) {
        return this.getFactoryForLink(link).generateReactWidget({ model: link });
    }
    generateWidgetForNode(node) {
        return this.getFactoryForNode(node).generateReactWidget({ model: node });
    }
    getNodeElement(node) {
        const selector = this.canvas.querySelector(`.node[data-nodeid="${node.getID()}"]`);
        if (selector === null) {
            throw new Error('Cannot find Node element with nodeID: [' + node.getID() + ']');
        }
        return selector;
    }
    getNodePortElement(port) {
        var selector = this.canvas.querySelector(`.port[data-name="${port.getName()}"][data-nodeid="${port.getParent().getID()}"]`);
        if (selector === null) {
            throw new Error('Cannot find Node Port element with nodeID: [' +
                port.getParent().getID() +
                '] and name: [' +
                port.getName() +
                ']');
        }
        return selector;
    }
    getPortCenter(port) {
        return this.getPortCoords(port).getOrigin();
    }
    /**
     * Calculate rectangular coordinates of the port passed in.
     */
    getPortCoords(port, element) {
        if (!this.canvas) {
            throw new Error('Canvas needs to be set first');
        }
        if (!element) {
            element = this.getNodePortElement(port);
        }
        const sourceRect = element.getBoundingClientRect();
        const point = this.getRelativeMousePoint({
            clientX: sourceRect.left,
            clientY: sourceRect.top
        });
        const zoom = this.model.getZoomLevel() / 100.0;
        return _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1__.Rectangle.fromPointAndSize(point, sourceRect.width / zoom, sourceRect.height / zoom);
    }
    /**
     * Determine the width and height of the node passed in.
     * It currently assumes nodes have a rectangular shape, can be overriden for customised shapes.
     */
    getNodeDimensions(node) {
        if (!this.canvas) {
            return {
                width: 0,
                height: 0
            };
        }
        const nodeElement = this.getNodeElement(node);
        const nodeRect = nodeElement.getBoundingClientRect();
        return {
            width: nodeRect.width,
            height: nodeRect.height
        };
    }
    getBoundingNodesRect(nodes) {
        if (nodes) {
            if (nodes.length === 0) {
                return new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1__.Rectangle();
            }
            return new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1__.Rectangle((0,_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_1__.boundingBoxFromPolygons)(nodes.map((node) => node.getBoundingBox())));
        }
    }
    zoomToFitSelectedNodes(options) {
        const nodes = this.model
            .getSelectedEntities()
            .filter((entity) => entity instanceof _entities_node_NodeModel__WEBPACK_IMPORTED_MODULE_0__.NodeModel);
        this.zoomToFitNodes({
            margin: options.margin,
            maxZoom: options.maxZoom,
            nodes: nodes.length > 0 ? nodes : null
        });
    }
    zoomToFitNodes(options) {
        let margin = options || 0;
        let nodes = [];
        let maxZoom = null;
        if (!!options && typeof options == 'object') {
            margin = options.margin || 0;
            nodes = options.nodes || [];
            maxZoom = options.maxZoom || null;
        }
        // no node selected
        if (nodes.length === 0) {
            nodes = this.model.getNodes();
        }
        const nodesRect = this.getBoundingNodesRect(nodes);
        if (nodesRect) {
            // there is something we should zoom on
            let canvasRect = this.canvas.getBoundingClientRect();
            const calculate = (margin = 0) => {
                // work out zoom
                const xFactor = this.canvas.clientWidth / (nodesRect.getWidth() + margin * 2);
                const yFactor = this.canvas.clientHeight / (nodesRect.getHeight() + margin * 2);
                let zoomFactor = xFactor < yFactor ? xFactor : yFactor;
                if (maxZoom && zoomFactor > maxZoom) {
                    zoomFactor = maxZoom;
                }
                return {
                    zoom: zoomFactor,
                    x: canvasRect.width / 2 -
                        ((nodesRect.getWidth() + margin * 2) / 2 + nodesRect.getTopLeft().x) * zoomFactor +
                        margin,
                    y: canvasRect.height / 2 -
                        ((nodesRect.getHeight() + margin * 2) / 2 + nodesRect.getTopLeft().y) * zoomFactor +
                        margin
                };
            };
            let params = calculate(0);
            if (margin) {
                if (params.x < margin || params.y < margin) {
                    params = calculate(margin);
                }
            }
            // apply
            this.model.setZoomLevel(params.zoom * 100);
            this.model.setOffset(params.x, params.y);
            this.repaintCanvas();
        }
    }
    getMaxNumberPointsPerLink() {
        return this.maxNumberPointsPerLink;
    }
    setMaxNumberPointsPerLink(max) {
        this.maxNumberPointsPerLink = max;
    }
}


/***/ }),

/***/ "./dist/entities/label/LabelModel.js":
/*!*******************************************!*\
  !*** ./dist/entities/label/LabelModel.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelModel: () => (/* binding */ LabelModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);

class LabelModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.BaseModel {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { offsetX: options.offsetX || 0, offsetY: options.offsetY || 0 }));
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.offsetX = event.data.offsetX;
        this.options.offsetY = event.data.offsetY;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { offsetX: this.options.offsetX, offsetY: this.options.offsetY });
    }
}


/***/ }),

/***/ "./dist/entities/label/LabelWidget.js":
/*!********************************************!*\
  !*** ./dist/entities/label/LabelWidget.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelWidget: () => (/* binding */ LabelWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);


var S;
(function (S) {
    S.Label = (_emotion_styled__WEBPACK_IMPORTED_MODULE_1___default().div) `
		display: inline-block;
		position: absolute;
	`;
    S.Foreign = (_emotion_styled__WEBPACK_IMPORTED_MODULE_1___default().foreignObject) `
		pointer-events: none;
		overflow: visible;
	`;
})(S || (S = {}));
class LabelWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.findPathAndRelativePositionToRenderLabel = (index) => {
            // an array to hold all path lengths, making sure we hit the DOM only once to fetch this information
            const link = this.props.label.getParent();
            const lengths = link.getRenderedPath().map((path) => path.getTotalLength());
            // calculate the point where we want to display the label
            let labelPosition = lengths.reduce((previousValue, currentValue) => previousValue + currentValue, 0) *
                (index / (link.getLabels().length + 1));
            // find the path where the label will be rendered and calculate the relative position
            let pathIndex = 0;
            while (pathIndex < link.getRenderedPath().length) {
                if (labelPosition - lengths[pathIndex] < 0) {
                    return {
                        path: link.getRenderedPath()[pathIndex],
                        position: labelPosition
                    };
                }
                // keep searching
                labelPosition -= lengths[pathIndex];
                pathIndex++;
            }
        };
        this.calculateLabelPosition = () => {
            const found = this.findPathAndRelativePositionToRenderLabel(this.props.index + 1);
            if (!found) {
                return;
            }
            const { path, position } = found;
            const labelDimensions = {
                width: this.ref.current.offsetWidth,
                height: this.ref.current.offsetHeight
            };
            const pathCentre = path.getPointAtLength(position);
            const labelCoordinates = {
                x: pathCentre.x - labelDimensions.width / 2 + this.props.label.getOptions().offsetX,
                y: pathCentre.y - labelDimensions.height / 2 + this.props.label.getOptions().offsetY
            };
            this.ref.current.style.transform = `translate(${labelCoordinates.x}px, ${labelCoordinates.y}px)`;
        };
        this.ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    }
    componentDidUpdate() {
        window.requestAnimationFrame(this.calculateLabelPosition);
    }
    componentDidMount() {
        window.requestAnimationFrame(this.calculateLabelPosition);
    }
    render() {
        const canvas = this.props.engine.getCanvas();
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Foreign, { key: this.props.label.getID(), width: canvas === null || canvas === void 0 ? void 0 : canvas.offsetWidth, height: canvas === null || canvas === void 0 ? void 0 : canvas.offsetHeight },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Label, { ref: this.ref }, this.props.engine.getFactoryForLabel(this.props.label).generateReactWidget({ model: this.props.label }))));
    }
}


/***/ }),

/***/ "./dist/entities/link-layer/LinkLayerFactory.js":
/*!******************************************************!*\
  !*** ./dist/entities/link-layer/LinkLayerFactory.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkLayerFactory: () => (/* binding */ LinkLayerFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LinkLayerModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LinkLayerModel */ "./dist/entities/link-layer/LinkLayerModel.js");
/* harmony import */ var _LinkLayerWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LinkLayerWidget */ "./dist/entities/link-layer/LinkLayerWidget.js");




class LinkLayerFactory extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__.AbstractReactFactory {
    constructor() {
        super('diagram-links');
    }
    generateModel(event) {
        return new _LinkLayerModel__WEBPACK_IMPORTED_MODULE_2__.LinkLayerModel();
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LinkLayerWidget__WEBPACK_IMPORTED_MODULE_3__.LinkLayerWidget, { layer: event.model, engine: this.engine });
    }
}


/***/ }),

/***/ "./dist/entities/link-layer/LinkLayerModel.js":
/*!****************************************************!*\
  !*** ./dist/entities/link-layer/LinkLayerModel.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkLayerModel: () => (/* binding */ LinkLayerModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _link_LinkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../link/LinkModel */ "./dist/entities/link/LinkModel.js");


class LinkLayerModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.LayerModel {
    constructor() {
        super({
            type: 'diagram-links',
            isSvg: true,
            transformed: true
        });
    }
    addModel(model) {
        if (!(model instanceof _link_LinkModel__WEBPACK_IMPORTED_MODULE_1__.LinkModel)) {
            throw new Error('Can only add links to this layer');
        }
        model.registerListener({
            entityRemoved: () => {
                this.getParent().removeLink(model);
            }
        });
        super.addModel(model);
    }
    getLinks() {
        return this.getModels();
    }
    getChildModelFactoryBank(engine) {
        return engine.getLinkFactories();
    }
}


/***/ }),

/***/ "./dist/entities/link-layer/LinkLayerWidget.js":
/*!*****************************************************!*\
  !*** ./dist/entities/link-layer/LinkLayerWidget.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkLayerWidget: () => (/* binding */ LinkLayerWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _link_LinkWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../link/LinkWidget */ "./dist/entities/link/LinkWidget.js");




var S;
(function (S) {
    S.Container = (_emotion_styled__WEBPACK_IMPORTED_MODULE_1___default().div) ``;
})(S || (S = {}));
class LinkLayerWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, 
        //only perform these actions when we have a diagram
        lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.props.layer.getLinks(), (link) => {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_link_LinkWidget__WEBPACK_IMPORTED_MODULE_3__.LinkWidget, { key: link.getID(), link: link, diagramEngine: this.props.engine });
        })));
    }
}


/***/ }),

/***/ "./dist/entities/link/LinkModel.js":
/*!*****************************************!*\
  !*** ./dist/entities/link/LinkModel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkModel: () => (/* binding */ LinkModel)
/* harmony export */ });
/* harmony import */ var _PointModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PointModel */ "./dist/entities/link/PointModel.js");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/slice */ "lodash/slice");
/* harmony import */ var lodash_slice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_slice__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_5__);






class LinkModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_5__.BaseModel {
    constructor(options) {
        super(options);
        this.points = [
            new _PointModel__WEBPACK_IMPORTED_MODULE_0__.PointModel({
                link: this
            }),
            new _PointModel__WEBPACK_IMPORTED_MODULE_0__.PointModel({
                link: this
            })
        ];
        this.sourcePort = null;
        this.targetPort = null;
        this.renderedPaths = [];
        this.labels = [];
    }
    getBoundingBox() {
        return new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4__.Rectangle((0,_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4__.boundingBoxFromPoints)(lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.points, (point) => {
            return point.getPosition();
        })));
    }
    getSelectionEntities() {
        if (this.getTargetPort() && this.getSourcePort()) {
            return super.getSelectionEntities().concat(lodash_slice__WEBPACK_IMPORTED_MODULE_3___default()(this.points, 1, this.points.length - 1));
        }
        // allow selection of the first point
        if (!this.getSourcePort()) {
            return super.getSelectionEntities().concat(lodash_slice__WEBPACK_IMPORTED_MODULE_3___default()(this.points, 0, this.points.length - 1));
        }
        // allow selection of the last point
        if (!this.getTargetPort()) {
            return super.getSelectionEntities().concat(lodash_slice__WEBPACK_IMPORTED_MODULE_3___default()(this.points, 1, this.points.length));
        }
        return super.getSelectionEntities().concat(this.points);
    }
    deserialize(event) {
        super.deserialize(event);
        this.points = lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(event.data.points || [], (point) => {
            var p = new _PointModel__WEBPACK_IMPORTED_MODULE_0__.PointModel({
                link: this,
                position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4__.Point(point.x, point.y)
            });
            p.deserialize(Object.assign(Object.assign({}, event), { data: point }));
            return p;
        });
        //deserialize labels
        lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(event.data.labels || [], (label) => {
            let labelOb = event.engine.getFactoryForLabel(label.type).generateModel({});
            labelOb.deserialize(Object.assign(Object.assign({}, event), { data: label }));
            this.addLabel(labelOb);
        });
        // these happen async, so we use the promises for these (they need to be done like this without the async keyword
        // because we need the deserailize method to finish for other methods while this happen
        if (event.data.target) {
            event.getModel(event.data.targetPort).then((model) => {
                this.setTargetPort(model);
            });
        }
        if (event.data.source) {
            event.getModel(event.data.sourcePort).then((model) => {
                this.setSourcePort(model);
            });
        }
    }
    getRenderedPath() {
        return this.renderedPaths;
    }
    setRenderedPaths(paths) {
        this.renderedPaths = paths;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { source: this.sourcePort ? this.sourcePort.getParent().getID() : null, sourcePort: this.sourcePort ? this.sourcePort.getID() : null, target: this.targetPort ? this.targetPort.getParent().getID() : null, targetPort: this.targetPort ? this.targetPort.getID() : null, points: lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.points, (point) => {
                return point.serialize();
            }), labels: lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.labels, (label) => {
                return label.serialize();
            }) });
    }
    doClone(lookupTable = {}, clone) {
        clone.setPoints(lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.getPoints(), (point) => {
            return point.clone(lookupTable);
        }));
        if (this.sourcePort) {
            clone.setSourcePort(this.sourcePort.clone(lookupTable));
        }
        if (this.targetPort) {
            clone.setTargetPort(this.targetPort.clone(lookupTable));
        }
    }
    clearPort(port) {
        if (this.sourcePort === port) {
            this.setSourcePort(null);
        }
        else if (this.targetPort === port) {
            this.setTargetPort(null);
        }
    }
    remove() {
        if (this.sourcePort) {
            this.sourcePort.removeLink(this);
            delete this.sourcePort;
        }
        if (this.targetPort) {
            this.targetPort.removeLink(this);
            delete this.targetPort;
        }
        super.remove();
    }
    isLastPoint(point) {
        var index = this.getPointIndex(point);
        return index === this.points.length - 1;
    }
    getPointIndex(point) {
        return this.points.indexOf(point);
    }
    getPointModel(id) {
        for (var i = 0; i < this.points.length; i++) {
            if (this.points[i].getID() === id) {
                return this.points[i];
            }
        }
        return null;
    }
    getPortForPoint(point) {
        if (this.sourcePort !== null && this.getFirstPoint().getID() === point.getID()) {
            return this.sourcePort;
        }
        if (this.targetPort !== null && this.getLastPoint().getID() === point.getID()) {
            return this.targetPort;
        }
        return null;
    }
    getPointForPort(port) {
        if (this.sourcePort !== null && this.sourcePort.getID() === port.getID()) {
            return this.getFirstPoint();
        }
        if (this.targetPort !== null && this.targetPort.getID() === port.getID()) {
            return this.getLastPoint();
        }
        return null;
    }
    getFirstPoint() {
        return this.points[0];
    }
    getLastPoint() {
        return this.points[this.points.length - 1];
    }
    setSourcePort(port) {
        if (port !== null) {
            port.addLink(this);
        }
        if (this.sourcePort !== null) {
            this.sourcePort.removeLink(this);
        }
        this.sourcePort = port;
        this.fireEvent({ port }, 'sourcePortChanged');
        if (port === null || port === void 0 ? void 0 : port.reportedPosition) {
            this.getPointForPort(port).setPosition(port.getCenter());
        }
    }
    getSourcePort() {
        return this.sourcePort;
    }
    getTargetPort() {
        return this.targetPort;
    }
    setTargetPort(port) {
        if (port !== null) {
            port.addLink(this);
        }
        if (this.targetPort !== null) {
            this.targetPort.removeLink(this);
        }
        this.targetPort = port;
        this.fireEvent({ port }, 'targetPortChanged');
        if (port === null || port === void 0 ? void 0 : port.reportedPosition) {
            this.getPointForPort(port).setPosition(port.getCenter());
        }
    }
    point(x, y, index = 1) {
        return this.addPoint(this.generatePoint(x, y), index);
    }
    addLabel(label) {
        label.setParent(this);
        this.labels.push(label);
    }
    getPoints() {
        return this.points;
    }
    getLabels() {
        return this.labels;
    }
    setPoints(points) {
        lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(points, (point) => {
            point.setParent(this);
        });
        this.points = points;
    }
    removePoint(pointModel) {
        if (this.isLastPoint(pointModel))
            this.remove();
        this.points.splice(this.getPointIndex(pointModel), 1);
    }
    removePointsBefore(pointModel) {
        this.points.splice(0, this.getPointIndex(pointModel));
    }
    removePointsAfter(pointModel) {
        this.points.splice(this.getPointIndex(pointModel) + 1);
    }
    removeMiddlePoints() {
        if (this.points.length > 2) {
            this.points.splice(1, this.points.length - 2);
        }
    }
    addPoint(pointModel, index = 1) {
        pointModel.setParent(this);
        this.points.splice(index, 0, pointModel);
        return pointModel;
    }
    generatePoint(x = 0, y = 0) {
        return new _PointModel__WEBPACK_IMPORTED_MODULE_0__.PointModel({
            link: this,
            position: new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_4__.Point(x, y)
        });
    }
}


/***/ }),

/***/ "./dist/entities/link/LinkWidget.js":
/*!******************************************!*\
  !*** ./dist/entities/link/LinkWidget.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkWidget: () => (/* binding */ LinkWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _label_LabelWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../label/LabelWidget */ "./dist/entities/label/LabelWidget.js");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__);




class LinkWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourcePort: null,
            targetPort: null
        };
    }
    componentWillUnmount() {
        if (this.sourceListener) {
            this.sourceListener.deregister();
        }
        if (this.targetListener) {
            this.targetListener.deregister();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            sourcePort: nextProps.link.getSourcePort(),
            targetPort: nextProps.link.getTargetPort()
        };
    }
    installTarget() {
        this.targetListener && this.targetListener.deregister();
        if (!this.props.link.getTargetPort())
            return;
        this.targetListener = this.props.link.getTargetPort().registerListener({
            reportInitialPosition: (event) => {
                this.forceUpdate();
            }
        });
    }
    installSource() {
        this.sourceListener && this.sourceListener.deregister();
        if (!this.props.link.getSourcePort())
            return;
        this.sourceListener = this.props.link.getSourcePort().registerListener({
            reportInitialPosition: (event) => {
                this.forceUpdate();
            }
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sourcePort !== this.state.sourcePort) {
            this.installSource();
        }
        if (prevState.targetPort !== this.state.targetPort) {
            this.installTarget();
        }
    }
    static generateLinePath(firstPoint, lastPoint) {
        return `M${firstPoint.getX()},${firstPoint.getY()} L ${lastPoint.getX()},${lastPoint.getY()}`;
    }
    componentDidMount() {
        if (this.props.link.getSourcePort()) {
            this.installSource();
        }
        if (this.props.link.getTargetPort()) {
            this.installTarget();
        }
    }
    render() {
        const { link } = this.props;
        // only draw the link when we have reported positions
        if (link.getSourcePort() && !link.getSourcePort().reportedPosition) {
            return null;
        }
        if (link.getTargetPort() && !link.getTargetPort().reportedPosition) {
            return null;
        }
        //generate links
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_3__.PeformanceWidget, { model: this.props.link, serialized: this.props.link.serialize() }, () => {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", { "data-linkid": this.props.link.getID() },
                this.props.diagramEngine.generateWidgetForLink(link),
                lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(this.props.link.getLabels(), (labelModel, index) => {
                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_label_LabelWidget__WEBPACK_IMPORTED_MODULE_2__.LabelWidget, { key: labelModel.getID(), engine: this.props.diagramEngine, label: labelModel, index: index }));
                })));
        }));
    }
}


/***/ }),

/***/ "./dist/entities/link/PointModel.js":
/*!******************************************!*\
  !*** ./dist/entities/link/PointModel.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PointModel: () => (/* binding */ PointModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);

class PointModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.BasePositionModel {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: 'point' }));
        this.parent = options.link;
    }
    isConnectedToPort() {
        return this.parent.getPortForPoint(this) !== null;
    }
    getLink() {
        return this.getParent();
    }
    remove() {
        //clear references
        if (this.parent) {
            this.parent.removePoint(this);
        }
        super.remove();
    }
    isLocked() {
        return super.isLocked() || this.getParent().isLocked();
    }
}


/***/ }),

/***/ "./dist/entities/node-layer-w/NodeWLayerModel.js":
/*!*******************************************************!*\
  !*** ./dist/entities/node-layer-w/NodeWLayerModel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeWLayerModel: () => (/* binding */ NodeWLayerModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_NodeModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node/NodeModel */ "./dist/entities/node/NodeModel.js");


class NodeWLayerModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.LayerModel {
    constructor() {
        super({
            type: 'diagram-nodes-w',
            isSvg: false,
            transformed: true
        });
    }
    addModel(model) {
        if (!(model instanceof _node_NodeModel__WEBPACK_IMPORTED_MODULE_1__.NodeModel)) {
            throw new Error('Can only add nodes to this layer');
        }
        model.registerListener({
            entityRemoved: () => {
                this.getParent().removeNode(model);
            }
        });
        super.addModel(model);
    }
    getChildModelFactoryBank(engine) {
        return engine.getNodeFactories();
    }
    getNodes() {
        return this.getModels();
    }
}


/***/ }),

/***/ "./dist/entities/node-layer/NodeLayerFactory.js":
/*!******************************************************!*\
  !*** ./dist/entities/node-layer/NodeLayerFactory.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeLayerFactory: () => (/* binding */ NodeLayerFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NodeLayerModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NodeLayerModel */ "./dist/entities/node-layer/NodeLayerModel.js");
/* harmony import */ var _NodeLayerWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NodeLayerWidget */ "./dist/entities/node-layer/NodeLayerWidget.js");




class NodeLayerFactory extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_1__.AbstractReactFactory {
    constructor() {
        super('diagram-nodes');
    }
    generateModel(event) {
        return new _NodeLayerModel__WEBPACK_IMPORTED_MODULE_2__.NodeLayerModel();
    }
    generateReactWidget(event) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_NodeLayerWidget__WEBPACK_IMPORTED_MODULE_3__.NodeLayerWidget, { layer: event.model, engine: this.engine });
    }
}


/***/ }),

/***/ "./dist/entities/node-layer/NodeLayerModel.js":
/*!****************************************************!*\
  !*** ./dist/entities/node-layer/NodeLayerModel.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeLayerModel: () => (/* binding */ NodeLayerModel)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_NodeModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node/NodeModel */ "./dist/entities/node/NodeModel.js");


class NodeLayerModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.LayerModel {
    constructor() {
        super({
            type: 'diagram-nodes',
            isSvg: false,
            transformed: true
        });
    }
    addModel(model) {
        if (!(model instanceof _node_NodeModel__WEBPACK_IMPORTED_MODULE_1__.NodeModel)) {
            throw new Error('Can only add nodes to this layer');
        }
        model.registerListener({
            entityRemoved: () => {
                this.getParent().removeNode(model);
            }
        });
        super.addModel(model);
    }
    getChildModelFactoryBank(engine) {
        return engine.getNodeFactories();
    }
    getNodes() {
        return this.getModels();
    }
}


/***/ }),

/***/ "./dist/entities/node-layer/NodeLayerWidget.js":
/*!*****************************************************!*\
  !*** ./dist/entities/node-layer/NodeLayerWidget.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeLayerWidget: () => (/* binding */ NodeLayerWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_NodeWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node/NodeWidget */ "./dist/entities/node/NodeWidget.js");



class NodeLayerWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(this.props.layer.getNodes(), (node) => {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_node_NodeWidget__WEBPACK_IMPORTED_MODULE_2__.NodeWidget, { key: node.getID(), diagramEngine: this.props.engine, node: node });
        })));
    }
}


/***/ }),

/***/ "./dist/entities/node/NodeModel.js":
/*!*****************************************!*\
  !*** ./dist/entities/node/NodeModel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeModel: () => (/* binding */ NodeModel)
/* harmony export */ });
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/values */ "lodash/values");
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4__);





class NodeModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_4__.BasePositionModel {
    constructor(options) {
        super(options);
        this.ports = {};
        this.width = 0;
        this.height = 0;
    }
    getBoundingBox() {
        return _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__.Rectangle.fromPointAndSize(this.getPosition(), this.width, this.height);
    }
    setPosition(x, y) {
        const old = this.position;
        if (x instanceof _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_3__.Point) {
            super.setPosition(x);
        }
        else {
            super.setPosition(x, y);
        }
        //also update the port co-ordinates (for make glorious speed)
        lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(this.ports, (port) => {
            port.setPosition(port.getX() + this.position.x - old.x, port.getY() + this.position.y - old.y);
        });
    }
    deserialize(event) {
        super.deserialize(event);
        //deserialize ports
        lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(event.data.ports, (port) => {
            let portOb = event.engine.getFactoryForPort(port.type).generateModel({});
            portOb.deserialize(Object.assign(Object.assign({}, event), { data: port }));
            // the links need these
            event.registerModel(portOb);
            this.addPort(portOb);
        });
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { ports: lodash_map__WEBPACK_IMPORTED_MODULE_1___default()(this.ports, (port) => {
                return port.serialize();
            }) });
    }
    doClone(lookupTable = {}, clone) {
        // also clone the ports
        clone.ports = {};
        lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(this.ports, (port) => {
            clone.addPort(port.clone(lookupTable));
        });
    }
    remove() {
        super.remove();
        lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(this.ports, (port) => {
            lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(port.getLinks(), (link) => {
                link.remove();
            });
        });
    }
    getPortFromID(id) {
        for (var i in this.ports) {
            if (this.ports[i].getID() === id) {
                return this.ports[i];
            }
        }
        return null;
    }
    getLink(id) {
        for (let portID in this.ports) {
            const links = this.ports[portID].getLinks();
            if (links[id]) {
                return links[id];
            }
        }
    }
    getPort(name) {
        return this.ports[name];
    }
    getPorts() {
        return this.ports;
    }
    removePort(port) {
        // clear the port from the links
        for (let link of lodash_values__WEBPACK_IMPORTED_MODULE_2___default()(port.getLinks())) {
            link.clearPort(port);
        }
        //clear the parent node reference
        if (this.ports[port.getName()]) {
            this.ports[port.getName()].setParent(null);
            delete this.ports[port.getName()];
        }
    }
    addPort(port) {
        port.setParent(this);
        this.ports[port.getName()] = port;
        return port;
    }
    updateDimensions({ width, height }) {
        this.width = width;
        this.height = height;
    }
}


/***/ }),

/***/ "./dist/entities/node/NodeWidget.js":
/*!******************************************!*\
  !*** ./dist/entities/node/NodeWidget.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeWidget: () => (/* binding */ NodeWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! resize-observer-polyfill */ "resize-observer-polyfill");
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__);





var S;
(function (S) {
    S.Node = (_emotion_styled__WEBPACK_IMPORTED_MODULE_3___default().div) `
		position: absolute;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		user-select: none;
		cursor: move;
		pointer-events: all;
	`;
})(S || (S = {}));
class NodeWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    }
    componentWillUnmount() {
        var _a;
        this.ob.disconnect();
        this.ob = null;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.deregister();
        this.listener = null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.listener && this.props.node !== prevProps.node) {
            this.listener.deregister();
            this.installSelectionListener();
        }
    }
    installSelectionListener() {
        this.listener = this.props.node.registerListener({
            selectionChanged: (event) => {
                this.forceUpdate();
            }
        });
    }
    updateSize(width, height) {
        this.props.node.updateDimensions({ width, height });
        //now mark the links as dirty
        try {
            lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(this.props.node.getPorts(), (port) => {
                port.updateCoords(this.props.diagramEngine.getPortCoords(port));
            });
        }
        catch (ex) { }
    }
    componentDidMount() {
        // @ts-ignore
        this.ob = new (resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4___default())((entities) => {
            const bounds = entities[0].contentRect;
            this.updateSize(bounds.width, bounds.height);
        });
        const b = this.ref.current.getBoundingClientRect();
        this.updateSize(b.width, b.height);
        this.ob.observe(this.ref.current);
        this.installSelectionListener();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.PeformanceWidget, { model: this.props.node, serialized: this.props.node.serialize() }, () => {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(S.Node, { className: "node", ref: this.ref, "data-nodeid": this.props.node.getID(), style: {
                    top: this.props.node.getY(),
                    left: this.props.node.getX()
                } }, this.props.diagramEngine.generateWidgetForNode(this.props.node)));
        }));
    }
}


/***/ }),

/***/ "./dist/entities/port/PortModel.js":
/*!*****************************************!*\
  !*** ./dist/entities/port/PortModel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PortModel: () => (/* binding */ PortModel),
/* harmony export */   PortModelAlignment: () => (/* binding */ PortModelAlignment)
/* harmony export */ });
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isFinite */ "lodash/isFinite");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isFinite__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/map */ "lodash/map");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/size */ "lodash/size");
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_size__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/values */ "lodash/values");
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @projectstorm/geometry */ "@projectstorm/geometry");
/* harmony import */ var _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_geometry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_6__);







var PortModelAlignment;
(function (PortModelAlignment) {
    PortModelAlignment["TOP"] = "top";
    PortModelAlignment["LEFT"] = "left";
    PortModelAlignment["BOTTOM"] = "bottom";
    PortModelAlignment["RIGHT"] = "right";
})(PortModelAlignment || (PortModelAlignment = {}));
class PortModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_6__.BasePositionModel {
    constructor(options) {
        super(options);
        this.links = {};
        this.reportedPosition = false;
    }
    deserialize(event) {
        super.deserialize(event);
        this.reportedPosition = false;
        this.options.name = event.data.name;
        this.options.alignment = event.data.alignment;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { name: this.options.name, alignment: this.options.alignment, parentNode: this.parent.getID(), links: lodash_map__WEBPACK_IMPORTED_MODULE_2___default()(this.links, (link) => {
                return link.getID();
            }) });
    }
    setPosition(x, y) {
        let old = this.position;
        super.setPosition(x, y);
        lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(this.getLinks(), (link) => {
            let point = link.getPointForPort(this);
            point.setPosition(point.getX() + x - old.x, point.getY() + y - old.y);
        });
    }
    doClone(lookupTable = {}, clone) {
        clone.links = {};
        clone.parent = this.getParent().clone(lookupTable);
    }
    getNode() {
        return this.getParent();
    }
    getName() {
        return this.options.name;
    }
    getMaximumLinks() {
        return this.options.maximumLinks;
    }
    setMaximumLinks(maximumLinks) {
        this.options.maximumLinks = maximumLinks;
    }
    removeLink(link) {
        delete this.links[link.getID()];
    }
    addLink(link) {
        this.links[link.getID()] = link;
    }
    getLinks() {
        return this.links;
    }
    createLinkModel() {
        if (lodash_isFinite__WEBPACK_IMPORTED_MODULE_1___default()(this.options.maximumLinks)) {
            var numberOfLinks = lodash_size__WEBPACK_IMPORTED_MODULE_3___default()(this.links);
            if (this.options.maximumLinks === 1 && numberOfLinks >= 1) {
                return lodash_values__WEBPACK_IMPORTED_MODULE_4___default()(this.links)[0];
            }
            else if (numberOfLinks >= this.options.maximumLinks) {
                return null;
            }
        }
        return null;
    }
    reportPosition() {
        lodash_forEach__WEBPACK_IMPORTED_MODULE_0___default()(this.getLinks(), (link) => {
            link.getPointForPort(this).setPosition(this.getCenter());
        });
        this.fireEvent({
            entity: this
        }, 'reportInitialPosition');
    }
    getCenter() {
        return new _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_5__.Point(this.getX() + this.width / 2, this.getY() + this.height / 2);
    }
    getBoundingBox() {
        return _projectstorm_geometry__WEBPACK_IMPORTED_MODULE_5__.Rectangle.fromPointAndSize(this.position, this.width, this.height);
    }
    updateCoords(coords) {
        this.width = coords.getWidth();
        this.height = coords.getHeight();
        this.setPosition(coords.getTopLeft());
        this.reportedPosition = true;
        this.reportPosition();
    }
    canLinkToPort(port) {
        return true;
    }
    isLocked() {
        return super.isLocked() || this.getParent().isLocked();
    }
}


/***/ }),

/***/ "./dist/entities/port/PortWidget.js":
/*!******************************************!*\
  !*** ./dist/entities/port/PortWidget.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PortWidget: () => (/* binding */ PortWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/keys */ "lodash/keys");
/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__);



class PortWidget extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    }
    report() {
        this.props.port.updateCoords(this.props.engine.getPortCoords(this.props.port, this.ref.current));
    }
    componentWillUnmount() {
        this.engineListenerHandle && this.engineListenerHandle.deregister();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.port.reportedPosition) {
            this.report();
        }
    }
    componentDidMount() {
        this.engineListenerHandle = this.props.engine.registerListener({
            canvasReady: () => {
                this.report();
            }
        });
        if (this.props.engine.getCanvas()) {
            this.report();
        }
    }
    getExtraProps() {
        if (_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_2__.Toolkit.TESTING) {
            const links = lodash_keys__WEBPACK_IMPORTED_MODULE_1___default()(this.props.port.getNode().getPort(this.props.port.getName()).links).join(',');
            return {
                'data-links': links
            };
        }
        return {};
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", Object.assign({ style: this.props.style, ref: this.ref, className: `port ${this.props.className || ''}`, "data-name": this.props.port.getName(), "data-nodeid": this.props.port.getNode().getID() }, this.getExtraProps()), this.props.children));
    }
}


/***/ }),

/***/ "./dist/models/DiagramModel.js":
/*!*************************************!*\
  !*** ./dist/models/DiagramModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramModel: () => (/* binding */ DiagramModel)
/* harmony export */ });
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/filter */ "lodash/filter");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_flatMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/flatMap */ "lodash/flatMap");
/* harmony import */ var lodash_flatMap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_flatMap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_some__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/some */ "lodash/some");
/* harmony import */ var lodash_some__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_some__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/values */ "lodash/values");
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _entities_link_LinkModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../entities/link/LinkModel */ "./dist/entities/link/LinkModel.js");
/* harmony import */ var _entities_node_NodeModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entities/node/NodeModel */ "./dist/entities/node/NodeModel.js");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../entities/node-layer/NodeLayerModel */ "./dist/entities/node-layer/NodeLayerModel.js");
/* harmony import */ var _entities_node_layer_w_NodeWLayerModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../entities/node-layer-w/NodeWLayerModel */ "./dist/entities/node-layer-w/NodeWLayerModel.js");
/* harmony import */ var _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../entities/link-layer/LinkLayerModel */ "./dist/entities/link-layer/LinkLayerModel.js");











class DiagramModel extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_7__.CanvasModel {
    constructor(options = {}) {
        super(options);
        this.addLayer(new _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_10__.LinkLayerModel());
        this.addLayer(new _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__.NodeLayerModel());
        this.addLayer(new _entities_node_layer_w_NodeWLayerModel__WEBPACK_IMPORTED_MODULE_9__.NodeWLayerModel());
    }
    deserialize(event) {
        this.layers = [];
        super.deserialize(event);
    }
    addLayer(layer) {
        super.addLayer(layer);
        if (layer instanceof _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__.NodeLayerModel) {
            this.activeNodeLayer = layer;
        }
        if (layer instanceof _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_10__.LinkLayerModel) {
            this.activeLinkLayer = layer;
        }
        if (layer instanceof _entities_node_layer_w_NodeWLayerModel__WEBPACK_IMPORTED_MODULE_9__.NodeWLayerModel) {
            this.activeNodeWLayer = layer;
        }
    }
    getLinkLayers() {
        return lodash_filter__WEBPACK_IMPORTED_MODULE_0___default()(this.layers, (layer) => {
            return layer instanceof _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_10__.LinkLayerModel;
        });
    }
    getNodeWLayers() {
        return lodash_filter__WEBPACK_IMPORTED_MODULE_0___default()(this.layers, (layer) => {
            return layer instanceof _entities_node_layer_w_NodeWLayerModel__WEBPACK_IMPORTED_MODULE_9__.NodeWLayerModel;
        });
    }
    getNodeLayers() {
        return lodash_filter__WEBPACK_IMPORTED_MODULE_0___default()(this.layers, (layer) => {
            return layer instanceof _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__.NodeLayerModel;
        });
    }
    getActiveNodeLayer() {
        if (!this.activeNodeLayer) {
            const layers = [...this.getNodeLayers(), ...this.getNodeWLayers()];
            if (layers.length === 0) {
                this.addLayer(new _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__.NodeLayerModel());
                this.addLayer(new _entities_node_layer_w_NodeWLayerModel__WEBPACK_IMPORTED_MODULE_9__.NodeWLayerModel());
            }
            else {
                this.activeNodeLayer = layers[0];
            }
        }
        return this.activeNodeLayer;
    }
    getActiveLinkLayer() {
        if (!this.activeLinkLayer) {
            const layers = this.getLinkLayers();
            if (layers.length === 0) {
                this.addLayer(new _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_10__.LinkLayerModel());
            }
            else {
                this.activeLinkLayer = layers[0];
            }
        }
        return this.activeLinkLayer;
    }
    getNode(node) {
        for (const layer of this.getNodeLayers()) {
            const model = layer.getModel(node);
            if (model) {
                return model;
            }
        }
    }
    getLink(link) {
        for (const layer of this.getLinkLayers()) {
            const model = layer.getModel(link);
            if (model) {
                return model;
            }
        }
    }
    addAll(...models) {
        lodash_forEach__WEBPACK_IMPORTED_MODULE_2___default()(models, (model) => {
            if (model instanceof _entities_link_LinkModel__WEBPACK_IMPORTED_MODULE_5__.LinkModel) {
                this.addLink(model);
            }
            else if (model instanceof _entities_node_NodeModel__WEBPACK_IMPORTED_MODULE_6__.NodeModel) {
                this.addNode(model);
            }
        });
        return models;
    }
    addLink(link) {
        this.getActiveLinkLayer().addModel(link);
        this.fireEvent({
            link,
            isCreated: true
        }, 'linksUpdated');
        return link;
    }
    addNode(node) {
        this.getActiveNodeLayer().addModel(node);
        this.fireEvent({ node, isCreated: true }, 'nodesUpdated');
        return node;
    }
    removeLink(link) {
        const removed = lodash_some__WEBPACK_IMPORTED_MODULE_3___default()(this.getLinkLayers(), (layer) => {
            return layer.removeModel(link);
        });
        if (removed) {
            this.fireEvent({ link, isCreated: false }, 'linksUpdated');
        }
    }
    removeNode(node) {
        const removed = lodash_some__WEBPACK_IMPORTED_MODULE_3___default()(this.getNodeLayers(), (layer) => {
            return layer.removeModel(node);
        });
        if (removed) {
            this.fireEvent({ node, isCreated: false }, 'nodesUpdated');
        }
    }
    getLinks() {
        return lodash_flatMap__WEBPACK_IMPORTED_MODULE_1___default()(this.getLinkLayers(), (layer) => {
            return lodash_values__WEBPACK_IMPORTED_MODULE_4___default()(layer.getModels());
        });
    }
    getNodes() {
        return lodash_flatMap__WEBPACK_IMPORTED_MODULE_1___default()(this.getNodeLayers(), (layer) => {
            return lodash_values__WEBPACK_IMPORTED_MODULE_4___default()(layer.getModels());
        });
    }
}


/***/ }),

/***/ "./dist/states/DefaultDiagramState.js":
/*!********************************************!*\
  !*** ./dist/states/DefaultDiagramState.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultDiagramState: () => (/* binding */ DefaultDiagramState)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/port/PortModel */ "./dist/entities/port/PortModel.js");
/* harmony import */ var _DragNewLinkState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DragNewLinkState */ "./dist/states/DragNewLinkState.js");
/* harmony import */ var _DragDiagramItemsState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DragDiagramItemsState */ "./dist/states/DragDiagramItemsState.js");




class DefaultDiagramState extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.State {
    constructor() {
        super({
            name: 'default-diagrams'
        });
        this.childStates = [new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.SelectingState()];
        this.dragCanvas = new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.DragCanvasState();
        this.dragNewLink = new _DragNewLinkState__WEBPACK_IMPORTED_MODULE_2__.DragNewLinkState();
        this.dragItems = new _DragDiagramItemsState__WEBPACK_IMPORTED_MODULE_3__.DragDiagramItemsState();
        // determine what was clicked on
        this.registerAction(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.Action({
            type: _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.InputType.MOUSE_DOWN,
            fire: (event) => {
                const element = this.engine.getActionEventBus().getModelForEvent(event);
                // the canvas was clicked on, transition to the dragging canvas state
                if (!element) {
                    this.transitionWithEvent(this.dragCanvas, event);
                }
                // initiate dragging a new link
                else if (element instanceof _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_1__.PortModel) {
                    this.transitionWithEvent(this.dragNewLink, event);
                }
                // move the items (and potentially link points)
                else {
                    this.transitionWithEvent(this.dragItems, event);
                }
            }
        }));
        // touch drags the canvas
        this.registerAction(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.Action({
            type: _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.InputType.TOUCH_START,
            fire: (event) => {
                this.transitionWithEvent(this.dragCanvas, event);
            }
        }));
    }
}


/***/ }),

/***/ "./dist/states/DragDiagramItemsState.js":
/*!**********************************************!*\
  !*** ./dist/states/DragDiagramItemsState.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragDiagramItemsState: () => (/* binding */ DragDiagramItemsState)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/forEach */ "lodash/forEach");
/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_link_PointModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/link/PointModel */ "./dist/entities/link/PointModel.js");
/* harmony import */ var _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/port/PortModel */ "./dist/entities/port/PortModel.js");




class DragDiagramItemsState extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.MoveItemsState {
    constructor() {
        super();
        this.registerAction(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.Action({
            type: _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.InputType.MOUSE_UP,
            fire: (event) => {
                const item = this.engine.getMouseElement(event.event);
                if (item instanceof _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_3__.PortModel) {
                    lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(this.initialPositions, (position) => {
                        if (position.item instanceof _entities_link_PointModel__WEBPACK_IMPORTED_MODULE_2__.PointModel) {
                            const link = position.item.getParent();
                            // only care about the last links
                            if (link.getLastPoint() !== position.item) {
                                return;
                            }
                            if (link.getSourcePort().canLinkToPort(item)) {
                                link.setTargetPort(item);
                                item.reportPosition();
                                this.engine.repaintCanvas();
                            }
                        }
                    });
                }
            }
        }));
    }
}


/***/ }),

/***/ "./dist/states/DragNewLinkState.js":
/*!*****************************************!*\
  !*** ./dist/states/DragNewLinkState.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragNewLinkState: () => (/* binding */ DragNewLinkState)
/* harmony export */ });
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @projectstorm/react-canvas-core */ "@projectstorm/react-canvas-core");
/* harmony import */ var _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/port/PortModel */ "./dist/entities/port/PortModel.js");


class DragNewLinkState extends _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.AbstractDisplacementState {
    constructor(options = {}) {
        super({ name: 'drag-new-link' });
        this.config = Object.assign({ allowLooseLinks: true, allowLinksFromLockedPorts: false }, options);
        this.registerAction(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.Action({
            type: _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.InputType.MOUSE_DOWN,
            fire: (event) => {
                this.port = this.engine.getMouseElement(event.event);
                if (!this.config.allowLinksFromLockedPorts && this.port.isLocked()) {
                    this.eject();
                    return;
                }
                this.link = this.port.createLinkModel();
                // if no link is given, just eject the state
                if (!this.link) {
                    this.eject();
                    return;
                }
                this.link.setSelected(true);
                this.link.setSourcePort(this.port);
                this.engine.getModel().addLink(this.link);
                this.port.reportPosition();
            }
        }));
        this.registerAction(new _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.Action({
            type: _projectstorm_react_canvas_core__WEBPACK_IMPORTED_MODULE_0__.InputType.MOUSE_UP,
            fire: (event) => {
                const model = this.engine.getMouseElement(event.event);
                // check to see if we connected to a new port
                if (model instanceof _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_1__.PortModel) {
                    if (this.port.canLinkToPort(model)) {
                        this.link.setTargetPort(model);
                        model.reportPosition();
                        this.engine.repaintCanvas();
                        return;
                    }
                    else {
                        this.link.remove();
                        this.engine.repaintCanvas();
                        return;
                    }
                }
                if (!this.config.allowLooseLinks) {
                    this.link.remove();
                    this.engine.repaintCanvas();
                }
            }
        }));
    }
    /**
     * Calculates the link's far-end point position on mouse move.
     * In order to be as precise as possible the mouse initialXRelative & initialYRelative are taken into account as well
     * as the possible engine offset
     */
    fireMouseMoved(event) {
        const portPos = this.port.getPosition();
        const zoomLevelPercentage = this.engine.getModel().getZoomLevel() / 100;
        const engineOffsetX = this.engine.getModel().getOffsetX() / zoomLevelPercentage;
        const engineOffsetY = this.engine.getModel().getOffsetY() / zoomLevelPercentage;
        const initialXRelative = this.initialXRelative / zoomLevelPercentage;
        const initialYRelative = this.initialYRelative / zoomLevelPercentage;
        const linkNextX = portPos.x - engineOffsetX + (initialXRelative - portPos.x) + event.virtualDisplacementX;
        const linkNextY = portPos.y - engineOffsetY + (initialYRelative - portPos.y) + event.virtualDisplacementY;
        this.link.getLastPoint().setPosition(linkNextX, linkNextY);
        this.engine.repaintCanvas();
    }
}


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

/***/ "lodash/filter":
/*!********************************!*\
  !*** external "lodash/filter" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/filter");

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

/***/ "lodash/isFinite":
/*!**********************************!*\
  !*** external "lodash/isFinite" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("lodash/isFinite");

/***/ }),

/***/ "lodash/keys":
/*!******************************!*\
  !*** external "lodash/keys" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/keys");

/***/ }),

/***/ "lodash/map":
/*!*****************************!*\
  !*** external "lodash/map" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("lodash/map");

/***/ }),

/***/ "lodash/size":
/*!******************************!*\
  !*** external "lodash/size" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/size");

/***/ }),

/***/ "lodash/slice":
/*!*******************************!*\
  !*** external "lodash/slice" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("lodash/slice");

/***/ }),

/***/ "lodash/some":
/*!******************************!*\
  !*** external "lodash/some" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("lodash/some");

/***/ }),

/***/ "lodash/values":
/*!********************************!*\
  !*** external "lodash/values" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/values");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "resize-observer-polyfill":
/*!*******************************************!*\
  !*** external "resize-observer-polyfill" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("resize-observer-polyfill");

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
/* harmony export */   DefaultDiagramState: () => (/* reexport safe */ _states_DefaultDiagramState__WEBPACK_IMPORTED_MODULE_15__.DefaultDiagramState),
/* harmony export */   DiagramEngine: () => (/* reexport safe */ _DiagramEngine__WEBPACK_IMPORTED_MODULE_18__.DiagramEngine),
/* harmony export */   DiagramModel: () => (/* reexport safe */ _models_DiagramModel__WEBPACK_IMPORTED_MODULE_0__.DiagramModel),
/* harmony export */   DragDiagramItemsState: () => (/* reexport safe */ _states_DragDiagramItemsState__WEBPACK_IMPORTED_MODULE_16__.DragDiagramItemsState),
/* harmony export */   DragNewLinkState: () => (/* reexport safe */ _states_DragNewLinkState__WEBPACK_IMPORTED_MODULE_17__.DragNewLinkState),
/* harmony export */   LabelModel: () => (/* reexport safe */ _entities_label_LabelModel__WEBPACK_IMPORTED_MODULE_1__.LabelModel),
/* harmony export */   LinkLayerFactory: () => (/* reexport safe */ _entities_link_layer_LinkLayerFactory__WEBPACK_IMPORTED_MODULE_7__.LinkLayerFactory),
/* harmony export */   LinkLayerModel: () => (/* reexport safe */ _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_5__.LinkLayerModel),
/* harmony export */   LinkLayerWidget: () => (/* reexport safe */ _entities_link_layer_LinkLayerWidget__WEBPACK_IMPORTED_MODULE_6__.LinkLayerWidget),
/* harmony export */   LinkModel: () => (/* reexport safe */ _entities_link_LinkModel__WEBPACK_IMPORTED_MODULE_2__.LinkModel),
/* harmony export */   LinkWidget: () => (/* reexport safe */ _entities_link_LinkWidget__WEBPACK_IMPORTED_MODULE_4__.LinkWidget),
/* harmony export */   NodeLayerFactory: () => (/* reexport safe */ _entities_node_layer_NodeLayerFactory__WEBPACK_IMPORTED_MODULE_10__.NodeLayerFactory),
/* harmony export */   NodeLayerModel: () => (/* reexport safe */ _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__.NodeLayerModel),
/* harmony export */   NodeLayerWidget: () => (/* reexport safe */ _entities_node_layer_NodeLayerWidget__WEBPACK_IMPORTED_MODULE_9__.NodeLayerWidget),
/* harmony export */   NodeModel: () => (/* reexport safe */ _entities_node_NodeModel__WEBPACK_IMPORTED_MODULE_11__.NodeModel),
/* harmony export */   NodeWidget: () => (/* reexport safe */ _entities_node_NodeWidget__WEBPACK_IMPORTED_MODULE_12__.NodeWidget),
/* harmony export */   PointModel: () => (/* reexport safe */ _entities_link_PointModel__WEBPACK_IMPORTED_MODULE_3__.PointModel),
/* harmony export */   PortModel: () => (/* reexport safe */ _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_13__.PortModel),
/* harmony export */   PortModelAlignment: () => (/* reexport safe */ _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_13__.PortModelAlignment),
/* harmony export */   PortWidget: () => (/* reexport safe */ _entities_port_PortWidget__WEBPACK_IMPORTED_MODULE_14__.PortWidget)
/* harmony export */ });
/* harmony import */ var _models_DiagramModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/DiagramModel */ "./dist/models/DiagramModel.js");
/* harmony import */ var _entities_label_LabelModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/label/LabelModel */ "./dist/entities/label/LabelModel.js");
/* harmony import */ var _entities_link_LinkModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/link/LinkModel */ "./dist/entities/link/LinkModel.js");
/* harmony import */ var _entities_link_PointModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/link/PointModel */ "./dist/entities/link/PointModel.js");
/* harmony import */ var _entities_link_LinkWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/link/LinkWidget */ "./dist/entities/link/LinkWidget.js");
/* harmony import */ var _entities_link_layer_LinkLayerModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/link-layer/LinkLayerModel */ "./dist/entities/link-layer/LinkLayerModel.js");
/* harmony import */ var _entities_link_layer_LinkLayerWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entities/link-layer/LinkLayerWidget */ "./dist/entities/link-layer/LinkLayerWidget.js");
/* harmony import */ var _entities_link_layer_LinkLayerFactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entities/link-layer/LinkLayerFactory */ "./dist/entities/link-layer/LinkLayerFactory.js");
/* harmony import */ var _entities_node_layer_NodeLayerModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entities/node-layer/NodeLayerModel */ "./dist/entities/node-layer/NodeLayerModel.js");
/* harmony import */ var _entities_node_layer_NodeLayerWidget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./entities/node-layer/NodeLayerWidget */ "./dist/entities/node-layer/NodeLayerWidget.js");
/* harmony import */ var _entities_node_layer_NodeLayerFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./entities/node-layer/NodeLayerFactory */ "./dist/entities/node-layer/NodeLayerFactory.js");
/* harmony import */ var _entities_node_NodeModel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./entities/node/NodeModel */ "./dist/entities/node/NodeModel.js");
/* harmony import */ var _entities_node_NodeWidget__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./entities/node/NodeWidget */ "./dist/entities/node/NodeWidget.js");
/* harmony import */ var _entities_port_PortModel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./entities/port/PortModel */ "./dist/entities/port/PortModel.js");
/* harmony import */ var _entities_port_PortWidget__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./entities/port/PortWidget */ "./dist/entities/port/PortWidget.js");
/* harmony import */ var _states_DefaultDiagramState__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./states/DefaultDiagramState */ "./dist/states/DefaultDiagramState.js");
/* harmony import */ var _states_DragDiagramItemsState__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./states/DragDiagramItemsState */ "./dist/states/DragDiagramItemsState.js");
/* harmony import */ var _states_DragNewLinkState__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./states/DragNewLinkState */ "./dist/states/DragNewLinkState.js");
/* harmony import */ var _DiagramEngine__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./DiagramEngine */ "./dist/DiagramEngine.js");




















})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map
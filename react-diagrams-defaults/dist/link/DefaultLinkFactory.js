"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.DefaultLinkFactory = void 0;
var React = require("react");
var DefaultLinkModel_1 = require("./DefaultLinkModel");
var DefaultLinkWidget_1 = require("./DefaultLinkWidget");
var styled_1 = require("@emotion/styled");
var react_canvas_core_1 = require("@projectstorm/react-canvas-core");
var react_1 = require("@emotion/react");
var S;
(function (S) {
    S.Keyframes = (0, react_1.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tfrom {\n\t\t\tstroke-dashoffset: 24;\n\t\t}\n\t\tto {\n\t\t\tstroke-dashoffset: 0;\n\t\t}\n\t"], ["\n\t\tfrom {\n\t\t\tstroke-dashoffset: 24;\n\t\t}\n\t\tto {\n\t\t\tstroke-dashoffset: 0;\n\t\t}\n\t"])));
    var selected = (0, react_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t stroke: #c9c9c9;\n\t"], ["\n\t\t stroke: #c9c9c9;\n\t"])));
    //se elimina animacion 
    // animation: ${Keyframes} 1s linear infinite;
    // stroke-dasharray: 10, 2;
    S.Path = styled_1.default.path(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t", ";\n\t\tfill: none;\n\t\tpointer-events: auto;\n\t"], ["\n\t\t", ";\n\t\tfill: none;\n\t\tpointer-events: auto;\n\t"])), function (p) { return p.selected && selected; });
})(S || (S = {}));
var DefaultLinkFactory = /** @class */ (function (_super) {
    __extends(DefaultLinkFactory, _super);
    function DefaultLinkFactory(type) {
        if (type === void 0) { type = 'default'; }
        return _super.call(this, type) || this;
    }
    DefaultLinkFactory.prototype.generateReactWidget = function (event) {
        return <DefaultLinkWidget_1.DefaultLinkWidget link={event.model} diagramEngine={this.engine}/>;
    };
    DefaultLinkFactory.prototype.generateModel = function (event) {
        return new DefaultLinkModel_1.DefaultLinkModel();
    };
    DefaultLinkFactory.prototype.generateLinkSegment = function (model, selected, path) {
        return (<S.Path selected={selected} stroke={selected ? model.getOptions().selectedColor : model.getOptions().color} strokeWidth={model.getOptions().width} d={path}/>);
    };
    return DefaultLinkFactory;
}(react_canvas_core_1.AbstractReactFactory));
exports.DefaultLinkFactory = DefaultLinkFactory;
var templateObject_1, templateObject_2, templateObject_3;

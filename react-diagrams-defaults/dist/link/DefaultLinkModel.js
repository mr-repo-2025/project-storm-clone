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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLinkModel = void 0;
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var DefaultLabelModel_1 = require("../label/DefaultLabelModel");
var geometry_1 = require("@projectstorm/geometry");
var DefaultLinkModel = /** @class */ (function (_super) {
    __extends(DefaultLinkModel, _super);
    function DefaultLinkModel(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, __assign({ type: 'default', width: options.width || 3, color: options.color || 'gray', selectedColor: options.selectedColor || 'rgb(0,192,255)', curvyness: 1 }, options)) || this;
    }
    DefaultLinkModel.prototype.calculateControlOffset = function (port) {
        if (port.getOptions().alignment === react_diagrams_core_1.PortModelAlignment.RIGHT) {
            return [this.options.curvyness, 0];
        }
        else if (port.getOptions().alignment === react_diagrams_core_1.PortModelAlignment.LEFT) {
            return [-this.options.curvyness, 0];
        }
        else if (port.getOptions().alignment === react_diagrams_core_1.PortModelAlignment.TOP) {
            return [0, -this.options.curvyness];
        }
        return [0, this.options.curvyness];
    };
    DefaultLinkModel.prototype.getSVGPath = function () {
        var _a, _b;
        if (this.points.length == 2) {
            var curve = new geometry_1.BezierCurve();
            curve.setSource(this.getFirstPoint().getPosition());
            curve.setTarget(this.getLastPoint().getPosition());
            curve.setSourceControl(this.getFirstPoint().getPosition().clone());
            curve.setTargetControl(this.getLastPoint().getPosition().clone());
            if (this.sourcePort) {
                (_a = curve.getSourceControl()).translate.apply(_a, this.calculateControlOffset(this.getSourcePort()));
            }
            if (this.targetPort) {
                (_b = curve.getTargetControl()).translate.apply(_b, this.calculateControlOffset(this.getTargetPort()));
            }
            return curve.getSVGCurve();
        }
    };
    DefaultLinkModel.prototype.serialize = function () {
        return __assign(__assign({}, _super.prototype.serialize.call(this)), { width: this.options.width, color: this.options.color, curvyness: this.options.curvyness, selectedColor: this.options.selectedColor });
    };
    DefaultLinkModel.prototype.deserialize = function (event) {
        _super.prototype.deserialize.call(this, event);
        this.options.color = event.data.color;
        this.options.width = event.data.width;
        this.options.curvyness = event.data.curvyness;
        this.options.selectedColor = event.data.selectedColor;
    };
    DefaultLinkModel.prototype.addLabel = function (label) {
        if (label instanceof react_diagrams_core_1.LabelModel) {
            return _super.prototype.addLabel.call(this, label);
        }
        var labelOb = new DefaultLabelModel_1.DefaultLabelModel();
        labelOb.setLabel(label);
        return _super.prototype.addLabel.call(this, labelOb);
    };
    DefaultLinkModel.prototype.setWidth = function (width) {
        this.options.width = width;
        this.fireEvent({ width: width }, 'widthChanged');
    };
    DefaultLinkModel.prototype.setColor = function (color) {
        this.options.color = color;
        this.fireEvent({ color: color }, 'colorChanged');
    };
    return DefaultLinkModel;
}(react_diagrams_core_1.LinkModel));
exports.DefaultLinkModel = DefaultLinkModel;

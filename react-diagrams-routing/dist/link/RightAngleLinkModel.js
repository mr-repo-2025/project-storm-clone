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
exports.RightAngleLinkModel = void 0;
var react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
var RightAngleLinkFactory_1 = require("./RightAngleLinkFactory");
var RightAngleLinkModel = /** @class */ (function (_super) {
    __extends(RightAngleLinkModel, _super);
    function RightAngleLinkModel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, __assign({ type: RightAngleLinkFactory_1.RightAngleLinkFactory.NAME }, options)) || this;
        _this.lastHoverIndexOfPath = 0;
        _this._lastPathXdirection = false;
        _this._firstPathXdirection = false;
        return _this;
    }
    RightAngleLinkModel.prototype.setFirstAndLastPathsDirection = function () {
        var points = this.getPoints();
        for (var i = 1; i < points.length; i += points.length - 2) {
            var dx = Math.abs(points[i].getX() - points[i - 1].getX());
            var dy = Math.abs(points[i].getY() - points[i - 1].getY());
            if (i - 1 === 0) {
                this._firstPathXdirection = dx > dy;
            }
            else {
                this._lastPathXdirection = dx > dy;
            }
        }
    };
    // @ts-ignore
    RightAngleLinkModel.prototype.addPoint = function (pointModel, index) {
        if (index === void 0) { index = 1; }
        // @ts-ignore
        _super.prototype.addPoint.call(this, pointModel, index);
        this.setFirstAndLastPathsDirection();
        return pointModel;
    };
    RightAngleLinkModel.prototype.deserialize = function (event) {
        _super.prototype.deserialize.call(this, event);
        this.setFirstAndLastPathsDirection();
    };
    RightAngleLinkModel.prototype.setManuallyFirstAndLastPathsDirection = function (first, last) {
        this._firstPathXdirection = first;
        this._lastPathXdirection = last;
    };
    RightAngleLinkModel.prototype.getLastPathXdirection = function () {
        return this._lastPathXdirection;
    };
    RightAngleLinkModel.prototype.getFirstPathXdirection = function () {
        return this._firstPathXdirection;
    };
    RightAngleLinkModel.prototype.setWidth = function (width) {
        this.options.width = width;
        this.fireEvent({ width: width }, 'widthChanged');
    };
    RightAngleLinkModel.prototype.setColor = function (color) {
        this.options.color = color;
        this.fireEvent({ color: color }, 'colorChanged');
    };
    return RightAngleLinkModel;
}(react_diagrams_defaults_1.DefaultLinkModel));
exports.RightAngleLinkModel = RightAngleLinkModel;

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
exports.DefaultLabelModel = void 0;
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var DefaultLabelModel = /** @class */ (function (_super) {
    __extends(DefaultLabelModel, _super);
    function DefaultLabelModel(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, __assign({ offsetY: options.offsetY == null ? -23 : options.offsetY, type: 'default' }, options)) || this;
    }
    DefaultLabelModel.prototype.setLabel = function (label) {
        this.options.label = label;
    };
    DefaultLabelModel.prototype.deserialize = function (event) {
        _super.prototype.deserialize.call(this, event);
        this.options.label = event.data.label;
    };
    DefaultLabelModel.prototype.serialize = function () {
        return __assign(__assign({}, _super.prototype.serialize.call(this)), { label: this.options.label });
    };
    return DefaultLabelModel;
}(react_diagrams_core_1.LabelModel));
exports.DefaultLabelModel = DefaultLabelModel;

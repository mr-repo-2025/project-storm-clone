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
exports.PathFindingLinkModel = void 0;
var PathFindingLinkFactory_1 = require("./PathFindingLinkFactory");
var react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
var PathFindingLinkModel = /** @class */ (function (_super) {
    __extends(PathFindingLinkModel, _super);
    function PathFindingLinkModel(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, __assign({ type: PathFindingLinkFactory_1.PathFindingLinkFactory.NAME }, options)) || this;
    }
    PathFindingLinkModel.prototype.performanceTune = function () {
        return false;
    };
    return PathFindingLinkModel;
}(react_diagrams_defaults_1.DefaultLinkModel));
exports.PathFindingLinkModel = PathFindingLinkModel;

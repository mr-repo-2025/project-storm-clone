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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPortFactory = void 0;
var DefaultPortModel_1 = require("./DefaultPortModel");
var react_canvas_core_1 = require("@projectstorm/react-canvas-core");
var DefaultPortFactory = /** @class */ (function (_super) {
    __extends(DefaultPortFactory, _super);
    function DefaultPortFactory() {
        return _super.call(this, 'default') || this;
    }
    DefaultPortFactory.prototype.generateModel = function () {
        return new DefaultPortModel_1.DefaultPortModel({
            name: 'unknown'
        });
    };
    return DefaultPortFactory;
}(react_canvas_core_1.AbstractModelFactory));
exports.DefaultPortFactory = DefaultPortFactory;

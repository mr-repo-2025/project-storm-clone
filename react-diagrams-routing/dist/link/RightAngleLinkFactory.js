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
exports.RightAngleLinkFactory = void 0;
var React = require("react");
var RightAngleLinkWidget_1 = require("./RightAngleLinkWidget");
var react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
var RightAngleLinkModel_1 = require("./RightAngleLinkModel");
/**
 * @author Daniel Lazar
 */
var RightAngleLinkFactory = /** @class */ (function (_super) {
    __extends(RightAngleLinkFactory, _super);
    function RightAngleLinkFactory() {
        return _super.call(this, RightAngleLinkFactory.NAME) || this;
    }
    RightAngleLinkFactory.prototype.generateModel = function (event) {
        return new RightAngleLinkModel_1.RightAngleLinkModel();
    };
    RightAngleLinkFactory.prototype.generateReactWidget = function (event) {
        return <RightAngleLinkWidget_1.RightAngleLinkWidget diagramEngine={this.engine} link={event.model} factory={this}/>;
    };
    RightAngleLinkFactory.NAME = 'rightAngle';
    return RightAngleLinkFactory;
}(react_diagrams_defaults_1.DefaultLinkFactory));
exports.RightAngleLinkFactory = RightAngleLinkFactory;

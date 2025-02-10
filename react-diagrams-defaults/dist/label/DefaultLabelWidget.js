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
exports.DefaultLabelWidget = void 0;
var React = require("react");
var styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.Label = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tbackground: rgba(0, 0, 0, 0.8);\n\t\tborder-radius: 5px;\n\t\tcolor: white;\n\t\tfont-size: 12px;\n\t\tpadding: 4px 8px;\n\t\tfont-family: sans-serif;\n\t\tuser-select: none;\n\t"], ["\n\t\tbackground: rgba(0, 0, 0, 0.8);\n\t\tborder-radius: 5px;\n\t\tcolor: white;\n\t\tfont-size: 12px;\n\t\tpadding: 4px 8px;\n\t\tfont-family: sans-serif;\n\t\tuser-select: none;\n\t"])));
})(S || (S = {}));
var DefaultLabelWidget = /** @class */ (function (_super) {
    __extends(DefaultLabelWidget, _super);
    function DefaultLabelWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultLabelWidget.prototype.render = function () {
        return <S.Label>{this.props.model.getOptions().label}</S.Label>;
    };
    return DefaultLabelWidget;
}(React.Component));
exports.DefaultLabelWidget = DefaultLabelWidget;
var templateObject_1;

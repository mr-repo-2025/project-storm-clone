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
exports.DefaultPortLabel = void 0;
var React = require("react");
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.PortLabel = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tdisplay: flex;\n\t\tmargin-top: 1px;\n\t\talign-items: center;\n\t"], ["\n\t\tdisplay: flex;\n\t\tmargin-top: 1px;\n\t\talign-items: center;\n\t"])));
    S.Label = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\tpadding: 0 5px;\n\t\tflex-grow: 1;\n\t"], ["\n\t\tpadding: 0 5px;\n\t\tflex-grow: 1;\n\t"])));
    S.Port = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\twidth: 15px;\n\t\theight: 15px;\n\t\tbackground: rgba(255, 255, 255, 0.1);\n\n\t\t&:hover {\n\t\t\tbackground: rgb(192, 255, 0);\n\t\t}\n\t"], ["\n\t\twidth: 15px;\n\t\theight: 15px;\n\t\tbackground: rgba(255, 255, 255, 0.1);\n\n\t\t&:hover {\n\t\t\tbackground: rgb(192, 255, 0);\n\t\t}\n\t"])));
})(S || (S = {}));
var DefaultPortLabel = /** @class */ (function (_super) {
    __extends(DefaultPortLabel, _super);
    function DefaultPortLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultPortLabel.prototype.render = function () {
        var port = (<react_diagrams_core_1.PortWidget engine={this.props.engine} port={this.props.port}>
				<S.Port />
			</react_diagrams_core_1.PortWidget>);
        var label = <S.Label>{this.props.port.getOptions().label}</S.Label>;
        return (<S.PortLabel>
				{this.props.port.getOptions().in ? port : label}
				{this.props.port.getOptions().in ? label : port}
			</S.PortLabel>);
    };
    return DefaultPortLabel;
}(React.Component));
exports.DefaultPortLabel = DefaultPortLabel;
var templateObject_1, templateObject_2, templateObject_3;

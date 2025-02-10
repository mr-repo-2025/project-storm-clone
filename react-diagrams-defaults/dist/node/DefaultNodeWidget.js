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
exports.DefaultNodeWidget = void 0;
var React = require("react");
var map_1 = require("lodash/map");
var DefaultPortLabelWidget_1 = require("../port/DefaultPortLabelWidget");
var styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.Node = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tbackground-color: ", ";\n\t\tborder-radius: 5px;\n\t\tfont-family: sans-serif;\n\t\tcolor: white;\n\t\tborder: solid 2px black;\n\t\toverflow: visible;\n\t\tfont-size: 11px;\n\t\tborder: solid 2px ", ";\n\t"], ["\n\t\tbackground-color: ", ";\n\t\tborder-radius: 5px;\n\t\tfont-family: sans-serif;\n\t\tcolor: white;\n\t\tborder: solid 2px black;\n\t\toverflow: visible;\n\t\tfont-size: 11px;\n\t\tborder: solid 2px ", ";\n\t"])), function (p) { return p.background; }, function (p) { return (p.selected ? 'rgb(0,192,255)' : 'black'); });
    S.Title = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\tbackground: rgba(0, 0, 0, 0.3);\n\t\tdisplay: flex;\n\t\twhite-space: nowrap;\n\t\tjustify-items: center;\n\t"], ["\n\t\tbackground: rgba(0, 0, 0, 0.3);\n\t\tdisplay: flex;\n\t\twhite-space: nowrap;\n\t\tjustify-items: center;\n\t"])));
    S.TitleName = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\tflex-grow: 1;\n\t\tpadding: 5px 5px;\n\t"], ["\n\t\tflex-grow: 1;\n\t\tpadding: 5px 5px;\n\t"])));
    S.Ports = styled_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\tdisplay: flex;\n\t\tbackground-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));\n\t"], ["\n\t\tdisplay: flex;\n\t\tbackground-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));\n\t"])));
    S.PortsContainer = styled_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t\tflex-grow: 1;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\n\t\t&:first-of-type {\n\t\t\tmargin-right: 10px;\n\t\t}\n\n\t\t&:only-child {\n\t\t\tmargin-right: 0px;\n\t\t}\n\t"], ["\n\t\tflex-grow: 1;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\n\t\t&:first-of-type {\n\t\t\tmargin-right: 10px;\n\t\t}\n\n\t\t&:only-child {\n\t\t\tmargin-right: 0px;\n\t\t}\n\t"])));
})(S || (S = {}));
/**
 * Default node that models the DefaultNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
var DefaultNodeWidget = /** @class */ (function (_super) {
    __extends(DefaultNodeWidget, _super);
    function DefaultNodeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.generatePort = function (port) {
            return <DefaultPortLabelWidget_1.DefaultPortLabel engine={_this.props.engine} port={port} key={port.getID()}/>;
        };
        return _this;
    }
    DefaultNodeWidget.prototype.render = function () {
        return (<S.Node data-default-node-name={this.props.node.getOptions().name} selected={this.props.node.isSelected()} background={this.props.node.getOptions().color}>
				<S.Title>
					<S.TitleName>{this.props.node.getOptions().name}</S.TitleName>
				</S.Title>
				<S.Ports>
					<S.PortsContainer>{(0, map_1.default)(this.props.node.getInPorts(), this.generatePort)}</S.PortsContainer>
					<S.PortsContainer>{(0, map_1.default)(this.props.node.getOutPorts(), this.generatePort)}</S.PortsContainer>
				</S.Ports>
			</S.Node>);
    };
    return DefaultNodeWidget;
}(React.Component));
exports.DefaultNodeWidget = DefaultNodeWidget;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

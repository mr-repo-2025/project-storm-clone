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
exports.DefaultLinkPointWidget = void 0;
var React = require("react");
var styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.PointTop = styled_1.default.circle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tpointer-events: all;\n\t"], ["\n\t\tpointer-events: all;\n\t"])));
})(S || (S = {}));
var DefaultLinkPointWidget = /** @class */ (function (_super) {
    __extends(DefaultLinkPointWidget, _super);
    function DefaultLinkPointWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selected: false
        };
        return _this;
    }
    DefaultLinkPointWidget.prototype.render = function () {
        var _this = this;
        var point = this.props.point;
        return (<g>
				<circle cx={point.getPosition().x} cy={point.getPosition().y} r={5} fill={this.state.selected || this.props.point.isSelected() ? this.props.colorSelected : this.props.color}/>
				<S.PointTop className="point" onMouseLeave={function () {
                _this.setState({ selected: false });
            }} onMouseEnter={function () {
                _this.setState({ selected: true });
            }} data-id={point.getID()} data-linkid={point.getLink().getID()} cx={point.getPosition().x} cy={point.getPosition().y} r={15} opacity={0.0}/>
			</g>);
    };
    return DefaultLinkPointWidget;
}(React.Component));
exports.DefaultLinkPointWidget = DefaultLinkPointWidget;
var templateObject_1;

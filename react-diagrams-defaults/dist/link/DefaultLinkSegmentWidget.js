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
exports.DefaultLinkSegmentWidget = void 0;
var React = require("react");
var DefaultLinkSegmentWidget = /** @class */ (function (_super) {
    __extends(DefaultLinkSegmentWidget, _super);
    function DefaultLinkSegmentWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultLinkSegmentWidget.prototype.render = function () {
        var _this = this;
        var Bottom = React.cloneElement(this.props.factory.generateLinkSegment(this.props.link, this.props.selected || this.props.link.isSelected(), this.props.path), {
            ref: this.props.forwardRef
        });
        var Top = React.cloneElement(Bottom, __assign(__assign({ strokeLinecap: 'round', onMouseLeave: function () {
                _this.props.onSelection(false);
            }, onMouseEnter: function () {
                _this.props.onSelection(true);
            } }, this.props.extras), { ref: null, 'data-linkid': this.props.link.getID(), strokeOpacity: this.props.selected ? 0.1 : 0, strokeWidth: 20, fill: 'none', onContextMenu: function () {
                if (!_this.props.link.isLocked()) {
                    event.preventDefault();
                    _this.props.link.remove();
                }
            } }));
        return (<g>
				{Bottom}
				{Top}
			</g>);
    };
    return DefaultLinkSegmentWidget;
}(React.Component));
exports.DefaultLinkSegmentWidget = DefaultLinkSegmentWidget;

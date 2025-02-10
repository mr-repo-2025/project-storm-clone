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
exports.DefaultPortModel = void 0;
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var DefaultLinkModel_1 = require("../link/DefaultLinkModel");
var DefaultPortModel = /** @class */ (function (_super) {
    __extends(DefaultPortModel, _super);
    function DefaultPortModel(options, name, label) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options;
        return _super.call(this, __assign({ label: options.label || options.name, alignment: options.in ? react_diagrams_core_1.PortModelAlignment.LEFT : react_diagrams_core_1.PortModelAlignment.RIGHT, type: 'default' }, options)) || this;
    }
    DefaultPortModel.prototype.deserialize = function (event) {
        _super.prototype.deserialize.call(this, event);
        this.options.in = event.data.in;
        this.options.label = event.data.label;
    };
    DefaultPortModel.prototype.serialize = function () {
        return __assign(__assign({}, _super.prototype.serialize.call(this)), { in: this.options.in, label: this.options.label });
    };
    DefaultPortModel.prototype.link = function (port, factory) {
        var link = this.createLinkModel(factory);
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    };
    DefaultPortModel.prototype.canLinkToPort = function (port) {
        if (port instanceof DefaultPortModel) {
            return this.options.in !== port.getOptions().in;
        }
        return true;
    };
    DefaultPortModel.prototype.createLinkModel = function (factory) {
        var link = _super.prototype.createLinkModel.call(this);
        if (!link && factory) {
            return factory.generateModel({});
        }
        return link || new DefaultLinkModel_1.DefaultLinkModel();
    };
    return DefaultPortModel;
}(react_diagrams_core_1.PortModel));
exports.DefaultPortModel = DefaultPortModel;

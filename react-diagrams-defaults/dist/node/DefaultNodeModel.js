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
exports.DefaultNodeModel = void 0;
var map_1 = require("lodash/map");
var react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
var DefaultPortModel_1 = require("../port/DefaultPortModel");
var DefaultNodeModel = /** @class */ (function (_super) {
    __extends(DefaultNodeModel, _super);
    function DefaultNodeModel(options, color) {
        if (options === void 0) { options = {}; }
        var _this = this;
        if (typeof options === 'string') {
            options = {
                name: options,
                color: color
            };
        }
        _this = _super.call(this, __assign({ type: 'default', name: 'Untitled', color: 'rgb(0,192,255)' }, options)) || this;
        _this.portsOut = [];
        _this.portsIn = [];
        return _this;
    }
    DefaultNodeModel.prototype.doClone = function (lookupTable, clone) {
        clone.portsIn = [];
        clone.portsOut = [];
        _super.prototype.doClone.call(this, lookupTable, clone);
    };
    DefaultNodeModel.prototype.removePort = function (port) {
        _super.prototype.removePort.call(this, port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        }
        else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    };
    DefaultNodeModel.prototype.addPort = function (port) {
        _super.prototype.addPort.call(this, port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                this.portsIn.push(port);
            }
        }
        else {
            if (this.portsOut.indexOf(port) === -1) {
                this.portsOut.push(port);
            }
        }
        return port;
    };
    DefaultNodeModel.prototype.addInPort = function (label, after) {
        if (after === void 0) { after = true; }
        var p = new DefaultPortModel_1.DefaultPortModel({
            in: true,
            name: label,
            label: label,
            alignment: react_diagrams_core_1.PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    };
    DefaultNodeModel.prototype.addOutPort = function (label, after) {
        if (after === void 0) { after = true; }
        var p = new DefaultPortModel_1.DefaultPortModel({
            in: false,
            name: label,
            label: label,
            alignment: react_diagrams_core_1.PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    };
    DefaultNodeModel.prototype.deserialize = function (event) {
        var _this = this;
        _super.prototype.deserialize.call(this, event);
        this.options.name = event.data.name;
        this.options.color = event.data.color;
        this.portsIn = (0, map_1.default)(event.data.portsInOrder, function (id) {
            return _this.getPortFromID(id);
        });
        this.portsOut = (0, map_1.default)(event.data.portsOutOrder, function (id) {
            return _this.getPortFromID(id);
        });
    };
    DefaultNodeModel.prototype.serialize = function () {
        return __assign(__assign({}, _super.prototype.serialize.call(this)), { name: this.options.name, color: this.options.color, portsInOrder: (0, map_1.default)(this.portsIn, function (port) {
                return port.getID();
            }), portsOutOrder: (0, map_1.default)(this.portsOut, function (port) {
                return port.getID();
            }) });
    };
    DefaultNodeModel.prototype.getInPorts = function () {
        return this.portsIn;
    };
    DefaultNodeModel.prototype.getOutPorts = function () {
        return this.portsOut;
    };
    return DefaultNodeModel;
}(react_diagrams_core_1.NodeModel));
exports.DefaultNodeModel = DefaultNodeModel;

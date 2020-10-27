"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicButtonEventType = exports.BasicButtonEvent = void 0;
var BasicButtonEvent = /** @class */ (function (_super) {
    __extends(BasicButtonEvent, _super);
    function BasicButtonEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.buttonValue = null;
        return _this;
    }
    BasicButtonEvent.prototype.clone = function () {
        var evt = new BasicButtonEvent(this.type, this.bubbles, this.cancelable);
        evt.index = this.index;
        evt.buttonValue = this.buttonValue;
        return evt;
    };
    BasicButtonEvent.prototype.toString = function () {
        return "BasicButtonEvent : " + "type = " + this.type;
    };
    return BasicButtonEvent;
}(createjs.Event));
exports.BasicButtonEvent = BasicButtonEvent;
var BasicButtonEventType;
(function (BasicButtonEventType) {
    BasicButtonEventType["SELECTED"] = "button_event_select";
    BasicButtonEventType["UNSELECTED"] = "button_event_unselected";
})(BasicButtonEventType = exports.BasicButtonEventType || (exports.BasicButtonEventType = {}));

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
exports.BasicRadioButton = void 0;
var BasicCheckButton_1 = require("./BasicCheckButton");
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
var BasicRadioButton = /** @class */ (function (_super) {
    __extends(BasicRadioButton, _super);
    function BasicRadioButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 現在のボタンの有効、無効状態を取得する。
     * ラジオボタンは選択中も操作が無効となる。
     * @return    ボタンが有効か否か
     */
    BasicRadioButton.prototype.checkActivity = function () {
        if (this._isSelect)
            return false;
        return _super.prototype.checkActivity.call(this);
    };
    return BasicRadioButton;
}(BasicCheckButton_1.BasicCheckButton));
exports.BasicRadioButton = BasicRadioButton;

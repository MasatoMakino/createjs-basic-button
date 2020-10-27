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
exports.BasicRadioButtonManager = void 0;
var BasicButtonEvent_1 = require("./BasicButtonEvent");
/**
 * 排他的に選択されるボタンを制御するクラスです。
 *
 * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。
 * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトの選択状態を変更します。
 * また、このクラスは変更内容をEventとして発信します。
 *
 * 利用する際には以下のような手順でインスタンス化してください。
 *
 * let btn:BasicRadioButton = new BasicRadioButton(...);
 * let manager:BasicRadioButtonManager = new BasicRadioButtonManager(); //インスタンス化
 * manager.addButton(btn);
 * manager.selected = btn; //デフォルトで選択されているボタンを指定
 */
var BasicRadioButtonManager = /** @class */ (function (_super) {
    __extends(BasicRadioButtonManager, _super);
    function BasicRadioButtonManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._buttons = [];
        _this._selected = null;
        return _this;
    }
    /**
     * ラジオボタンのグループにボタンを追加する。
     * @param {BasicRadioButton} button
     */
    BasicRadioButtonManager.prototype.add = function (button) {
        var _this = this;
        this._buttons.push(button);
        button.addEventListener(BasicButtonEvent_1.BasicButtonEventType.SELECTED, function (e) {
            var evt = e;
            _this.deselectOthers(evt.currentTarget);
        });
    };
    Object.defineProperty(BasicRadioButtonManager.prototype, "selected", {
        /**
         * 選択済みのボタンを取得する。
         * 選択されていない場合はnullを返す。
         * @returns {BasicRadioButton | null}
         */
        get: function () {
            return this._selected;
        },
        /**
         * ボタンを選択する。
         * nullを引数に取ると全ての選択を解除する。
         * @param {BasicRadioButton} selectedButton
         */
        set: function (selectedButton) {
            this._selected = selectedButton;
            if (selectedButton == null) {
                this.deselectAllButtons();
                return;
            }
            //選択されたボタンがこのインスタンスの管理下か確認する。
            var index = this._buttons.indexOf(selectedButton);
            if (index === -1) {
                console.warn("BasicRadioButtonManager : " +
                    "選択対象として指定されたボタンが、BasicRadioButtonManagerの管理下にありません。" +
                    "指定を行う前にaddButton関数でボタンをBasicRadioButtonManagerに登録してください。");
                return;
            }
            selectedButton.selectButton();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 指定されたボタン以外の選択を解除し、BasicRadioButtonManagerからSELECTEDイベントを発行する。
     * @param {BasicRadioButton} selectedButton
     * @param {boolean} isDispatchSelectEvent
     */
    BasicRadioButtonManager.prototype.deselectOthers = function (selectedButton, isDispatchSelectEvent) {
        if (isDispatchSelectEvent === void 0) { isDispatchSelectEvent = true; }
        this._selected = selectedButton;
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            if (btn != selectedButton) {
                btn.deselectButton();
            }
        }
        if (isDispatchSelectEvent) {
            var evt = new BasicButtonEvent_1.BasicButtonEvent(BasicButtonEvent_1.BasicButtonEventType.SELECTED);
            evt.buttonValue = this._selected.buttonValue;
            evt.index = this._buttons.indexOf(this._selected);
            this.dispatchEvent(evt);
        }
    };
    /**
     * 管理下の全てのボタンの選択を解除する。
     */
    BasicRadioButtonManager.prototype.deselectAllButtons = function () {
        this._selected = null;
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.deselectButton();
        }
        var evt = new BasicButtonEvent_1.BasicButtonEvent(BasicButtonEvent_1.BasicButtonEventType.UNSELECTED);
        this.dispatchEvent(evt);
    };
    BasicRadioButtonManager.prototype.disableAll = function () {
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.disableButton();
        }
    };
    BasicRadioButtonManager.prototype.disableMouseAll = function () {
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.mouseEnabled = false;
        }
    };
    BasicRadioButtonManager.prototype.enableAll = function () {
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.enableButton();
        }
    };
    BasicRadioButtonManager.prototype.enableMouseAll = function () {
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.mouseEnabled = true;
        }
    };
    Object.defineProperty(BasicRadioButtonManager.prototype, "selectedButtonValue", {
        /**
         * 現在選択されているボタンのbuttonValueを取得する。
         * 選択されたボタンがない場合はnullを返す。
         * @returns {any}
         */
        get: function () {
            var btn = this.selected;
            if (btn) {
                return btn.buttonValue;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasicRadioButtonManager.prototype, "buttons", {
        /**
         * このインスタンスで管理をしているラジオボタンの配列を取得する。
         * @returns {BasicRadioButton[]}
         */
        get: function () {
            return this._buttons;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * buttonValueを検索キーとして、該当するボタンを取得する。
     * 該当するボタンがない場合はnullを返す。
     *
     * @param value
     * @returns {BasicRadioButton | null}
     */
    BasicRadioButtonManager.prototype.getButton = function (value) {
        for (var _i = 0, _a = this._buttons; _i < _a.length; _i++) {
            var btn = _a[_i];
            if (btn.buttonValue === value &&
                btn.buttonValue != null &&
                btn.buttonValue != undefined) {
                return btn;
            }
        }
        return null;
    };
    return BasicRadioButtonManager;
}(createjs.EventDispatcher));
exports.BasicRadioButtonManager = BasicRadioButtonManager;

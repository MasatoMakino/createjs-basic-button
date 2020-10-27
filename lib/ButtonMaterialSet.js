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
exports.ButtonLabelColorSet = exports.ButtonMaterialSet = void 0;
var BasicButtonState_1 = require("./BasicButtonState");
var createjs_cache_util_1 = require("createjs-cache-util");
var ButtonOptionSet = /** @class */ (function () {
    function ButtonOptionSet() {
    }
    /**
     * stateに対応するオプション値を取り出す
     * @param set
     * @param state
     */
    ButtonOptionSet.getMaterial = function (set, state) {
        switch (state) {
            case BasicButtonState_1.BasicButtonState.DISABLE:
                return set.disable || set.normal;
            case BasicButtonState_1.BasicButtonState.NORMAL_OVER:
                return set.over || set.normal;
            case BasicButtonState_1.BasicButtonState.NORMAL_DOWN:
                return set.down || set.normal;
            case BasicButtonState_1.BasicButtonState.SELECT:
                return set.selectNormal || set.normal;
            case BasicButtonState_1.BasicButtonState.SELECT_OVER:
                return set.selectOver || set.normal;
            case BasicButtonState_1.BasicButtonState.SELECT_DOWN:
                return set.selectDown || set.normal;
            default:
                return set.normal;
        }
    };
    return ButtonOptionSet;
}());
/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 */
var ButtonMaterialSet = /** @class */ (function (_super) {
    __extends(ButtonMaterialSet, _super);
    function ButtonMaterialSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * ボタン上に状態パーツを配置する
     * @param {BasicClickButton} button
     * @param {ButtonMaterialSet} material
     */
    ButtonMaterialSet.addChild = function (button, material) {
        this.remove(material);
        var materials = this.getMaterialArray(material);
        for (var _i = 0, materials_1 = materials; _i < materials_1.length; _i++) {
            var mat = materials_1[_i];
            if (mat != null)
                button.addChild(mat);
        }
    };
    /**
     * この状態セットに含まれるパーツを表示ツリー上から削除する。
     * @param {ButtonMaterialSet} material
     */
    ButtonMaterialSet.remove = function (material) {
        var materials = this.getMaterialArray(material);
        for (var _i = 0, materials_2 = materials; _i < materials_2.length; _i++) {
            var mat = materials_2[_i];
            if (mat && mat.parent)
                mat.parent.removeChild(mat);
        }
    };
    /**
     * 全ての表示パーツを配列として取得する。
     * @param {ButtonMaterialSet} materials
     * @returns {createjs.DisplayObject[]}
     */
    ButtonMaterialSet.getMaterialArray = function (materials) {
        return [
            materials.normal,
            materials.over,
            materials.down,
            materials.disable,
            materials.selectNormal,
            materials.selectOver,
            materials.selectDown,
            materials.selectMarker
        ];
    };
    /**
     * 可視状態をstateに合わせて更新する
     * @param {ButtonMaterialSet} material
     * @param {BasicButtonState} state
     */
    ButtonMaterialSet.updateVisible = function (material, state) {
        this.invisibleAll(material);
        this.getMaterial(material, state).visible = true;
        if (material.selectMarker) {
            var isSelect = state === BasicButtonState_1.BasicButtonState.SELECT ||
                state === BasicButtonState_1.BasicButtonState.SELECT_OVER ||
                state === BasicButtonState_1.BasicButtonState.SELECT_DOWN;
            material.selectMarker.visible = isSelect;
        }
    };
    /**
     * 全てのパーツを不可視にする。
     * @param {ButtonMaterialSet} material
     */
    ButtonMaterialSet.invisibleAll = function (material) {
        var materials = this.getMaterialArray(material);
        for (var _i = 0, materials_3 = materials; _i < materials_3.length; _i++) {
            var mat = materials_3[_i];
            if (mat != null)
                mat.visible = false;
        }
    };
    return ButtonMaterialSet;
}(ButtonOptionSet));
exports.ButtonMaterialSet = ButtonMaterialSet;
/**
 * テキストラベルの色についてのオプション。
 * 各ボタンのaddLabel関数でインスタンスに渡す。
 */
var ButtonLabelColorSet = /** @class */ (function (_super) {
    __extends(ButtonLabelColorSet, _super);
    function ButtonLabelColorSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * ラベル文字色をボタン状態に応じて更新する。
     * @param {createjs.Text} field 更新対象ラベル
     * @param {ButtonLabelColorSet} colors 状態文字色セット
     * @param {BasicButtonState} state ボタン状態
     */
    ButtonLabelColorSet.update = function (field, colors, state) {
        if (field == null)
            return;
        var option = {
            color: this.getMaterial(colors, state)
        };
        createjs_cache_util_1.CreatejsCacheUtil.cacheText(field, field.text, option);
    };
    return ButtonLabelColorSet;
}(ButtonOptionSet));
exports.ButtonLabelColorSet = ButtonLabelColorSet;

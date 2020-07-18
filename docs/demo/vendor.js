(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor"],{

/***/ "./node_modules/createjs-cache-util/bin/createjs-text-cache.js":
/*!*********************************************************************!*\
  !*** ./node_modules/createjs-cache-util/bin/createjs-text-cache.js ***!
  \*********************************************************************/
/*! exports provided: CreatejsCacheUtil, CacheTextOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatejsCacheUtil\", function() { return CreatejsCacheUtil; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CacheTextOption\", function() { return CacheTextOption; });\nvar Shape = createjs.Shape;\nclass CreatejsCacheUtil {\n    /**\n     * フィルタ適用のためのキャッシュを生成する。\n     * @param target\n     * @param filters\n     * @param margin\n     * @param scale\n     * @param addHitArea\n     */\n    static setFilter(target, filters, margin = 8, scale = 1, addHitArea = false) {\n        target.filters = filters;\n        if (!target.bitmapCache) {\n            this.refreshCache(target, margin, scale, addHitArea);\n        }\n        else {\n            target.updateCache();\n        }\n    }\n    /**\n     * テキストオブジェクトのキャッシュと更新を行う。\n     * テキストに変化がない場合は処理をスキップする。\n     * @param {createjs.Text} target\n     * @param {string} value\n     * @param {CacheTextOption} option\n     */\n    static cacheText(target, value, option) {\n        if (!target)\n            return;\n        option = CacheTextOption.init(target, option);\n        if (!this.isNeedUpdate(target, value, option))\n            return;\n        //文字とカラーの更新\n        const currentText = target.text;\n        target.text = value;\n        target.color = option.color;\n        //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了\n        if (target.bitmapCache && currentText === value) {\n            target.updateCache();\n            return;\n        }\n        this.refreshCache(target, option.margin, option.scale, option.addHitArea);\n    }\n    /**\n     * 対象のディスプレイオブジェクトを、指定されたマージンの範囲でキャッシュする。\n     * キャッシュはupdateではなくuncacheを行い、キャッシュサイズも変更する。\n     *\n     * @param target\n     * @param margin\n     * @param scale\n     * @param addHitArea\n     */\n    static refreshCache(target, margin, scale, addHitArea) {\n        //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。\n        //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。\n        target.uncache();\n        const rect = this.getRect(target, margin);\n        //targetが空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。\n        if (rect == null)\n            return;\n        target.cache(rect.x, rect.y, rect.width, rect.height, scale);\n        if (addHitArea) {\n            CreatejsCacheUtil.addHitArea(target, rect);\n        }\n    }\n    /**\n     * キャッシュ用の座標を取得。\n     * @param target\n     * @param margin\n     */\n    static getRect(target, margin) {\n        const bounds = target.getBounds();\n        if (bounds == null)\n            return null;\n        return {\n            x: bounds.x - margin,\n            y: bounds.y - margin,\n            width: bounds.width + margin * 2,\n            height: bounds.height + margin * 2\n        };\n    }\n    static addHitArea(target, rect) {\n        const shape = new Shape();\n        shape.graphics\n            .beginFill(\"#000\")\n            .drawRect(rect.x, rect.y, rect.width, rect.height)\n            .endFill();\n        target.hitArea = shape;\n    }\n    /**\n     * キャッシュの更新が必要か否かを判定する。\n     * cacheText関数の内部処理。\n     *\n     * @param {createjs.Text} target\n     * @param {string} value\n     * @param {CacheTextOption} option\n     * @returns {boolean}\n     */\n    static isNeedUpdate(target, value, option) {\n        //キャッシュが行われていないなら強制的にキャッシュを更新。\n        if (!target.bitmapCache)\n            return true;\n        //状態が同一か確認\n        if (target.text !== value)\n            return true;\n        if (target.color !== option.color)\n            return true;\n        //スケール値が存在し、かつ同一かを確認\n        const cacheScale = target.bitmapCache.scale; //2019/05/03 bitmapCache.scaleプロパティは非公開である。将来的に取得できなくなる可能性がある。\n        if (cacheScale != null && cacheScale !== option.scale)\n            return true;\n        return false;\n    }\n}\n/**\n * CreatejsCacheUtil.cacheText関数のためのオプション。\n */\nclass CacheTextOption {\n    /**\n     * 不足している値をデフォルト値で埋める。\n     * @param {createjs.Text} target\n     * @param {CacheTextOption} option\n     * @returns {CacheTextOption}\n     */\n    static init(target, option) {\n        if (option == null)\n            option = {};\n        if (option.margin == null)\n            option.margin = 8;\n        if (!option.color)\n            option.color = target.color;\n        if (option.scale == null)\n            option.scale = 1;\n        if (option.addHitArea == null)\n            option.addHitArea = false;\n        return option;\n    }\n}\n\n\n//# sourceURL=webpack:///./node_modules/createjs-cache-util/bin/createjs-text-cache.js?");

/***/ })

}]);
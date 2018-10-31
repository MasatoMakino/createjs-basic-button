/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/BasicButton.js":
/*!****************************!*\
  !*** ./bin/BasicButton.js ***!
  \****************************/
/*! exports provided: BasicButtonEvent, BasicButtonEventType, BasicClickButton, ButtonMaterialSet, ButtonLabelColorSet, BasicButtonState, BasicCheckButton, BasicRadioButton, BasicRadioButtonManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicButtonEvent */ \"./bin/BasicButtonEvent.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicButtonEvent\", function() { return _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonEvent\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicButtonEventType\", function() { return _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonEventType\"]; });\n\n/* harmony import */ var _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicClickButton */ \"./bin/BasicClickButton.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicClickButton\", function() { return _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__[\"BasicClickButton\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ButtonMaterialSet\", function() { return _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__[\"ButtonMaterialSet\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ButtonLabelColorSet\", function() { return _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__[\"ButtonLabelColorSet\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicButtonState\", function() { return _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__[\"BasicButtonState\"]; });\n\n/* harmony import */ var _BasicCheckButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BasicCheckButton */ \"./bin/BasicCheckButton.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicCheckButton\", function() { return _BasicCheckButton__WEBPACK_IMPORTED_MODULE_2__[\"BasicCheckButton\"]; });\n\n/* harmony import */ var _BasicRadioButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BasicRadioButton */ \"./bin/BasicRadioButton.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicRadioButton\", function() { return _BasicRadioButton__WEBPACK_IMPORTED_MODULE_3__[\"BasicRadioButton\"]; });\n\n/* harmony import */ var _BasicRadioButtonManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BasicRadioButtonManager */ \"./bin/BasicRadioButtonManager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BasicRadioButtonManager\", function() { return _BasicRadioButtonManager__WEBPACK_IMPORTED_MODULE_4__[\"BasicRadioButtonManager\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./bin/BasicButton.js?");

/***/ }),

/***/ "./bin/BasicButtonEvent.js":
/*!*********************************!*\
  !*** ./bin/BasicButtonEvent.js ***!
  \*********************************/
/*! exports provided: BasicButtonEvent, BasicButtonEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicButtonEvent\", function() { return BasicButtonEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicButtonEventType\", function() { return BasicButtonEventType; });\nclass BasicButtonEvent extends createjs.Event {\n  constructor(type, bubbles = false, cancelable = false) {\n    super(type, bubbles, cancelable);\n    this.buttonValue = null;\n  }\n\n  clone() {\n    const evt = new BasicButtonEvent(this.type, this.bubbles, this.cancelable);\n    evt.index = this.index;\n    evt.buttonValue = this.buttonValue;\n    return evt;\n  }\n\n  toString() {\n    return \"BasicButtonEvent : \" + \"type = \" + this.type;\n  }\n\n}\nvar BasicButtonEventType;\n\n(function (BasicButtonEventType) {\n  BasicButtonEventType[\"SELECTED\"] = \"button_event_select\";\n  BasicButtonEventType[\"UNSELECTED\"] = \"button_event_unselected\";\n})(BasicButtonEventType || (BasicButtonEventType = {}));\n\n//# sourceURL=webpack:///./bin/BasicButtonEvent.js?");

/***/ }),

/***/ "./bin/BasicCheckButton.js":
/*!*********************************!*\
  !*** ./bin/BasicCheckButton.js ***!
  \*********************************/
/*! exports provided: BasicCheckButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicCheckButton\", function() { return BasicCheckButton; });\n/* harmony import */ var _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicClickButton */ \"./bin/BasicClickButton.js\");\n/* harmony import */ var _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicButtonEvent */ \"./bin/BasicButtonEvent.js\");\n\n\n/**\n * 選択状態を持つボタンクラス。\n */\n\nclass BasicCheckButton extends _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicClickButton\"] {\n  constructor() {\n    super(...arguments);\n    this.isSelect = false;\n  }\n  /**\n   * ボタンがmousedownされた際の処理。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  pressButton(evt) {\n    if (!this.checkActivity()) return;\n    this.isPressed = true;\n\n    if (this.isSelect) {\n      this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT_DOWN);\n    } else {\n      super.pressButton(evt);\n    }\n  }\n  /**\n   * ボタンがmouseupされた際の処理。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  releaseButton(evt) {\n    if (!this.checkActivity()) return;\n    if (!this.isPressed) return;\n    this.isPressed = false;\n    if (this.isSelect) this.deselectButton(evt);else this.selectButton(evt);\n  }\n  /**\n   * ボタンがmouseoverされた際の処理\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  overButton(evt) {\n    super.overButton(evt);\n    if (!this.checkActivity()) return;\n    const state = this.isSelect ? _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT_OVER : _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL_OVER;\n    this.updateMaterialVisible(state);\n  }\n\n  outButton(evt) {\n    super.outButton(evt);\n    if (!this.checkActivity()) return;\n    const state = this.isSelect ? _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT : _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL;\n    this.updateMaterialVisible(state);\n  }\n  /**\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  selectButton(evt) {\n    if (this.isSelect) return;\n    this.isSelect = true;\n\n    if (!this.isDisable) {\n      const state = this._isOver ? _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT_OVER : _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT;\n      this.updateMaterialVisible(state);\n    }\n\n    let buttonEvt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_1__[\"BasicButtonEvent\"](_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_1__[\"BasicButtonEventType\"].SELECTED);\n    buttonEvt.buttonValue = this.buttonValue;\n    this.dispatchEvent(buttonEvt);\n  }\n\n  deselectButton(evt) {\n    if (!this.isSelect) return;\n\n    if (!this.isDisable) {\n      const state = this._isOver ? _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL_OVER : _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL;\n      this.updateMaterialVisible(state);\n    }\n\n    this.isSelect = false;\n    let buttonEvt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_1__[\"BasicButtonEvent\"](_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_1__[\"BasicButtonEventType\"].UNSELECTED);\n    buttonEvt.buttonValue = this.buttonValue;\n    this.dispatchEvent(buttonEvt);\n  }\n  /**\n   * 選択状態を反転させる。\n   * ButtonEvent.SELECTは発行しない。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  reverseSelection(evt) {\n    this.isSelect = !this.isSelect;\n    if (this.isSelect) this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT);else this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL);\n  }\n  /**\n   * 選択状態の初期化のみを行う。\n   * ButtonEvent.SELECTは発行しない。\n   * @param {boolean} isSelect\n   */\n\n\n  initSelection(isSelect) {\n    this.isSelect = isSelect;\n    if (isSelect) this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT);else this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL);\n  }\n  /**\n   * ボタンを操作可能にする。\n   */\n\n\n  enableButton() {\n    this.isDisable = false;\n    if (this.isSelect) this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT);else super.enableButton();\n    this.enableMouseEvent();\n  }\n\n  getButtonState() {\n    if (this.isDisable) return _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].DISABLE;else {\n      if (this.isSelect) return _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].SELECT;else return _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonState\"].NORMAL;\n    }\n  }\n  /**\n   * 選択状態を取得する。\n   * @returns {boolean}\n   */\n\n\n  get selection() {\n    return this.isSelect;\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/BasicCheckButton.js?");

/***/ }),

/***/ "./bin/BasicClickButton.js":
/*!*********************************!*\
  !*** ./bin/BasicClickButton.js ***!
  \*********************************/
/*! exports provided: BasicClickButton, ButtonMaterialSet, ButtonLabelColorSet, BasicButtonState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicClickButton\", function() { return BasicClickButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ButtonMaterialSet\", function() { return ButtonMaterialSet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ButtonLabelColorSet\", function() { return ButtonLabelColorSet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicButtonState\", function() { return BasicButtonState; });\n/* harmony import */ var createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! createjs-cache-util */ \"./node_modules/createjs-cache-util/bin/createjs-text-cache.js\");\n\n/**\n * 基本ボタンクラス。\n * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。\n *\n * 正常動作のために、stageにenableMouseOverを実行する必要があります。\n * stageのインスタンス化のタイミングで実行してください。\n *  stage.enableMouseOver();\n */\n\nclass BasicClickButton extends createjs.Container {\n  /**\n   * コンストラクタ\n   */\n  constructor() {\n    super();\n    this.isDisable = false; //ボタンが使用不可状態か否か\n\n    this.isPressed = false; //ボタンが押されているか否か\n\n    this._isOver = false; //マウスオーバーしているか否か\n\n    this._buttonValue = null; //このボタンに割り当てられた値\n\n    /**\n     * ボタンを押す\n     * @param e\n     */\n\n    this.onPressButton = e => {\n      const evt = e;\n      this.pressButton(evt);\n    };\n    /**\n     * ボタンを離す\n     * @param e\n     */\n\n\n    this.onReleaseButton = e => {\n      const evt = e;\n      this.releaseButton(evt);\n    };\n    /**\n     * ボタンにマウスオーバーする\n     * @param e\n     */\n\n\n    this.onOverButton = e => {\n      const evt = e;\n      this.overButton(evt);\n    };\n    /**\n     * ボタンからマウスアウトする\n     * @param e\n     */\n\n\n    this.onOutButton = e => {\n      const evt = e;\n      this.outButton(evt);\n    }; //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。\n\n\n    this.mouseChildren = false;\n    this.cursor = \"pointer\";\n    this.setMouseEvents();\n    this.addEventListener(\"added\", e => {\n      if (!this.stage) return;\n      e.remove();\n      if (this.stage._mouseOverIntervalID != null) return;\n      console.warn(\"BasicButton : stageはmouseoverイベントを処理していません。\" + \"そのためボタンのマウスオーバー処理が正常に働いていません。\" + \"stage.enableMouseOver()を実行してからボタンを配置してください。\");\n    });\n  }\n  /**\n   * ボタンに対するマウスハンドリングを開始する。\n   */\n\n\n  setMouseEvents() {\n    this.addEventListener(\"mousedown\", this.onPressButton);\n    this.addEventListener(\"pressup\", this.onReleaseButton);\n    this.addEventListener(\"rollover\", this.onOverButton);\n    this.addEventListener(\"mouseout\", this.onOutButton);\n  }\n  /**\n   * ボタンに状態マテリアルを設定する。\n   * @param {ButtonMaterialSet} materials\n   */\n\n\n  initMaterial(materials) {\n    this.material = materials;\n    ButtonMaterialSet.addChild(this, materials);\n    this.updateMaterialVisible(this.getButtonState()); //テキストラベルがあったら最前線に。\n\n    if (this._labelField) {\n      this.removeChild(this._labelField);\n      this.addChild(this._labelField);\n    }\n  }\n\n  updateMaterialVisible(type) {\n    ButtonMaterialSet.updateVisible(this.material, type);\n    ButtonLabelColorSet.update(this._labelField, this.labelColors, type);\n  }\n\n  pressButton(evt) {\n    if (!this.checkActivity()) return;\n    this.isPressed = true;\n    this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);\n  }\n\n  releaseButton(evt) {\n    if (!this.checkActivity()) return;\n    if (!this.isPressed) return;\n    this.isPressed = false;\n    const state = this._isOver ? BasicButtonState.NORMAL_OVER : BasicButtonState.NORMAL;\n    this.updateMaterialVisible(state);\n  }\n\n  overButton(evt) {\n    this._isOver = true;\n    if (!this.checkActivity()) return;\n    this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);\n  }\n  /**\n   * ボタンからマウスアウトした際の処理。\n   * 状態と表示を更新する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  outButton(evt) {\n    this._isOver = false;\n    this.isPressed = false;\n    if (!this.checkActivity()) return;\n    this.updateMaterialVisible(BasicButtonState.NORMAL);\n  }\n  /**\n   * ボタンを非活性化する\n   */\n\n\n  disableButton() {\n    this.isDisable = true;\n    this.disableMouseEvent();\n    this.updateMaterialVisible(BasicButtonState.DISABLE);\n  }\n  /**\n   * ボタンを活性化する\n   */\n\n\n  enableButton() {\n    this.isDisable = false;\n    this.enableMouseEvent();\n    this.updateMaterialVisible(BasicButtonState.NORMAL);\n  }\n  /**\n   * ボタンのイベントリスナを有効にする\n   *   このメソッドではenableButton(),disableButton()と異なり\n   *   表示状態の変更は行われません。\n   */\n\n\n  enableMouseEvent() {\n    this.mouseEnabled = true;\n  }\n  /**\n   * ボタンのイベントリスナを無効にする\n   *   このメソッドではenableButton(),disableButton()と異なり\n   *   表示状態の変更は行われません。\n   */\n\n\n  disableMouseEvent() {\n    this.mouseEnabled = false;\n  }\n  /**\n   * 現在のボタンの有効、無効状態を取得する\n   * @return    ボタンが有効か否か\n   */\n\n\n  checkActivity() {\n    return !this.isDisable && this.mouseEnabled;\n  }\n  /**\n   * 現在のボタンの状態を取得する\n   * @return    定数STATE_*のいずれか\n   */\n\n\n  getButtonState() {\n    if (this.isDisable) return BasicButtonState.DISABLE;else return BasicButtonState.NORMAL;\n  }\n  /**\n   * ボタンラベルを初期化する。\n   * @param {number} x ラベル位置\n   * @param {number} y ラベル位置\n   * @param {string} label ラベルに表示する文言\n   * @param {string} font フォント設定 createjs.Textのfont指定に準じる。\n   * @param {ButtonLabelColorSet} color\n   * @param {string} textAlign\n   */\n\n\n  addLabel(x, y, label, font, color, textAlign) {\n    this.labelColors = color;\n    this._labelField = new createjs.Text(\"\", font, color.normal);\n    this._labelField.x = x;\n    this._labelField.y = y;\n    if (textAlign) this._labelField.textAlign = textAlign;\n    createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__[\"CreatejsCacheUtil\"].cacheText(this._labelField, label);\n    this.addChild(this._labelField);\n  }\n  /**\n   * ボタンラベルに表示されている文言を取得する。\n   * @returns {string}\n   */\n\n\n  get label() {\n    return this._label;\n  }\n  /**\n   * ボタンラベルの文言を更新する。\n   * @param {string} value\n   */\n\n\n  set label(value) {\n    this._label = value;\n\n    if (this._labelField) {\n      createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__[\"CreatejsCacheUtil\"].cacheText(this._labelField, value);\n    }\n  }\n\n  get isOver() {\n    return this._isOver;\n  }\n\n  get buttonValue() {\n    return this._buttonValue;\n  }\n\n  set buttonValue(value) {\n    if (this._buttonValue != value) {\n      this._buttonValue = value;\n    }\n  }\n\n}\n/**\n * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。\n */\n\nclass ButtonMaterialSet {\n  /**\n   * ボタン上に状態パーツを配置する\n   * @param {BasicClickButton} button\n   * @param {ButtonMaterialSet} material\n   */\n  static addChild(button, material) {\n    const materials = [material.normal, material.over, material.down, material.disable, material.selectNormal, material.selectOver, material.selectDown, material.selectMarker];\n\n    for (let mat of materials) {\n      if (mat == null) continue;\n      if (mat.parent) mat.parent.removeChild(mat);\n      button.addChild(mat);\n    }\n  }\n  /**\n   * 可視状態をstateに合わせて更新する\n   * @param {ButtonMaterialSet} material\n   * @param {BasicButtonState} state\n   */\n\n\n  static updateVisible(material, state) {\n    this.invisibleAll(material);\n    this.getMaterial(material, state).visible = true;\n\n    if (material.selectMarker) {\n      const isSelect = state === BasicButtonState.SELECT || state === BasicButtonState.SELECT_OVER || state === BasicButtonState.SELECT_DOWN;\n      material.selectMarker.visible = isSelect;\n    }\n  }\n  /**\n   * 全てのパーツを不可視にする。\n   * @param {ButtonMaterialSet} material\n   */\n\n\n  static invisibleAll(material) {\n    material.normal.visible = false;\n    if (material.over) material.over.visible = false;\n    if (material.down) material.down.visible = false;\n    if (material.disable) material.disable.visible = false;\n    if (material.selectNormal) material.selectNormal.visible = false;\n    if (material.selectOver) material.selectOver.visible = false;\n    if (material.selectDown) material.selectDown.visible = false;\n    if (material.selectMarker) material.selectMarker.visible = false;\n  }\n  /**\n   * stateに対応する状態パーツを取り出す\n   * @param {ButtonMaterialSet} material\n   * @param {BasicButtonState} state\n   * @returns {createjs.DisplayObject}\n   */\n\n\n  static getMaterial(material, state) {\n    switch (state) {\n      case BasicButtonState.DISABLE:\n        if (material.disable) return material.disable;\n        break;\n\n      case BasicButtonState.NORMAL_OVER:\n        if (material.over) return material.over;\n        break;\n\n      case BasicButtonState.NORMAL_DOWN:\n        if (material.down) return material.down;\n        break;\n\n      case BasicButtonState.SELECT:\n        if (material.selectNormal) return material.selectNormal;\n        break;\n\n      case BasicButtonState.SELECT_OVER:\n        if (material.selectOver) return material.selectOver;\n        break;\n\n      case BasicButtonState.SELECT_DOWN:\n        if (material.selectDown) return material.selectDown;\n        break;\n    }\n\n    return material.normal;\n  }\n\n}\n/**\n * テキストラベルの色についてのオプション。\n * 各ボタンのaddLabel関数でインスタンスに渡す。\n */\n\nclass ButtonLabelColorSet {\n  static update(field, colors, state) {\n    if (field == null) return;\n    const option = {\n      color: colors.normal\n    };\n\n    switch (state) {\n      case BasicButtonState.NORMAL_DOWN:\n        option.color = colors.down || colors.normal;\n        break;\n\n      case BasicButtonState.NORMAL_OVER:\n        option.color = colors.over || colors.normal;\n        break;\n\n      case BasicButtonState.DISABLE:\n        option.color = colors.disable || colors.normal;\n        break;\n\n      case BasicButtonState.SELECT:\n        option.color = colors.selectNormal || colors.normal;\n        break;\n\n      case BasicButtonState.SELECT_DOWN:\n        option.color = colors.selectDown || colors.normal;\n        break;\n\n      case BasicButtonState.SELECT_OVER:\n        option.color = colors.selectOver || colors.normal;\n        break;\n    }\n\n    createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__[\"CreatejsCacheUtil\"].cacheText(field, field.text, option);\n  }\n\n}\n/**\n * ボタン状態を表す定数\n */\n\nvar BasicButtonState;\n\n(function (BasicButtonState) {\n  BasicButtonState[\"NORMAL\"] = \"normal\";\n  BasicButtonState[\"NORMAL_OVER\"] = \"normal_over\";\n  BasicButtonState[\"NORMAL_DOWN\"] = \"normal_down\";\n  BasicButtonState[\"DISABLE\"] = \"disable\";\n  BasicButtonState[\"SELECT\"] = \"select\";\n  BasicButtonState[\"SELECT_OVER\"] = \"select_over\";\n  BasicButtonState[\"SELECT_DOWN\"] = \"select_down\";\n})(BasicButtonState || (BasicButtonState = {}));\n\n//# sourceURL=webpack:///./bin/BasicClickButton.js?");

/***/ }),

/***/ "./bin/BasicRadioButton.js":
/*!*********************************!*\
  !*** ./bin/BasicRadioButton.js ***!
  \*********************************/
/*! exports provided: BasicRadioButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicRadioButton\", function() { return BasicRadioButton; });\n/* harmony import */ var _BasicCheckButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicCheckButton */ \"./bin/BasicCheckButton.js\");\n/* harmony import */ var _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicClickButton */ \"./bin/BasicClickButton.js\");\n\n\n/**\n * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。\n */\n\nclass BasicRadioButton extends _BasicCheckButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicCheckButton\"] {\n  setManager(manager) {\n    this.manager = manager;\n  }\n\n  outButton(evt) {\n    super.outButton(evt); //マウスオーバーの解除のみはcheckActivityの判定にかかわらず行う。\n\n    if (!this.isDisable && this.isSelect) {\n      this.updateMaterialVisible(_BasicClickButton__WEBPACK_IMPORTED_MODULE_1__[\"BasicButtonState\"].SELECT);\n    }\n  }\n\n  checkActivity() {\n    if (this.isDisable) return false;\n    if (!this.mouseEnabled) return false;\n    if (this.isSelect) return false;\n    return true;\n  }\n\n  selectButton(evt) {\n    super.selectButton();\n    this.manager.deselectOthers(this);\n  }\n\n  initSelection(isSelect) {\n    super.initSelection(isSelect);\n    if (isSelect) this.manager.deselectOthers(this, false);\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/BasicRadioButton.js?");

/***/ }),

/***/ "./bin/BasicRadioButtonManager.js":
/*!****************************************!*\
  !*** ./bin/BasicRadioButtonManager.js ***!
  \****************************************/
/*! exports provided: BasicRadioButtonManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BasicRadioButtonManager\", function() { return BasicRadioButtonManager; });\n/* harmony import */ var _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicButtonEvent */ \"./bin/BasicButtonEvent.js\");\n\n/**\n * 排他的に選択されるボタンを制御するクラスです。\n *\n * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。\n * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトの選択状態を変更します。\n * また、このクラスは変更内容をEventとして発信します。\n *\n * 利用する際には以下のような手順でインスタンス化してください。\n *\n *\tlet manager:BasicRadioButtonManager = new BasicRadioButtonManager(); //インスタンス化\n *\t(BasicRadioButton).selectButton(); //デフォルトで選択されているボタンを指定\n */\n\nclass BasicRadioButtonManager extends createjs.EventDispatcher {\n  constructor() {\n    super();\n    this._buttons = [];\n  }\n\n  addButton(button) {\n    this._buttons.push(button);\n\n    button.setManager(this);\n  }\n  /**\n   * 初期選択ボタンを指定する。\n   * BasicButtonEventを返さないので、ラジオボタンの状態を\n   * イベントを発行せずに整える用途にも使用できる。\n   * nullを引数に取ると全ての選択を解除する。\n   * @param selectedButton\n   */\n\n\n  initSelection(selectedButton) {\n    this.selected = selectedButton;\n\n    for (let btn of this._buttons) {\n      btn.initSelection(selectedButton === btn);\n    }\n  }\n\n  deselectOthers(selectedButton, isDispatchSelectEvent = true) {\n    this.selected = selectedButton;\n\n    for (let btn of this._buttons) {\n      if (btn != selectedButton) {\n        btn.deselectButton();\n      }\n    }\n\n    if (isDispatchSelectEvent) {\n      let evt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonEvent\"](_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonEventType\"].SELECTED);\n      evt.buttonValue = this.selected.buttonValue;\n      evt.index = this._buttons.indexOf(this.selected);\n      this.dispatchEvent(evt);\n    }\n  }\n\n  deselectAllButtons() {\n    this.selected = undefined;\n\n    for (let btn of this._buttons) {\n      btn.deselectButton();\n    }\n\n    let evt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonEvent\"](_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__[\"BasicButtonEventType\"].UNSELECTED);\n    this.dispatchEvent(evt);\n  }\n\n  disableAll() {\n    for (let btn of this._buttons) {\n      btn.disableButton();\n    }\n  }\n\n  disableMouseAll() {\n    for (let btn of this._buttons) {\n      btn.disableMouseEvent();\n    }\n  }\n\n  enableAll() {\n    for (let btn of this._buttons) {\n      btn.enableButton();\n    }\n  }\n\n  enableMouseAll() {\n    for (let btn of this._buttons) {\n      btn.enableMouseEvent();\n    }\n  }\n\n  getSelectedButton() {\n    return this.selected;\n  }\n\n  getButtonValue() {\n    const btn = this.getSelectedButton();\n\n    if (btn) {\n      return btn.buttonValue;\n    }\n\n    return null;\n  }\n\n  refreshButtons(value) {\n    for (let btn of this._buttons) {\n      if (btn.buttonValue === value) {\n        btn.selectButton();\n      }\n    }\n  }\n\n  get buttons() {\n    return this._buttons;\n  }\n  /**\n   * buttonValueを検索キーとして、該当するボタンを取得する。\n   * 該当するボタンがない場合はnullを返す。\n   *\n   * @param value\n   * @returns {BasicRadioButton | null}\n   */\n\n\n  getButton(value) {\n    for (let btn of this._buttons) {\n      if (btn.buttonValue === value && btn.buttonValue != null && btn.buttonValue != undefined) {\n        return btn;\n      }\n    }\n\n    return null;\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/BasicRadioButtonManager.js?");

/***/ }),

/***/ "./docs/demo/main.js":
/*!***************************!*\
  !*** ./docs/demo/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bin_BasicButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bin/BasicButton */ \"./bin/BasicButton.js\");\n\nlet stage;\n\nconst onDomContentsLoaded = () => {\n  //ステージ更新処理\n  const updateStage = () => {\n    stage.update();\n  }; //stageの初期化\n\n\n  const canvas = document.getElementById(\"appCanvas\");\n  stage = new createjs.Stage(canvas);\n  stage.enableMouseOver();\n  console.log(stage._mouseOverIntervalID);\n  createjs.Ticker.on(\"tick\", updateStage);\n  testButton();\n  testCheckButton();\n  testRadioButtons();\n};\n\nconst getMaterial = color => {\n  const mat = new createjs.Shape();\n  const g = mat.graphics;\n  g.beginFill(color);\n  g.drawRect(0, 0, 64, 32);\n  g.endFill();\n  return mat;\n};\n\nconst getMaterialSet = () => {\n  return {\n    normal: getMaterial(\"#0f0\"),\n    over: getMaterial(\"#6f6\"),\n    down: getMaterial(\"#f0f\"),\n    disable: getMaterial(\"#666\"),\n    selectNormal: getMaterial(\"#0ff\"),\n    selectOver: getMaterial(\"#6ff\"),\n    selectDown: getMaterial(\"#f8f\")\n  };\n};\n\nconst testButton = () => {\n  const testButton = new _bin_BasicButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicClickButton\"]();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = 180;\n  testButton.y = 180;\n  stage.addChild(testButton);\n  testButton.addEventListener(\"click\", e => {\n    console.log(e);\n  });\n};\n\nconst testCheckButton = () => {\n  const testButton = new _bin_BasicButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicCheckButton\"]();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = 360;\n  testButton.y = 180;\n  stage.addChild(testButton);\n  testButton.addEventListener(\"click\", e => {\n    console.log(e);\n  });\n};\n\nconst getRadioButton = (x, value) => {\n  const testButton = new _bin_BasicButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicRadioButton\"]();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = x;\n  testButton.y = 360;\n  stage.addChild(testButton);\n  return testButton;\n};\n\nconst testRadioButtons = () => {\n  const manager = new _bin_BasicButton__WEBPACK_IMPORTED_MODULE_0__[\"BasicRadioButtonManager\"]();\n  manager.addButton(getRadioButton(180 * 1, \"button01\"));\n  manager.addButton(getRadioButton(180 * 2, \"button02\"));\n  manager.addButton(getRadioButton(180 * 3, \"button03\"));\n  manager.buttons[0].initSelection(true);\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack:///./docs/demo/main.js?");

/***/ }),

/***/ "./node_modules/createjs-cache-util/bin/createjs-text-cache.js":
/*!*********************************************************************!*\
  !*** ./node_modules/createjs-cache-util/bin/createjs-text-cache.js ***!
  \*********************************************************************/
/*! exports provided: CreatejsCacheUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CreatejsCacheUtil\", function() { return CreatejsCacheUtil; });\nclass CreatejsCacheUtil {\n  /**\n   * フィルタ適用のためのキャッシュを生成する。\n   * @param {createjs.DisplayObject} target\n   * @param {createjs.Filter[]} filters\n   * @param {number} margin\n   */\n  static setFilter(target, filters, margin = 8) {\n    target.filters = filters;\n\n    if (!target.cacheCanvas) {\n      const bounds = target.getBounds();\n      target.cache(bounds.x - margin, bounds.y - margin, bounds.width + margin * 2, bounds.height + margin * 2);\n    } else {\n      target.updateCache();\n    }\n  }\n  /**\n   * テキストオブジェクトのキャッシュと更新を行う。\n   * テキストに変化がない場合は処理をスキップする。\n   * @param {createjs.Text} target\n   * @param {string} value\n   * @param option オプション　marginはテキスト周囲のキャッシュのマージンサイズ colorはテキスト色\n   */\n\n\n  static cacheText(target, value, option) {\n    if (!target) return false; //optionのデフォルト値を追加。\n\n    if (!option) {\n      option = {};\n    }\n\n    if (!option.margin) {\n      option.margin = 8;\n    }\n\n    if (!option.color) {\n      option.color = target.color;\n    } //状態が同一か確認\n\n\n    let isSame = true;\n    const isSameString = target.text === value;\n    if (!isSameString) isSame = false;\n\n    if (target.color !== option.color) {\n      isSame = false;\n    }\n\n    if (isSame) {\n      //状態が全く同じなら更新をせずに終了\n      return false;\n    } //文字とカラーの更新\n\n\n    target.text = value;\n\n    if (target.color !== option.color) {\n      target.color = option.color;\n    } //すでにキャッシュ済みで同じ文字列を入力するならキャッシュの更新で終了\n\n\n    if (target.cacheCanvas && isSameString) {\n      target.updateCache();\n      return true;\n    } //キャッシュのサイズ更新が必要な場合はアンキャッシュを行う。\n    //アンキャッシュ前にgetBoundsを呼ぶと、変更済みのサイズではなくキャッシュのバウンディングボックスが返ってくるため。\n\n\n    target.uncache();\n    const bounds = target.getBounds(); //空文字などサイズが計測不能な場合はキャッシュするのを諦めて処理を中断。\n\n    if (bounds === null || bounds === undefined) {\n      if (target.cacheCanvas) {\n        target.uncache();\n      }\n\n      return false;\n    } //文言が異なる場合は再キャッシュ。\n\n\n    target.cache(bounds.x - option.margin, bounds.y - option.margin, bounds.width + option.margin * 2, bounds.height + option.margin * 2);\n    return true;\n  }\n\n}\n\n//# sourceURL=webpack:///./node_modules/createjs-cache-util/bin/createjs-text-cache.js?");

/***/ })

/******/ });
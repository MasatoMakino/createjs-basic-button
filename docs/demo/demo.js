/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./esm/index.js\");\n\nlet stage;\n\nconst onDomContentsLoaded = () => {\n  //ステージ更新処理\n  const updateStage = () => {\n    stage.update();\n  }; //stageの初期化\n\n\n  const canvas = document.getElementById(\"appCanvas\");\n  stage = new createjs.Stage(canvas);\n  stage.enableMouseOver();\n  console.log(stage._mouseOverIntervalID);\n  createjs.Ticker.on(\"tick\", updateStage);\n  testButton();\n  testCheckButton();\n  testDisableButton();\n  testFrozenButton();\n  testRadioButtons();\n  testRadioMarkerButtons();\n  testRadioLabelButtons();\n};\n\nconst getMaterial = color => {\n  const mat = new createjs.Shape();\n  const g = mat.graphics;\n  g.beginFill(color);\n  g.drawRect(0, 0, 64, 32);\n  g.endFill();\n  return mat;\n};\n\nconst getMaterialSet = marker => {\n  const mat = {\n    normal: getMaterial(\"#0f0\"),\n    over: getMaterial(\"#6f6\"),\n    down: getMaterial(\"#f0f\"),\n    disable: getMaterial(\"#666\"),\n    selectNormal: getMaterial(\"#0ff\"),\n    selectOver: getMaterial(\"#6ff\"),\n    selectDown: getMaterial(\"#f8f\")\n  };\n\n  if (marker != null) {\n    mat.selectMarker = marker;\n  }\n\n  return mat;\n};\n\nconst testButton = () => {\n  const testButton = new ___WEBPACK_IMPORTED_MODULE_0__.BasicClickButton();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = 180;\n  testButton.y = 180;\n  stage.addChild(testButton);\n  testButton.addEventListener(\"click\", e => {\n    console.log(e);\n  });\n};\n\nconst testCheckButton = () => {\n  const testButton = new ___WEBPACK_IMPORTED_MODULE_0__.BasicCheckButton();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = 180 * 2;\n  testButton.y = 180;\n  addLabel(testButton, \"C\");\n  addLabel(testButton, \"CCCC\", 24);\n  stage.addChild(testButton);\n  testButton.addEventListener(\"click\", e => {\n    console.log(e);\n  });\n};\n\nconst testDisableButton = () => {\n  const testButton = new ___WEBPACK_IMPORTED_MODULE_0__.BasicCheckButton();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = 180 * 3;\n  testButton.y = 180;\n  stage.addChild(testButton);\n  addLabel(testButton, \"D\");\n  testButton.disableButton();\n  testButton.addEventListener(\"click\", e => {\n    console.log(e);\n  });\n};\n\nconst testFrozenButton = () => {\n  const testButton = new ___WEBPACK_IMPORTED_MODULE_0__.BasicCheckButton();\n  testButton.initMaterial(getMaterialSet());\n  testButton.x = 180 * 4;\n  testButton.y = 180;\n  addLabel(testButton, \"frozen\");\n  stage.addChild(testButton);\n  testButton.selectButton();\n  testButton.frozen = true;\n  testButton.frozen = false;\n  testButton.frozen = true;\n  testButton.addEventListener(\"click\", e => {\n    console.log(e);\n  });\n};\n\nconst getRadioButton = (x, value, y, marker) => {\n  if (y == null) y = 360;\n  const testButton = new ___WEBPACK_IMPORTED_MODULE_0__.BasicRadioButton();\n  const matSet = getMaterialSet(marker);\n  testButton.initMaterial(matSet);\n  testButton.x = x;\n  testButton.y = y;\n  testButton.buttonValue = value;\n  stage.addChild(testButton);\n  return testButton;\n};\n\nconst testRadioButtons = () => {\n  const manager = new ___WEBPACK_IMPORTED_MODULE_0__.BasicRadioButtonManager();\n  manager.add(getRadioButton(180 * 1, \"button01\"));\n  manager.add(getRadioButton(180 * 2, \"button02\"));\n  manager.add(getRadioButton(180 * 3, \"button03\")); //複数回initSelectionを行っても問題ないか確認。\n\n  manager.selected = manager.buttons[0];\n  manager.selected = null;\n  manager.selected = manager.buttons[1];\n  manager.selected = manager.buttons[2];\n  manager.addEventListener(___WEBPACK_IMPORTED_MODULE_0__.BasicButtonEventType.SELECTED, e => {\n    const evt = e;\n    console.log(evt.buttonValue);\n  });\n};\n\nconst getMarker = () => {\n  const shape = new createjs.Shape();\n  shape.graphics.beginFill(\"#F00\").drawCircle(0, 0, 8).endFill();\n  return shape;\n};\n\nconst testRadioMarkerButtons = () => {\n  const manager = new ___WEBPACK_IMPORTED_MODULE_0__.BasicRadioButtonManager();\n  manager.add(getRadioButton(180 * 1, \"button01\", 480, getMarker()));\n  manager.add(getRadioButton(180 * 2, \"button02\", 480, getMarker()));\n  manager.add(getRadioButton(180 * 3, \"button03\", 480, getMarker()));\n  manager.selected = manager.buttons[0];\n};\n\nconst testRadioLabelButtons = () => {\n  const manager = new ___WEBPACK_IMPORTED_MODULE_0__.BasicRadioButtonManager();\n  manager.add(getRadioButton(180 * 1, \"button01\", 560, getMarker()));\n  manager.add(getRadioButton(180 * 2, \"button02\", 560, getMarker()));\n  manager.add(getRadioButton(180 * 3, \"button03\", 560, getMarker()));\n\n  for (let btn of manager.buttons) {\n    addLabel(btn, btn.buttonValue);\n  }\n\n  manager.selected = manager.buttons[0];\n};\n\nconst addLabel = (btn, label, y) => {\n  if (y == null) {\n    y = 32 / 2;\n  }\n\n  btn.addLabel(64 / 2, y, label, \"16px sans\", getLabelColors(), \"center\");\n};\n\nconst getLabelColors = () => {\n  const colors = {\n    normal: \"#111\",\n    over: \"#333\",\n    down: \"#222\",\n    disable: \"#888\",\n    selectNormal: \"#22f\",\n    selectOver: \"#44f\",\n    selectDown: \"#99f\"\n  };\n  return colors;\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack://createjs-basic-button/./demoSrc/demo.js?");

/***/ }),

/***/ "./esm/BasicButtonEvent.js":
/*!*********************************!*\
  !*** ./esm/BasicButtonEvent.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicButtonEvent\": () => (/* binding */ BasicButtonEvent),\n/* harmony export */   \"BasicButtonEventType\": () => (/* binding */ BasicButtonEventType)\n/* harmony export */ });\nclass BasicButtonEvent extends createjs.Event {\n  constructor(type, bubbles = false, cancelable = false) {\n    super(type, bubbles, cancelable);\n    this.buttonValue = null;\n  }\n\n  clone() {\n    const evt = new BasicButtonEvent(this.type, this.bubbles, this.cancelable);\n    evt.index = this.index;\n    evt.buttonValue = this.buttonValue;\n    return evt;\n  }\n\n  toString() {\n    return \"BasicButtonEvent : \" + \"type = \" + this.type;\n  }\n\n}\nvar BasicButtonEventType;\n\n(function (BasicButtonEventType) {\n  BasicButtonEventType[\"SELECTED\"] = \"button_event_select\";\n  BasicButtonEventType[\"UNSELECTED\"] = \"button_event_unselected\";\n})(BasicButtonEventType || (BasicButtonEventType = {}));\n\n//# sourceURL=webpack://createjs-basic-button/./esm/BasicButtonEvent.js?");

/***/ }),

/***/ "./esm/BasicButtonState.js":
/*!*********************************!*\
  !*** ./esm/BasicButtonState.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicButtonState\": () => (/* binding */ BasicButtonState)\n/* harmony export */ });\n/**\n * ボタン状態を表す定数\n */\nvar BasicButtonState;\n\n(function (BasicButtonState) {\n  BasicButtonState[\"NORMAL\"] = \"normal\";\n  BasicButtonState[\"NORMAL_OVER\"] = \"normal_over\";\n  BasicButtonState[\"NORMAL_DOWN\"] = \"normal_down\";\n  BasicButtonState[\"DISABLE\"] = \"disable\";\n  BasicButtonState[\"SELECT\"] = \"select\";\n  BasicButtonState[\"SELECT_OVER\"] = \"select_over\";\n  BasicButtonState[\"SELECT_DOWN\"] = \"select_down\";\n})(BasicButtonState || (BasicButtonState = {}));\n\n//# sourceURL=webpack://createjs-basic-button/./esm/BasicButtonState.js?");

/***/ }),

/***/ "./esm/BasicCheckButton.js":
/*!*********************************!*\
  !*** ./esm/BasicCheckButton.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicCheckButton\": () => (/* binding */ BasicCheckButton)\n/* harmony export */ });\n/* harmony import */ var _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicClickButton */ \"./esm/BasicClickButton.js\");\n/* harmony import */ var _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicButtonState */ \"./esm/BasicButtonState.js\");\n/* harmony import */ var _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BasicButtonEvent */ \"./esm/BasicButtonEvent.js\");\n\n\n\n/**\n * 選択状態を持つボタンクラス。\n */\n\nclass BasicCheckButton extends _BasicClickButton__WEBPACK_IMPORTED_MODULE_0__.BasicClickButton {\n  constructor() {\n    super(...arguments);\n    this._isSelect = false;\n  }\n\n  pressButton(evt) {\n    if (!this.checkActivity()) return;\n    this.isPressed = true;\n    const state = this._isSelect ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT_DOWN : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL_DOWN;\n    this.updateMaterialVisible(state);\n  }\n\n  releaseButton(evt) {\n    if (!this.checkActivity()) return;\n    if (!this.isPressed) return;\n    this.isPressed = false;\n    if (this._isSelect) this.deselectButton(evt);else this.selectButton(evt);\n  }\n\n  overButton(evt) {\n    super.overButton(evt);\n    if (!this.checkActivity()) return;\n    const state = this._isSelect ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT_OVER : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL_OVER;\n    this.updateMaterialVisible(state);\n  }\n\n  outButton(evt) {\n    super.outButton(evt);\n\n    if (!this.isDisable) {\n      const state = this._isSelect ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL;\n      this.updateMaterialVisible(state);\n    }\n\n    if (!this.checkActivity()) return;\n  }\n  /**\n   * ボタンを選択する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  selectButton(evt) {\n    if (this._isSelect) return;\n    this._isSelect = true;\n\n    if (!this.isDisable) {\n      const state = this.isOver ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT_OVER : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT;\n      this.updateMaterialVisible(state);\n    }\n\n    const buttonEvt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_2__.BasicButtonEvent(_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_2__.BasicButtonEventType.SELECTED);\n    buttonEvt.buttonValue = this.buttonValue;\n    this.dispatchEvent(buttonEvt);\n  }\n  /**\n   * ボタンの選択を解除する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  deselectButton(evt) {\n    if (!this._isSelect) return;\n\n    if (!this.isDisable) {\n      const state = this.isOver ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL_OVER : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL;\n      this.updateMaterialVisible(state);\n    }\n\n    this._isSelect = false;\n    const buttonEvt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_2__.BasicButtonEvent(_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_2__.BasicButtonEventType.UNSELECTED);\n    buttonEvt.buttonValue = this.buttonValue;\n    this.dispatchEvent(buttonEvt);\n  }\n\n  enableButton() {\n    super.enableButton();\n    const state = this._isSelect ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL;\n    this.updateMaterialVisible(state);\n  }\n\n  getButtonState() {\n    if (this.isDisable) return _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.DISABLE;else {\n      if (this._isSelect) return _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.SELECT;else return _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL;\n    }\n  }\n  /**\n   * 選択状態を取得する。\n   * @returns {boolean}\n   */\n\n\n  get selection() {\n    return this._isSelect;\n  }\n\n}\n\n//# sourceURL=webpack://createjs-basic-button/./esm/BasicCheckButton.js?");

/***/ }),

/***/ "./esm/BasicClickButton.js":
/*!*********************************!*\
  !*** ./esm/BasicClickButton.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicClickButton\": () => (/* binding */ BasicClickButton)\n/* harmony export */ });\n/* harmony import */ var createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! createjs-cache-util */ \"./node_modules/createjs-cache-util/bin/createjs-text-cache.js\");\n/* harmony import */ var _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicButtonState */ \"./esm/BasicButtonState.js\");\n/* harmony import */ var _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonMaterialSet */ \"./esm/ButtonMaterialSet.js\");\n\n\n\nvar Shape = createjs.Shape;\n/**\n * 基本ボタンクラス。\n * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。\n *\n * 正常動作のために、stageにenableMouseOverを実行する必要があります。\n * stageのインスタンス化のタイミングで実行してください。\n *  stage.enableMouseOver();\n */\n\nclass BasicClickButton extends createjs.Container {\n  /**\n   * コンストラクタ\n   * @param {ButtonMaterialSet} materials 状態セット\n   */\n  constructor(materials) {\n    super();\n    this.isDisable = false; //ボタンが使用不可状態か否か\n\n    this.isPressed = false; //ボタンが押されているか否か\n\n    this.isOver = false; //マウスオーバーしているか否か\n\n    /**\n     * ボタンの凍結状態。\n     * trueに設定すると、ボタンの状態と外見を維持したまま、マウス操作を無視する。\n     */\n\n    this._frozen = false;\n    this._buttonValue = null; //このボタンに割り当てられた値\n\n    /*ボタンラベル*/\n\n    this._labelField = []; //ラベル表示用のテキストフィールド\n\n    this.labelColors = []; //ラベルの色のセット。各状態のラベルの文字色を格納する。\n    //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。\n\n    this.mouseChildren = false;\n    this.cursor = \"pointer\";\n    this.setMouseEvents();\n    this.addEventListener(\"added\", e => {\n      if (!this.stage) return;\n      e.remove();\n      if (this.stage._mouseOverIntervalID != null) return;\n      console.warn(\"BasicButton : stageはmouseoverイベントを処理していません。\" + \"そのためボタンのマウスオーバー処理が正常に働いていません。\" + \"stage.enableMouseOver()を実行してからボタンを配置してください。\");\n    });\n    if (materials) this.initMaterial(materials);\n  }\n  /**\n   * ボタンに対するマウスハンドリングを開始する。\n   */\n\n\n  setMouseEvents() {\n    this.addEventListener(\"mousedown\", e => {\n      this.pressButton(e);\n    });\n    this.addEventListener(\"pressup\", e => {\n      this.releaseButton(e);\n    });\n    this.addEventListener(\"rollover\", e => {\n      this.overButton(e);\n    });\n    this.addEventListener(\"mouseout\", e => {\n      this.outButton(e);\n    });\n  }\n  /**\n   * ボタンに状態マテリアルを設定する。\n   * @param {ButtonMaterialSet} materials\n   */\n\n\n  initMaterial(materials) {\n    //すでにmaterialが設定済みの場合、以前のマテリアルを削除する。\n    if (this.material) {\n      _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__.ButtonMaterialSet.remove(this.material);\n      this.material = null;\n    }\n\n    this.material = materials;\n    _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__.ButtonMaterialSet.addChild(this, materials);\n    this.updateMaterialVisible(this.getButtonState()); //テキストラベルがあったら最前線に。\n\n    this._labelField.forEach(label => {\n      this.removeChild(label);\n      this.addChild(label);\n    });\n  }\n  /**\n   * 状態表示およびラベル文字色を、状態に応じて更新する。\n   * @param {BasicButtonState} state\n   */\n\n\n  updateMaterialVisible(state) {\n    _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__.ButtonMaterialSet.updateVisible(this.material, state);\n\n    this._labelField.forEach((label, index) => {\n      _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__.ButtonLabelColorSet.update(label, this.labelColors[index], state);\n    });\n  }\n  /**\n   * ボタン上でマウスダウンした際の処理。\n   * 状態と表示を更新する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  pressButton(evt) {\n    if (!this.checkActivity()) return;\n    this.isPressed = true;\n    this.updateMaterialVisible(_BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL_DOWN);\n  }\n  /**\n   * ボタン上でマウスアップした際の処理。\n   * 状態と表示を更新する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  releaseButton(evt) {\n    if (!this.checkActivity()) return;\n    if (!this.isPressed) return;\n    this.isPressed = false;\n    const state = this.isOver ? _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL_OVER : _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL;\n    this.updateMaterialVisible(state);\n  }\n  /**\n   * ボタンにマウスオーバーした際の処理。\n   * 状態と表示を更新する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  overButton(evt) {\n    this.isOver = true;\n    if (!this.checkActivity()) return;\n    this.updateMaterialVisible(_BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL_OVER);\n  }\n  /**\n   * ボタンからマウスアウトした際の処理。\n   * 状態と表示を更新する。\n   * @param {createjs.MouseEvent} evt\n   */\n\n\n  outButton(evt) {\n    this.isOver = false;\n    this.isPressed = false;\n    if (!this.checkActivity()) return;\n    this.updateMaterialVisible(_BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL);\n  }\n  /**\n   * ボタンを非活性化する\n   */\n\n\n  disableButton() {\n    this.isDisable = true;\n    this.updateMouseEnabled();\n    this.updateMaterialVisible(_BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.DISABLE);\n  }\n  /**\n   * ボタンを活性化する\n   */\n\n\n  enableButton() {\n    this.isDisable = false;\n    this.updateMouseEnabled();\n    this.updateMaterialVisible(_BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL);\n  }\n\n  get frozen() {\n    return this._frozen;\n  }\n\n  set frozen(value) {\n    this._frozen = value;\n    this.updateMouseEnabled();\n  }\n\n  updateMouseEnabled() {\n    this.mouseEnabled = !this.isDisable && !this._frozen;\n  }\n  /**\n   * 現在のボタンの有効、無効状態を取得する\n   * @return    ボタンが有効か否か\n   */\n\n\n  checkActivity() {\n    return !this.isDisable && !this._frozen && this.mouseEnabled;\n  }\n  /**\n   * 現在のボタンの状態を取得する\n   * @returns {BasicButtonState}\n   */\n\n\n  getButtonState() {\n    if (this.isDisable) return _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.DISABLE;else return _BasicButtonState__WEBPACK_IMPORTED_MODULE_1__.BasicButtonState.NORMAL;\n  }\n  /**\n   * ボタンラベルを追加する。\n   * @param x ラベル位置\n   * @param y ラベル位置\n   * @param label ラベルに表示する文言\n   * @param font フォント設定 createjs.Textのfont指定に準じる。\n   * @param color\n   * @param textAlign\n   * @return テキストフィールドのインデックス値\n   */\n\n\n  addLabel(x, y, label, font, color, textAlign) {\n    this.labelColors.push(color);\n    const field = new createjs.Text(\"\", font, color.normal);\n\n    this._labelField.push(field);\n\n    field.x = x;\n    field.y = y;\n    if (textAlign) field.textAlign = textAlign;\n    field.textBaseline = \"alphabetic\";\n    field.mouseEnabled = false;\n    createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__.CreatejsCacheUtil.cacheText(field, label);\n    this.addChild(field);\n    return this._labelField.indexOf(field);\n  }\n  /**\n   * ボタンラベルに表示されている文言を取得する。\n   * @returns {string}\n   */\n\n\n  getLabel(index) {\n    if (!this._labelField) return null;\n    return this._labelField[index].text;\n  }\n  /**\n   * ボタンラベルの文言を更新する。\n   * @param index\n   * @param value\n   */\n\n\n  setLabel(index, value) {\n    if (this._labelField.length === 0) {\n      console.warn(\"BasicButton : \" + \"ボタンラベルが初期化されていませんが、ラベルの文言が指定されました。\" + \"文言を指定する前にラベルの初期化をaddLabel関数で行ってください。\");\n      return;\n    }\n\n    createjs_cache_util__WEBPACK_IMPORTED_MODULE_0__.CreatejsCacheUtil.cacheText(this._labelField[index], value);\n  }\n\n  getLabelField(index) {\n    return this._labelField[index];\n  }\n\n  get buttonValue() {\n    return this._buttonValue;\n  }\n\n  set buttonValue(value) {\n    if (this._buttonValue != value) {\n      this._buttonValue = value;\n    }\n  }\n  /**\n   * 当たり判定の矩形を指定する。\n   * @param x\n   * @param y\n   * @param w\n   * @param h\n   */\n\n\n  initHitRect(x, y, w, h) {\n    const area = new Shape();\n    area.graphics.beginFill(\"#000\").drawRect(x, y, w, h).endFill();\n    this.hitArea = area;\n  }\n\n}\n\n//# sourceURL=webpack://createjs-basic-button/./esm/BasicClickButton.js?");

/***/ }),

/***/ "./esm/BasicRadioButton.js":
/*!*********************************!*\
  !*** ./esm/BasicRadioButton.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicRadioButton\": () => (/* binding */ BasicRadioButton)\n/* harmony export */ });\n/* harmony import */ var _BasicCheckButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicCheckButton */ \"./esm/BasicCheckButton.js\");\n\n/**\n * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。\n */\n\nclass BasicRadioButton extends _BasicCheckButton__WEBPACK_IMPORTED_MODULE_0__.BasicCheckButton {\n  /**\n   * 現在のボタンの有効、無効状態を取得する。\n   * ラジオボタンは選択中も操作が無効となる。\n   * @return    ボタンが有効か否か\n   */\n  checkActivity() {\n    if (this._isSelect) return false;\n    return super.checkActivity();\n  }\n\n}\n\n//# sourceURL=webpack://createjs-basic-button/./esm/BasicRadioButton.js?");

/***/ }),

/***/ "./esm/BasicRadioButtonManager.js":
/*!****************************************!*\
  !*** ./esm/BasicRadioButtonManager.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicRadioButtonManager\": () => (/* binding */ BasicRadioButtonManager)\n/* harmony export */ });\n/* harmony import */ var _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicButtonEvent */ \"./esm/BasicButtonEvent.js\");\n\n/**\n * 排他的に選択されるボタンを制御するクラスです。\n *\n * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。\n * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトの選択状態を変更します。\n * また、このクラスは変更内容をEventとして発信します。\n *\n * 利用する際には以下のような手順でインスタンス化してください。\n *\n * let btn:BasicRadioButton = new BasicRadioButton(...);\n * let manager:BasicRadioButtonManager = new BasicRadioButtonManager(); //インスタンス化\n * manager.addButton(btn);\n * manager.selected = btn; //デフォルトで選択されているボタンを指定\n */\n\nclass BasicRadioButtonManager extends createjs.EventDispatcher {\n  constructor() {\n    super(...arguments);\n    this._buttons = [];\n    this._selected = null;\n  }\n  /**\n   * ラジオボタンのグループにボタンを追加する。\n   * @param {BasicRadioButton} button\n   */\n\n\n  add(button) {\n    this._buttons.push(button);\n\n    button.addEventListener(_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEventType.SELECTED, e => {\n      const evt = e;\n      this.deselectOthers(evt.currentTarget);\n    });\n  }\n  /**\n   * ボタンを選択する。\n   * nullを引数に取ると全ての選択を解除する。\n   * @param {BasicRadioButton} selectedButton\n   */\n\n\n  set selected(selectedButton) {\n    this._selected = selectedButton;\n\n    if (selectedButton == null) {\n      this.deselectAllButtons();\n      return;\n    } //選択されたボタンがこのインスタンスの管理下か確認する。\n\n\n    const index = this._buttons.indexOf(selectedButton);\n\n    if (index === -1) {\n      console.warn(\"BasicRadioButtonManager : \" + \"選択対象として指定されたボタンが、BasicRadioButtonManagerの管理下にありません。\" + \"指定を行う前にaddButton関数でボタンをBasicRadioButtonManagerに登録してください。\");\n      return;\n    }\n\n    selectedButton.selectButton();\n  }\n  /**\n   * 選択済みのボタンを取得する。\n   * 選択されていない場合はnullを返す。\n   * @returns {BasicRadioButton | null}\n   */\n\n\n  get selected() {\n    return this._selected;\n  }\n  /**\n   * 指定されたボタン以外の選択を解除し、BasicRadioButtonManagerからSELECTEDイベントを発行する。\n   * @param {BasicRadioButton} selectedButton\n   * @param {boolean} isDispatchSelectEvent\n   */\n\n\n  deselectOthers(selectedButton, isDispatchSelectEvent = true) {\n    this._selected = selectedButton;\n\n    for (let btn of this._buttons) {\n      if (btn != selectedButton) {\n        btn.deselectButton();\n      }\n    }\n\n    if (isDispatchSelectEvent) {\n      const evt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEvent(_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEventType.SELECTED);\n      evt.buttonValue = this._selected.buttonValue;\n      evt.index = this._buttons.indexOf(this._selected);\n      this.dispatchEvent(evt);\n    }\n  }\n  /**\n   * 管理下の全てのボタンの選択を解除する。\n   */\n\n\n  deselectAllButtons() {\n    this._selected = null;\n\n    for (let btn of this._buttons) {\n      btn.deselectButton();\n    }\n\n    const evt = new _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEvent(_BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEventType.UNSELECTED);\n    this.dispatchEvent(evt);\n  }\n\n  disableAll() {\n    for (let btn of this._buttons) {\n      btn.disableButton();\n    }\n  }\n\n  disableMouseAll() {\n    for (let btn of this._buttons) {\n      btn.mouseEnabled = false;\n    }\n  }\n\n  enableAll() {\n    for (let btn of this._buttons) {\n      btn.enableButton();\n    }\n  }\n\n  enableMouseAll() {\n    for (let btn of this._buttons) {\n      btn.mouseEnabled = true;\n    }\n  }\n  /**\n   * 現在選択されているボタンのbuttonValueを取得する。\n   * 選択されたボタンがない場合はnullを返す。\n   * @returns {any}\n   */\n\n\n  get selectedButtonValue() {\n    const btn = this.selected;\n\n    if (btn) {\n      return btn.buttonValue;\n    }\n\n    return null;\n  }\n  /**\n   * このインスタンスで管理をしているラジオボタンの配列を取得する。\n   * @returns {BasicRadioButton[]}\n   */\n\n\n  get buttons() {\n    return this._buttons;\n  }\n  /**\n   * buttonValueを検索キーとして、該当するボタンを取得する。\n   * 該当するボタンがない場合はnullを返す。\n   *\n   * @param value\n   * @returns {BasicRadioButton | null}\n   */\n\n\n  getButton(value) {\n    for (let btn of this._buttons) {\n      if (btn.buttonValue === value && btn.buttonValue != null && btn.buttonValue != undefined) {\n        return btn;\n      }\n    }\n\n    return null;\n  }\n\n}\n\n//# sourceURL=webpack://createjs-basic-button/./esm/BasicRadioButtonManager.js?");

/***/ }),

/***/ "./esm/ButtonMaterialSet.js":
/*!**********************************!*\
  !*** ./esm/ButtonMaterialSet.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ButtonMaterialSet\": () => (/* binding */ ButtonMaterialSet),\n/* harmony export */   \"ButtonLabelColorSet\": () => (/* binding */ ButtonLabelColorSet)\n/* harmony export */ });\n/* harmony import */ var _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicButtonState */ \"./esm/BasicButtonState.js\");\n/* harmony import */ var createjs_cache_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! createjs-cache-util */ \"./node_modules/createjs-cache-util/bin/createjs-text-cache.js\");\n\n\n\nclass ButtonOptionSet {\n  /**\n   * stateに対応するオプション値を取り出す\n   * @param set\n   * @param state\n   */\n  static getMaterial(set, state) {\n    switch (state) {\n      case _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.DISABLE:\n        return set.disable || set.normal;\n\n      case _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.NORMAL_OVER:\n        return set.over || set.normal;\n\n      case _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.NORMAL_DOWN:\n        return set.down || set.normal;\n\n      case _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.SELECT:\n        return set.selectNormal || set.normal;\n\n      case _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.SELECT_OVER:\n        return set.selectOver || set.normal;\n\n      case _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.SELECT_DOWN:\n        return set.selectDown || set.normal;\n\n      default:\n        return set.normal;\n    }\n  }\n\n}\n/**\n * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。\n */\n\n\nclass ButtonMaterialSet extends ButtonOptionSet {\n  /**\n   * ボタン上に状態パーツを配置する\n   * @param {BasicClickButton} button\n   * @param {ButtonMaterialSet} material\n   */\n  static addChild(button, material) {\n    this.remove(material);\n    const materials = this.getMaterialArray(material);\n\n    for (let mat of materials) {\n      if (mat != null) button.addChild(mat);\n    }\n  }\n  /**\n   * この状態セットに含まれるパーツを表示ツリー上から削除する。\n   * @param {ButtonMaterialSet} material\n   */\n\n\n  static remove(material) {\n    const materials = this.getMaterialArray(material);\n\n    for (let mat of materials) {\n      if (mat && mat.parent) mat.parent.removeChild(mat);\n    }\n  }\n  /**\n   * 全ての表示パーツを配列として取得する。\n   * @param {ButtonMaterialSet} materials\n   * @returns {createjs.DisplayObject[]}\n   */\n\n\n  static getMaterialArray(materials) {\n    return [materials.normal, materials.over, materials.down, materials.disable, materials.selectNormal, materials.selectOver, materials.selectDown, materials.selectMarker];\n  }\n  /**\n   * 可視状態をstateに合わせて更新する\n   * @param {ButtonMaterialSet} material\n   * @param {BasicButtonState} state\n   */\n\n\n  static updateVisible(material, state) {\n    this.invisibleAll(material);\n    this.getMaterial(material, state).visible = true;\n\n    if (material.selectMarker) {\n      const isSelect = state === _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.SELECT || state === _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.SELECT_OVER || state === _BasicButtonState__WEBPACK_IMPORTED_MODULE_0__.BasicButtonState.SELECT_DOWN;\n      material.selectMarker.visible = isSelect;\n    }\n  }\n  /**\n   * 全てのパーツを不可視にする。\n   * @param {ButtonMaterialSet} material\n   */\n\n\n  static invisibleAll(material) {\n    const materials = this.getMaterialArray(material);\n\n    for (let mat of materials) {\n      if (mat != null) mat.visible = false;\n    }\n  }\n\n}\n/**\n * テキストラベルの色についてのオプション。\n * 各ボタンのaddLabel関数でインスタンスに渡す。\n */\n\nclass ButtonLabelColorSet extends ButtonOptionSet {\n  /**\n   * ラベル文字色をボタン状態に応じて更新する。\n   * @param {createjs.Text} field 更新対象ラベル\n   * @param {ButtonLabelColorSet} colors 状態文字色セット\n   * @param {BasicButtonState} state ボタン状態\n   */\n  static update(field, colors, state) {\n    if (field == null) return;\n    const option = {\n      color: this.getMaterial(colors, state)\n    };\n    createjs_cache_util__WEBPACK_IMPORTED_MODULE_1__.CreatejsCacheUtil.cacheText(field, field.text, option);\n  }\n\n}\n\n//# sourceURL=webpack://createjs-basic-button/./esm/ButtonMaterialSet.js?");

/***/ }),

/***/ "./esm/index.js":
/*!**********************!*\
  !*** ./esm/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasicButtonEvent\": () => (/* reexport safe */ _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEvent),\n/* harmony export */   \"BasicButtonEventType\": () => (/* reexport safe */ _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__.BasicButtonEventType),\n/* harmony export */   \"BasicClickButton\": () => (/* reexport safe */ _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__.BasicClickButton),\n/* harmony export */   \"ButtonLabelColorSet\": () => (/* reexport safe */ _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__.ButtonLabelColorSet),\n/* harmony export */   \"ButtonMaterialSet\": () => (/* reexport safe */ _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__.ButtonMaterialSet),\n/* harmony export */   \"BasicButtonState\": () => (/* reexport safe */ _BasicButtonState__WEBPACK_IMPORTED_MODULE_3__.BasicButtonState),\n/* harmony export */   \"BasicCheckButton\": () => (/* reexport safe */ _BasicCheckButton__WEBPACK_IMPORTED_MODULE_4__.BasicCheckButton),\n/* harmony export */   \"BasicRadioButton\": () => (/* reexport safe */ _BasicRadioButton__WEBPACK_IMPORTED_MODULE_5__.BasicRadioButton),\n/* harmony export */   \"BasicRadioButtonManager\": () => (/* reexport safe */ _BasicRadioButtonManager__WEBPACK_IMPORTED_MODULE_6__.BasicRadioButtonManager)\n/* harmony export */ });\n/* harmony import */ var _BasicButtonEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicButtonEvent */ \"./esm/BasicButtonEvent.js\");\n/* harmony import */ var _BasicClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicClickButton */ \"./esm/BasicClickButton.js\");\n/* harmony import */ var _ButtonMaterialSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonMaterialSet */ \"./esm/ButtonMaterialSet.js\");\n/* harmony import */ var _BasicButtonState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BasicButtonState */ \"./esm/BasicButtonState.js\");\n/* harmony import */ var _BasicCheckButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BasicCheckButton */ \"./esm/BasicCheckButton.js\");\n/* harmony import */ var _BasicRadioButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BasicRadioButton */ \"./esm/BasicRadioButton.js\");\n/* harmony import */ var _BasicRadioButtonManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BasicRadioButtonManager */ \"./esm/BasicRadioButtonManager.js\");\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://createjs-basic-button/./esm/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"demo": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./demoSrc/demo.js","vendor"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcreatejs_basic_button"] = self["webpackChunkcreatejs_basic_button"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;
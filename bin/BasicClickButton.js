import { CreatejsCacheUtil } from "createjs-cache-util";
/**
 * 基本ボタンクラス。
 * 選択状態を持たず、クリックした時点で結果が反映されるタイプのボタンです。
 *
 * 正常動作のために、stageにenableMouseOverを実行する必要があります。
 * stageのインスタンス化のタイミングで実行してください。
 *  stage.enableMouseOver();
 */
export class BasicClickButton extends createjs.Container {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this._buttonValue = null; //このボタンに割り当てられた値
        /**
         * ボタンを押す
         * @param e
         */
        this.onPressButton = (e) => {
            const evt = e;
            this.pressButton(evt);
        };
        /**
         * ボタンを離す
         * @param e
         */
        this.onReleaseButton = (e) => {
            const evt = e;
            this.releaseButton(evt);
        };
        /**
         * ボタンにマウスオーバーする
         * @param e
         */
        this.onOverButton = (e) => {
            const evt = e;
            this.overButton(evt);
        };
        /**
         * ボタンからマウスアウトする
         * @param e
         */
        this.onOutButton = (e) => {
            const evt = e;
            this.outButton(evt);
        };
        this.isDisable = false;
        this.isPressed = false;
        this._isOver = false;
        //childのマウスイベントが生きていると正常に動作しないため、処理をここで止める。
        this.mouseChildren = false;
        this.cursor = "pointer";
        this.setMouseEvents();
    }
    setMouseEvents() {
        this.addEventListener("mousedown", this.onPressButton);
        this.addEventListener("pressup", this.onReleaseButton);
        this.addEventListener("rollover", this.onOverButton);
        this.addEventListener("mouseout", this.onOutButton);
    }
    initMaterial(materials) {
        this.material = materials;
        BasicButtonMaterialConfig.addChild(this, materials);
        this.updateMaterialVisible(this.getButtonState());
        //テキストラベルがあったら最前線に。
        if (this.labelField) {
            this.removeChild(this.labelField);
            this.addChild(this.labelField);
        }
    }
    updateMaterialVisible(type) {
        BasicButtonMaterialConfig.updateVisible(this.material, type);
        BasicButtonLabelColorConfig.update(this.labelField, this.labelColors, type);
    }
    pressButton(evt) {
        if (!this.checkActivity())
            return;
        this.isPressed = true;
        this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
    }
    releaseButton(evt) {
        if (!this.checkActivity())
            return;
        if (!this.isPressed)
            return;
        this.isPressed = false;
        this.selectButton(evt);
        this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
    }
    overButton(evt) {
        if (!this.checkActivity())
            return;
        this._isOver = true;
        this.updateMaterialVisible(BasicButtonState.NORMAL_OVER);
    }
    outButton(evt) {
        if (!this.checkActivity())
            return;
        this._isOver = false;
        this.isPressed = false;
        this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    /**
     * ボタンを選択する
     * @param    evt
     */
    selectButton(evt) {
        this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    /**
     * ボタンを非活性化する
     */
    disableButton() {
        this.isDisable = true;
        this.disableMouseEvent();
        this.updateMaterialVisible(BasicButtonState.DISABLE);
    }
    /**
     * ボタンを活性化する
     */
    enableButton() {
        this.isDisable = false;
        this.enableMouseEvent();
        this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    /**
     * ボタンのイベントリスナを有効にする
     *   このメソッドではenableButton(),disableButton()と異なり
     *   表示状態の変更は行われません。
     */
    enableMouseEvent() {
        this.mouseEnabled = true;
    }
    /**
     * ボタンのイベントリスナを無効にする
     *   このメソッドではenableButton(),disableButton()と異なり
     *   表示状態の変更は行われません。
     */
    disableMouseEvent() {
        this.mouseEnabled = false;
    }
    /**
     * 現在のボタンの有効、無効状態を取得する
     * @return    ボタンが有効か否か
     */
    checkActivity() {
        return !this.isDisable && this.mouseEnabled;
    }
    /**
     * 現在のボタンの状態を取得する
     * @return    定数STATE_*のいずれか
     */
    getButtonState() {
        if (this.isDisable)
            return BasicButtonState.DISABLE;
        else
            return BasicButtonState.NORMAL;
    }
    /**
     * ボタンの状態表示を更新する
     */
    updateButtonDisplay() {
        if (this.isPressed) {
            this.updateMaterialVisible(BasicButtonState.NORMAL_DOWN);
        }
    }
    addLabel(x, y, label, font, color, textAlign) {
        this.labelColors = color;
        this.labelField = new createjs.Text("", font, color.normal);
        this.labelField.x = x;
        this.labelField.y = y;
        if (textAlign)
            this.labelField.textAlign = textAlign;
        CreatejsCacheUtil.cacheText(this.labelField, label);
        this.addChild(this.labelField);
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
        if (this.labelField) {
            CreatejsCacheUtil.cacheText(this.labelField, value);
        }
    }
    get isOver() {
        return this._isOver;
    }
    get buttonValue() {
        return this._buttonValue;
    }
    set buttonValue(value) {
        if (this._buttonValue != value) {
            this._buttonValue = value;
        }
    }
}
/**
 * ボタンの状態に応じて表示されるDisplayObjectを格納するクラス。
 */
export class BasicButtonMaterialConfig {
    /**
     * ボタン上に状態パーツを配置する
     * @param {BasicClickButton} button
     * @param {BasicButtonMaterialConfig} material
     */
    static addChild(button, material) {
        const materials = [
            material.normal,
            material.over,
            material.down,
            material.disable,
            material.selectNormal,
            material.selectOver,
            material.selectDown,
            material.selectMarker
        ];
        for (let mat of materials) {
            if (mat == null)
                continue;
            if (mat.parent)
                mat.parent.removeChild(mat);
            button.addChild(mat);
        }
    }
    /**
     * 可視状態をstateに合わせて更新する
     * @param {BasicButtonMaterialConfig} material
     * @param {BasicButtonState} state
     */
    static updateVisible(material, state) {
        this.invisibleAll(material);
        this.getMaterial(material, state).visible = true;
        if (material.selectMarker) {
            const isSelect = state === BasicButtonState.SELECT ||
                state === BasicButtonState.SELECT_OVER ||
                state === BasicButtonState.SELECT_DOWN;
            material.selectMarker.visible = isSelect;
        }
    }
    /**
     * 全てのパーツを不可視にする。
     * @param {BasicButtonMaterialConfig} material
     */
    static invisibleAll(material) {
        material.normal.visible = false;
        if (material.over)
            material.over.visible = false;
        if (material.down)
            material.down.visible = false;
        if (material.disable)
            material.disable.visible = false;
        if (material.selectNormal)
            material.selectNormal.visible = false;
        if (material.selectOver)
            material.selectOver.visible = false;
        if (material.selectDown)
            material.selectDown.visible = false;
        if (material.selectMarker)
            material.selectMarker.visible = false;
    }
    /**
     * stateに対応する状態パーツを取り出す
     * @param {BasicButtonMaterialConfig} material
     * @param {BasicButtonState} state
     * @returns {createjs.DisplayObject}
     */
    static getMaterial(material, state) {
        switch (state) {
            case BasicButtonState.DISABLE:
                if (material.disable)
                    return material.disable;
                break;
            case BasicButtonState.NORMAL_OVER:
                if (material.over)
                    return material.over;
                break;
            case BasicButtonState.NORMAL_DOWN:
                if (material.down)
                    return material.down;
                break;
            case BasicButtonState.SELECT:
                if (material.selectNormal)
                    return material.selectNormal;
                break;
            case BasicButtonState.SELECT_OVER:
                if (material.selectOver)
                    return material.selectOver;
                break;
            case BasicButtonState.SELECT_DOWN:
                if (material.selectDown)
                    return material.selectDown;
                break;
        }
        return material.normal;
    }
}
/**
 * テキストラベルの色についてのオプション。
 * 各ボタンのaddLabel関数でインスタンスに渡す。
 */
export class BasicButtonLabelColorConfig {
    static update(field, colors, state) {
        if (field == null)
            return;
        const option = {
            color: colors.normal
        };
        switch (state) {
            case BasicButtonState.NORMAL_DOWN:
                option.color = colors.down || colors.normal;
                break;
            case BasicButtonState.NORMAL_OVER:
                option.color = colors.over || colors.normal;
                break;
            case BasicButtonState.DISABLE:
                option.color = colors.disable || colors.normal;
                break;
            case BasicButtonState.SELECT:
                option.color = colors.selectNormal || colors.normal;
                break;
            case BasicButtonState.SELECT_DOWN:
                option.color = colors.selectDown || colors.normal;
                break;
            case BasicButtonState.SELECT_OVER:
                option.color = colors.selectOver || colors.normal;
                break;
        }
        CreatejsCacheUtil.cacheText(field, field.text, option);
    }
}
/**
 * ボタン状態を表す定数
 */
export var BasicButtonState;
(function (BasicButtonState) {
    BasicButtonState["NORMAL"] = "normal";
    BasicButtonState["NORMAL_OVER"] = "normal_over";
    BasicButtonState["NORMAL_DOWN"] = "normal_down";
    BasicButtonState["DISABLE"] = "disable";
    BasicButtonState["SELECT"] = "select";
    BasicButtonState["SELECT_OVER"] = "select_over";
    BasicButtonState["SELECT_DOWN"] = "select_down";
})(BasicButtonState || (BasicButtonState = {}));

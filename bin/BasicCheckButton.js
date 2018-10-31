import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";
/**
 * 選択状態を持つボタンクラス。
 */
export class BasicCheckButton extends BasicClickButton {
    constructor() {
        super(...arguments);
        this.isSelect = false;
    }
    /**
     * ボタンがmousedownされた際の処理。
     * @param {createjs.MouseEvent} evt
     */
    pressButton(evt) {
        if (!this.checkActivity())
            return;
        this.isPressed = true;
        if (this.isSelect) {
            this.updateMaterialVisible(BasicButtonState.SELECT_DOWN);
        }
        else {
            super.pressButton(evt);
        }
    }
    /**
     * ボタンがmouseupされた際の処理。
     * @param {createjs.MouseEvent} evt
     */
    releaseButton(evt) {
        if (!this.checkActivity())
            return;
        if (!this.isPressed)
            return;
        this.isPressed = false;
        if (this.isSelect)
            this.deselectButton(evt);
        else
            this.selectButton(evt);
    }
    /**
     * ボタンがmouseoverされた際の処理
     * @param {createjs.MouseEvent} evt
     */
    overButton(evt) {
        super.overButton(evt);
        if (!this.checkActivity())
            return;
        const state = this.isSelect
            ? BasicButtonState.SELECT_OVER
            : BasicButtonState.NORMAL_OVER;
        this.updateMaterialVisible(state);
    }
    outButton(evt) {
        super.outButton(evt);
        if (!this.checkActivity())
            return;
        const state = this.isSelect
            ? BasicButtonState.SELECT
            : BasicButtonState.NORMAL;
        this.updateMaterialVisible(state);
    }
    /**
     * @override
     * @param {createjs.MouseEvent} evt
     */
    selectButton(evt) {
        if (this.isSelect)
            return;
        super.selectButton(evt);
        this.isSelect = true;
        if (!this.isDisable) {
            const state = this._isOver
                ? BasicButtonState.SELECT_OVER
                : BasicButtonState.SELECT;
            this.updateMaterialVisible(state);
        }
        let buttonEvt = new BasicButtonEvent(BasicButtonEventType.SELECTED);
        buttonEvt.buttonValue = this.buttonValue;
        this.dispatchEvent(buttonEvt);
    }
    deselectButton(evt) {
        if (!this.isSelect)
            return;
        if (!this.isDisable) {
            const state = this._isOver
                ? BasicButtonState.NORMAL_OVER
                : BasicButtonState.NORMAL;
            this.updateMaterialVisible(state);
        }
        this.isSelect = false;
        let buttonEvt = new BasicButtonEvent(BasicButtonEventType.UNSELECTED);
        buttonEvt.buttonValue = this.buttonValue;
        this.dispatchEvent(buttonEvt);
    }
    /**
     * 選択状態を反転させる。
     * ButtonEvent.SELECTは発行しない。
     * @param {createjs.MouseEvent} evt
     */
    reverseSelection(evt) {
        this.isSelect = !this.isSelect;
        if (this.isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    /**
     * 選択状態の初期化のみを行う。
     * ButtonEvent.SELECTは発行しない。
     * @param {boolean} isSelect
     */
    initSelection(isSelect) {
        this.isSelect = isSelect;
        if (isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    /**
     * ボタンを操作可能にする。
     */
    enableButton() {
        this.isDisable = false;
        if (this.isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            super.enableButton();
        this.enableMouseEvent();
    }
    getButtonState() {
        if (this.isDisable)
            return BasicButtonState.DISABLE;
        else {
            if (this.isSelect)
                return BasicButtonState.SELECT;
            else
                return BasicButtonState.NORMAL;
        }
    }
    /**
     * 選択状態を取得する。
     * @returns {boolean}
     */
    get selection() {
        return this.isSelect;
    }
}

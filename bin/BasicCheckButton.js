import { BasicClickButton, BasicButtonState } from "./BasicClickButton";
import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";
/**
 * 選択状態を持つボタンクラスです
 */
export class BasicCheckButton extends BasicClickButton {
    constructor() {
        super(...arguments);
        this.isSelect = false;
    }
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
    releaseButton(evt) {
        if (!this.checkActivity())
            return;
        if (!this.isPressed)
            return;
        this.isPressed = false;
        if (this.isSelect)
            this.unselectButton(evt);
        else
            this.selectButton(evt);
    }
    overButton(evt) {
        if (!this.checkRollOverActivity())
            return;
        if (this.isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT_OVER);
        else
            super.overButton(evt);
    }
    outButton(evt) {
        if (!this.checkRollOverActivity())
            return;
        this.isPressed = false;
        if (this.isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            super.outButton(evt);
    }
    selectButton(evt) {
        if (this.isSelect)
            return;
        super.selectButton(evt);
        this.isSelect = true;
        this.updateMaterialVisible(BasicButtonState.SELECT);
        let buttonEvt = new BasicButtonEvent(BasicButtonEventType.SELECTED);
        buttonEvt.buttonValue = this.buttonValue;
        this.dispatchEvent(buttonEvt);
    }
    unselectButton(evt) {
        if (!this.isSelect)
            return;
        if (!this.isDisable)
            this.updateMaterialVisible(BasicButtonState.NORMAL);
        this.isSelect = false;
        let buttonEvt = new BasicButtonEvent(BasicButtonEventType.UNSELECTED);
        buttonEvt.buttonValue = this.buttonValue;
        this.dispatchEvent(buttonEvt);
    }
    reverseSelectState(evt) {
        this.isSelect = !this.isSelect;
        if (this.isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    initSelection(isSelect) {
        this.isSelect = isSelect;
        if (isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            this.updateMaterialVisible(BasicButtonState.NORMAL);
    }
    enableButton() {
        this.isDisable = false;
        if (this.isSelect)
            this.updateMaterialVisible(BasicButtonState.SELECT);
        else
            super.enableButton();
        this.enableMouseEvent();
    }
    checkRollOverActivity() {
        return !this.isDisable;
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
    updateButtonDisplay() {
        this.updateMaterialVisible(this.getButtonState());
    }
    ///////////////////////////
    //	getter / setter
    ///////////////////////////
    get selection() {
        return this.isSelect;
    }
}

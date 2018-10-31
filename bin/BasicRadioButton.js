import { BasicCheckButton } from "./BasicCheckButton";
import { BasicButtonState } from "./BasicClickButton";
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export class BasicRadioButton extends BasicCheckButton {
    constructor() {
        super(...arguments);
        this._isAbleToDeselect = false; //ボタン自体が解除可能か。本来ラジオボタンは自身では選択を解除できない。
    }
    setManager(manager) {
        this.manager = manager;
    }
    pressButton(evt) {
        if (!this.checkActivity())
            return;
        this.isPressed = true;
        super.pressButton(evt);
        if (this.manager)
            this.manager.pressButton(this);
    }
    releaseButton(evt) {
        if (!this.checkActivity())
            return;
        if (!this.isPressed)
            return;
        this.isPressed = false;
        if (!this.isSelect) {
            this.selectButton();
            this.updateMaterialVisible(BasicButtonState.SELECT_OVER);
            if (this.manager)
                this.manager.releaseButton(this);
        }
        else {
            this.manager.unselectAllButtons();
            this.updateMaterialVisible(BasicButtonState.NORMAL);
            if (this.manager)
                this.manager.releaseButton(this);
        }
    }
    overButton(evt) {
        super.overButton(evt);
        if (this.manager)
            this.manager.overButton(this);
    }
    outButton(evt) {
        super.outButton(evt);
        if (this.manager)
            this.manager.outButton(this);
    }
    checkActivity() {
        if (this.isDisable)
            return false;
        if (this.isSelect && !this._isAbleToDeselect)
            return false;
        return true;
    }
    selectButton(evt) {
        super.selectButton();
        this.manager.unselectOthers(this);
    }
    initSelection(isSelect) {
        super.initSelection(isSelect);
        if (isSelect)
            this.manager.unselectOthers(this, false);
    }
    set isAbleToDeselect(value) {
        this._isAbleToDeselect = value;
    }
}

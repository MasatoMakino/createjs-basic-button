import { BasicCheckButton } from "./BasicCheckButton";
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export class BasicRadioButton extends BasicCheckButton {
    setManager(manager) {
        this.manager = manager;
    }
    checkActivity() {
        if (this.isDisable)
            return false;
        if (!this.mouseEnabled)
            return false;
        if (this.isSelect)
            return false;
        return true;
    }
    selectButton(evt) {
        super.selectButton();
        this.manager.deselectOthers(this);
    }
    initSelection(isSelect) {
        super.initSelection(isSelect);
        if (isSelect)
            this.manager.deselectOthers(this, false);
    }
}

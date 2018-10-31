import { BasicCheckButton } from "./BasicCheckButton";
import { BasicButtonState } from "./BasicClickButton";
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export class BasicRadioButton extends BasicCheckButton {
    setManager(manager) {
        this.manager = manager;
    }
    outButton(evt) {
        super.outButton(evt);
        //マウスオーバーの解除のみはcheckActivityの判定にかかわらず行う。
        if (!this.isDisable && this.isSelect) {
            this.updateMaterialVisible(BasicButtonState.SELECT);
        }
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

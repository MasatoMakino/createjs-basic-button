import { BasicCheckButton } from "./BasicCheckButton";
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export class BasicRadioButton extends BasicCheckButton {
    checkActivity() {
        if (this.isDisable)
            return false;
        if (!this.mouseEnabled)
            return false;
        if (this.isSelect)
            return false;
        return true;
    }
}

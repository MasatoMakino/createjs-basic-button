/// <reference types="easeljs" />
import { BasicCheckButton } from "./BasicCheckButton";
import { BasicRadioButtonManager } from "./BasicRadioButtonManager";
/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export declare class BasicRadioButton extends BasicCheckButton {
    protected manager: BasicRadioButtonManager;
    setManager(manager: BasicRadioButtonManager): void;
    checkActivity(): boolean;
    selectButton(evt?: createjs.MouseEvent): void;
    initSelection(isSelect: boolean): void;
}
//# sourceMappingURL=BasicRadioButton.d.ts.map
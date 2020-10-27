import {BasicCheckButton} from "./BasicCheckButton";

/**
 * 排他的に選択可能なボタン。ラジオボタンのセットはBasicRadioButtonManagerで設定する。
 */
export declare class BasicRadioButton extends BasicCheckButton {
    /**
     * 現在のボタンの有効、無効状態を取得する。
     * ラジオボタンは選択中も操作が無効となる。
     * @return    ボタンが有効か否か
     */
    protected checkActivity(): boolean;
}
//# sourceMappingURL=BasicRadioButton.d.ts.map
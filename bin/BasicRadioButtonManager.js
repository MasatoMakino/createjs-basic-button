import { BasicButtonEvent, BasicButtonEventType } from "./BasicButtonEvent";
/**
 * 排他的に選択されるボタンを制御するクラスです。
 *
 * メンバーのBasicRadioButtonが変更されると、このクラスに変更内容が通知されます。
 * このクラスは変更通知に応じ、他のBasicRadioButtonオブジェクトの選択状態を変更します。
 * また、このクラスは変更内容をEventとして発信します。
 *
 * 利用する際には以下のような手順でインスタンス化してください。
 *
 * let btn:BasicRadioButton = new BasicRadioButton(...);
 * let manager:BasicRadioButtonManager = new BasicRadioButtonManager(); //インスタンス化
 * manager.addButton(btn);
 * manager.initSelection(btn); //デフォルトで選択されているボタンを指定
 */
export class BasicRadioButtonManager extends createjs.EventDispatcher {
    constructor() {
        super();
        this._buttons = [];
    }
    addButton(button) {
        this._buttons.push(button);
        button.addEventListener(BasicButtonEventType.SELECTED, (e) => {
            const evt = e;
            this.deselectOthers(evt.currentTarget);
        });
    }
    /**
     * 初期選択ボタンを指定する。
     * nullを引数に取ると全ての選択を解除する。
     * @param {BasicRadioButton} selectedButton
     */
    initSelection(selectedButton) {
        this.selected = selectedButton;
        if (selectedButton == null) {
            this.deselectAllButtons();
            return;
        }
        for (let btn of this._buttons) {
            if (selectedButton === btn) {
                btn.selectButton();
            }
        }
    }
    deselectOthers(selectedButton, isDispatchSelectEvent = true) {
        this.selected = selectedButton;
        for (let btn of this._buttons) {
            if (btn != selectedButton) {
                btn.deselectButton();
            }
        }
        if (isDispatchSelectEvent) {
            let evt = new BasicButtonEvent(BasicButtonEventType.SELECTED);
            evt.buttonValue = this.selected.buttonValue;
            evt.index = this._buttons.indexOf(this.selected);
            this.dispatchEvent(evt);
        }
    }
    deselectAllButtons() {
        this.selected = undefined;
        for (let btn of this._buttons) {
            btn.deselectButton();
        }
        const evt = new BasicButtonEvent(BasicButtonEventType.UNSELECTED);
        this.dispatchEvent(evt);
    }
    disableAll() {
        for (let btn of this._buttons) {
            btn.disableButton();
        }
    }
    disableMouseAll() {
        for (let btn of this._buttons) {
            btn.disableMouseEvent();
        }
    }
    enableAll() {
        for (let btn of this._buttons) {
            btn.enableButton();
        }
    }
    enableMouseAll() {
        for (let btn of this._buttons) {
            btn.enableMouseEvent();
        }
    }
    getSelectedButton() {
        return this.selected;
    }
    getButtonValue() {
        const btn = this.getSelectedButton();
        if (btn) {
            return btn.buttonValue;
        }
        return null;
    }
    refreshButtons(value) {
        for (let btn of this._buttons) {
            if (btn.buttonValue === value) {
                btn.selectButton();
            }
        }
    }
    get buttons() {
        return this._buttons;
    }
    /**
     * buttonValueを検索キーとして、該当するボタンを取得する。
     * 該当するボタンがない場合はnullを返す。
     *
     * @param value
     * @returns {BasicRadioButton | null}
     */
    getButton(value) {
        for (let btn of this._buttons) {
            if (btn.buttonValue === value &&
                btn.buttonValue != null &&
                btn.buttonValue != undefined) {
                return btn;
            }
        }
        return null;
    }
}

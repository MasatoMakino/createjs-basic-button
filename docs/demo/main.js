import {
  BasicClickButton,
  BasicButtonMaterialConfig,
  BasicButtonEventType,
  BasicCheckButton,
  BasicRadioButton,
  BasicRadioButtonManager,
  BasicButtonEvent
} from "../../bin/BasicButton";

let stage;

const onDomContentsLoaded = () => {
  //ステージ更新処理
  const updateStage = () => {
    stage.update();
  };

  //stageの初期化
  const canvas = document.getElementById("appCanvas");
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver();
  console.log(stage._mouseOverIntervalID);

  createjs.Ticker.on("tick", updateStage);

  testButton();
  testCheckButton();
  testDisableButton();
  testRadioButtons();
  testRadioMarkerButtons();
  testRadioLabelButtons();
};

const getMaterial = color => {
  const mat = new createjs.Shape();
  const g = mat.graphics;
  g.beginFill(color);
  g.drawRect(0, 0, 64, 32);
  g.endFill();
  return mat;
};

const getMaterialSet = marker => {
  const mat = {
    normal: getMaterial("#0f0"),
    over: getMaterial("#6f6"),
    down: getMaterial("#f0f"),
    disable: getMaterial("#666"),
    selectNormal: getMaterial("#0ff"),
    selectOver: getMaterial("#6ff"),
    selectDown: getMaterial("#f8f")
  };

  if (marker != null) {
    mat.selectMarker = marker;
  }
  return mat;
};

const testButton = () => {
  const testButton = new BasicClickButton();
  testButton.initMaterial(getMaterialSet());
  testButton.x = 180;
  testButton.y = 180;
  stage.addChild(testButton);

  testButton.addEventListener("click", e => {
    console.log(e);
  });
};

const testCheckButton = () => {
  const testButton = new BasicCheckButton();
  testButton.initMaterial(getMaterialSet());
  testButton.x = 180 * 2;
  testButton.y = 180;
  addLabel(testButton, "C");
  stage.addChild(testButton);

  testButton.addEventListener("click", e => {
    console.log(e);
  });
};

const testDisableButton = () => {
  const testButton = new BasicCheckButton();
  testButton.initMaterial(getMaterialSet());
  testButton.x = 180 * 3;
  testButton.y = 180;
  stage.addChild(testButton);

  addLabel(testButton, "D");
  testButton.disableButton();

  testButton.addEventListener("click", e => {
    console.log(e);
  });
};

const getRadioButton = (x, value, y, marker) => {
  if (y == null) y = 360;
  const testButton = new BasicRadioButton();

  const matSet = getMaterialSet(marker);

  testButton.initMaterial(matSet);

  testButton.x = x;
  testButton.y = y;
  testButton.buttonValue = value;
  stage.addChild(testButton);
  return testButton;
};

const testRadioButtons = () => {
  const manager = new BasicRadioButtonManager();
  manager.add(getRadioButton(180 * 1, "button01"));
  manager.add(getRadioButton(180 * 2, "button02"));
  manager.add(getRadioButton(180 * 3, "button03"));

  //複数回initSelectionを行っても問題ないか確認。
  manager.initSelection(manager.buttons[0]);
  manager.initSelection(null);
  manager.initSelection(manager.buttons[1]);
  manager.initSelection(manager.buttons[2]);

  manager.addEventListener(BasicButtonEventType.SELECTED, e => {
    const evt = e;
    console.log(evt.buttonValue);
  });
};

const getMarker = () => {
  const shape = new createjs.Shape();
  shape.graphics
    .beginFill("#F00")
    .drawCircle(0, 0, 8)
    .endFill();
  return shape;
};

const testRadioMarkerButtons = () => {
  const manager = new BasicRadioButtonManager();

  manager.add(getRadioButton(180 * 1, "button01", 480, getMarker()));
  manager.add(getRadioButton(180 * 2, "button02", 480, getMarker()));
  manager.add(getRadioButton(180 * 3, "button03", 480, getMarker()));
  manager.initSelection(manager.buttons[0]);
};

const testRadioLabelButtons = () => {
  const manager = new BasicRadioButtonManager();

  manager.add(getRadioButton(180 * 1, "button01", 560, getMarker()));
  manager.add(getRadioButton(180 * 2, "button02", 560, getMarker()));
  manager.add(getRadioButton(180 * 3, "button03", 560, getMarker()));

  for (let btn of manager.buttons) {
    addLabel(btn, btn.buttonValue);
  }
  manager.initSelection(manager.buttons[0]);
};

const addLabel = (btn, label) => {
  btn.addLabel(64 / 2, 32 / 2, label, "16px sans", getLabelColors(), "center");
};
const getLabelColors = () => {
  const colors = {
    normal: "#111",
    over: "#333",
    down: "#222",
    disable: "#888",
    selectNormal: "#22f",
    selectOver: "#44f",
    selectDown: "#99f"
  };
  return colors;
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}

import {
  BasicClickButton,
  BasicButtonMaterialConfig,
  BasicButtonEventType,
  BasicCheckButton,
  BasicRadioButton,
  BasicRadioButtonManager
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
  testRadioButtons();
  testRadioMarkerButtons();
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
  testButton.x = 360;
  testButton.y = 180;
  stage.addChild(testButton);

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
  manager.addButton(getRadioButton(180 * 1, "button01"));
  manager.addButton(getRadioButton(180 * 2, "button02"));
  manager.addButton(getRadioButton(180 * 3, "button03"));
  manager.buttons[0].initSelection(true);
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

  manager.addButton(getRadioButton(180 * 1, "button01", 480, getMarker()));
  manager.addButton(getRadioButton(180 * 2, "button02", 480, getMarker()));
  manager.addButton(getRadioButton(180 * 3, "button03", 480, getMarker()));
  manager.buttons[0].initSelection(true);
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}

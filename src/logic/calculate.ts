// 「どの状態のときにどのボタンを押すと、どの状態になる」関数
export default function calculate(button: string, state: State): State {
  // 数値かどうか
  if (isNumberButton(button)) { // 数値押された場合
    return handleNumberButton(button, state);
  }
  // オペレーターかどうか
  if (isOperatorButton(button)) {
    return handleOperatorButton(button, state);
  }
  // .かどうか
  if (isDotButton(button)) {
    return handleDotButton(state);
  }
  // 削除ボタンかどうか
  if (isDeleteButton(button)) {
    return handleDeleteButton(state);
  }
  // ACかどうか
  if (isAllClearButton(button)) {
    return handleAllClearButton();
  }
  // ＝ かどうか
  if (isEqualButton(button)) {
    return handleEqualButton(state);
  }
  return state;
}

export interface State {
  current: string; //現在の数値
  operand: number; //数値
  operator: string | null; // プラスマイナスか
  isNextClear: boolean; // クリアのフラグ
}

// 数字ボタン押されたか判別
function isNumberButton(button: string) {
  return (
    button === "0" ||
    button === "1" ||
    button === "2" ||
    button === "3" ||
    button === "4" ||
    button === "5" ||
    button === "6" ||
    button === "7" ||
    button === "8" ||
    button === "9"
  );
}
// 数値かどうか
function handleNumberButton(button: string, state: State): State {
  if (state.isNextClear) {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }
  if (state.current === "0") {
    return {
      current: button, // 今の表示が0だったら押したまま
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    }
  }
  return { // 表示が0以外 後ろに数値を付け足す
    current: state.current + button,
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  }
}

// オペレーターかどうか
function isOperatorButton(button: string) {
  return button === "+" || button === "-";
}
// オペレーター（+-）が押された判別
function handleOperatorButton(button: string, state: State): State {
  // 押されてない
  if (state.operator === null) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextClear: true,
    }
  }
  // + - 押した状態で再度押した場合(計算)
  const nextValue = operate(state)
  return {
    current: `${nextValue}`,
    operand: nextValue,
    operator: button,
    isNextClear: true,
  }
}

// ドットが押された判別
function isDotButton(button: string) {
  return button === "."
}
// ドットかどうか
function handleDotButton(state: State): State {
  // 今.があるかどうか -1以外（.がある場合）
  if (state.current.indexOf('.') !== -1) {
    return state
  }
  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  }
}

// 削除が押された判別
function isDeleteButton(button: string) {
  return button === "D";
}
// 削除かどうか
function handleDeleteButton(state: State): State {
  if (state.current.length === 1) { // 1だったら0に
    return {
      current: "0",
      operand: state.operand, //以下変化なし
      operator: state.operator,
      isNextClear: false,
    }
  }
  return {
    current: state.current.substring(0, state.current.length - 1), //最後の1文字del
    operand: state.operand, //以下変化なし
    operator: state.operator,
    isNextClear: false,
  }
}

// ACが押された判別
function isAllClearButton(button: string) {
  return button === "AC";
}
// ACかどうか
function handleAllClearButton(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  }
}

// =が押された判別
function isEqualButton(button: string) {
  return button === "=";
}
// =かどうか
function handleEqualButton(state: State): State {
  if (state.operator === null) {
    return state
  }
  const nextValue = operate(state)
  return {
    current: `${nextValue}`,
    operand: 0,
    operator: null,
    isNextClear: true,
  }
}

// オペレーター,=で使用しているでoperate()関数の処理

function operate(state: State): number {
  const current = parseFloat(state.current); // 数値に変換
  if (state.operator === "+") {
    return state.operand + current;
  }
  if (state.operator === "-") {
    return state.operand - current;
  }
  return current;
  
}
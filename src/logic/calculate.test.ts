
import '@testing-library/react';
import calculate, { ButtonCode } from './calculate';

// 初期状態を作る関数
function makeInitState(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  }
}

// calculateを変化させる関数 ...  forEachまわす、calculateで状態を更新し、最終状態をreturn する
function execCalc(buttons: ButtonCode[], state: State): State {
  buttons.forEach((button) => {
    state = calculate(button, state)
  })
  return state
}

// 動作確認用のテスト
test("sample", () => {
  const finalState = execCalc(["1", "+", "2", "="], makeInitState());
  expect(finalState.current).toBe("3");
  expect(finalState.operand).toBe(0);
  expect(finalState.operator).toBe(null);
  expect(finalState.isNextClear).toBe(true);
})

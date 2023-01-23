// 「どの状態のときにどのボタンを押すと、どの状態になる」関数
export default function calculate(button: String, state: State): State {
  return state;
  // 条件が入る
}

export interface State {
  current: String; //現在の数値
  operand: Number; //数値
  operator: String | null; // プラスマイナスか
  ixNextClear: boolean; // クリアのフラグ
}
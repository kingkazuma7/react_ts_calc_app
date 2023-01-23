import { useState } from "react";
import calculate, { State } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";

export default function Calculator() {
  const [state, setState] = useState<State>({
    current: "0",
    operand: 0,
    operator: null,
    ixNextClear: false,
  })
  const buttonHandler = (code: String) => {
    calculate(code, state)
    setState(nextState);
  }
  return (
    <div>
      <Display />
      <ButtonPanel buttonHandler={buttonHandler} />
    </div>
  );
}
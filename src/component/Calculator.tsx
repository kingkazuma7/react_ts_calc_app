import ButtonPanel from "./ButtonPanel";
import Display from "./Display";

export default function Calculator() {
  
  const buttonHandler = (code: String) => {
    console.log(code);
  }
  return (
    <div>
      <Display />
      <ButtonPanel buttonHandler={buttonHandler} />
    </div>
  );
}
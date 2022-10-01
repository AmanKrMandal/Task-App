import { useLottie } from "lottie-react";
import Task from "./Taskdone.json";

function Taskdone() {
  const options = {
    animationData: Task,
    loop: true,
  };
  const { View } = useLottie(options);
  return <>{View}</>;
}

export default Taskdone;

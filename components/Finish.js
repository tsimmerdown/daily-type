import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
import { getWords } from "../pages/api/getWords";
import { useWordList } from "../context/wordListContext";
import { useOptions } from "../context/optionsContext";
import { useWordCounter } from "../context/wordCounterContext";
import { useEffect, useState } from "react";
import moment from "moment";

const FinishCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Restart = styled(VscDebugRestart)`
  margin: 3rem;
  width: 2rem;
  height: 2rem;
`;

const Finish = ({
  finish,
  setFinish,
  setStart,
  setInputList,
  errorCounter,
  setErrorCounter,
  currTime,
}) => {
  const { dispatch } = useWordList();
  const { options } = useOptions();
  const { wordCounter, wordCounterDispatch } = useWordCounter();

  const [finalWPM, setFinalWPM] = useState(0);

  const calculateWPM = () => {
    let totalCorrect = wordCounter - errorCounter;
    let wpm = 0;
    if (options.option == "words") {
      let finishTime = moment();
      let timeDiff = finishTime.diff(currTime) / 60000;
      wpm = totalCorrect / timeDiff;
    } else {
      let conversion = 60 / options.subOption;
      wpm = totalCorrect * conversion;
    }
    setFinalWPM(wpm.toFixed(2));
  };

  useEffect(() => {
    calculateWPM();
  }, [finish]);

  const handleRestart = async () => {
    const words = await getWords(options.subOption);
    setFinish(false);
    setStart(false);
    dispatch({ type: "SET_WORDS", payload: words });
    setErrorCounter(0);
    wordCounterDispatch({ type: "RESET" });
    setInputList([]);
  };

  return (
    <FinishCont>
      WPM: {finalWPM}
      <Restart onClick={handleRestart} />
    </FinishCont>
  );
};

export default Finish;

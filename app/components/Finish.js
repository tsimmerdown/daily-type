import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
import { getWords } from "../pages/api/getWords";
import { useWordList } from "../context/wordListContext";
import { useOptions } from "../context/optionsContext";
import { useWordCounter } from "../context/wordCounterContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { useCharacterCount } from "../context/characterCountContext";

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
  setErrorCounter,
  currTime,
  setIsLoading,
}) => {
  const { dispatch } = useWordList();
  const { options } = useOptions();
  const { wordCounterDispatch } = useWordCounter();
  const { characterCount } = useCharacterCount();

  const [finalWPM, setFinalWPM] = useState(0);

  const calculateWPM = () => {
    let total = characterCount.totalCount / 5 - characterCount.errorCount;
    let wpm = 0;
    if (options.option == "words") {
      let finishTime = moment();
      let timeDiff = finishTime.diff(currTime) / 60000;
      wpm = total / timeDiff;
    } else {
      wpm = (total * 60) / options.subOption;
    }

    setFinalWPM(wpm > 0 ? wpm.toFixed(2) : 0);
  };

  useEffect(() => {
    calculateWPM();
  }, [finish]);

  const handleRestart = async () => {
    setIsLoading(true);
    const optionProps = options.option === "words" ? options.subOption : "100";
    const words = await getWords(optionProps);
    setFinish(false);
    setStart(false);
    dispatch({ type: "SET_WORDS", payload: words });
    setErrorCounter(0);
    wordCounterDispatch({ type: "RESET" });
    setInputList([]);
    setIsLoading(false);
  };

  return (
    <FinishCont>
      WPM: {finalWPM}
      <Restart onClick={handleRestart} />
    </FinishCont>
  );
};

export default Finish;

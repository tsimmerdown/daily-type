import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
import { getWords } from "../pages/api/getWords";
import { useWordList } from "../context/wordListContext";

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

const Finish = ({ setFinish, setStart, setInputList }) => {
  const { options, dispatch } = useWordList();

  const calculateWPM = () => {};

  const handleRestart = async () => {
    const words = await getWords(options.subOption);
    setFinish(false);
    setStart(false);
    dispatch({ type: "SET_WORDS", payload: words });
    setInputList([]);
  };

  return (
    <FinishCont>
      congratz you fast af boi
      <Restart onClick={handleRestart} />
    </FinishCont>
  );
};

export default Finish;

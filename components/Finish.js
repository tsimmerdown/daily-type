import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
import { getWords } from "../pages/api/getWords";

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

const Finish = ({ setFinish, setStart, option, setWordList, setInputList }) => {
  const calculateWPM = () => {};

  const handleRestart = async () => {
    const words = await getWords(option.subOption);
    setFinish(false);
    setStart(false);
    setWordList(words);
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

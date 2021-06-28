import { useState } from "react";
import styled from "styled-components";
import Counter from "../components/Counter";
import Header from "../components/Header";
import MainInput from "../components/UserInput/MainInput";
import Options from "../components/Options/Options";

const MainCont = styled.div``;

const main = () => {
  const [wordList, setWordList] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [wordCounter, setWordCounter] = useState(0);
  const [option, setOption] = useState({
    option: "time",
    subOption: "30",
  });
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  return (
    <div>
      <Header />
      <Counter
        option={option}
        wordCounter={wordCounter}
        start={start}
        setFinish={setFinish}
        setStart={setStart}
      />
      <MainInput
        option={option}
        setOption={setOption}
        wordList={wordList}
        setWordList={setWordList}
        inputList={inputList}
        setInputList={setInputList}
        wordCounter={wordCounter}
        setWordCounter={setWordCounter}
        start={start}
        setStart={setStart}
        finish={finish}
        setFinish={setFinish}
      />
      <Options
        option={option}
        setOption={setOption}
        setWordList={setWordList}
        setInputList={setInputList}
        setStart={setStart}
      />
    </div>
  );
};

export default main;

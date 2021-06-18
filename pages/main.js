import { useState } from "react";
import styled from "styled-components";
import Counter from "../components/Counter";
import Header from "../components/Header";
import MainInput from "../components/MainInput";
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

  return (
    <div>
      <Header />
      <Counter option={option} wordCounter={wordCounter} />
      <MainInput
        option={option}
        setOption={setOption}
        wordList={wordList}
        setWordList={setWordList}
        inputList={inputList}
        setInputList={setInputList}
        wordCounter={wordCounter}
        setWordCounter={setWordCounter}
      />
      <Options
        option={option}
        setOption={setOption}
        setWordList={setWordList}
        setInputList={setInputList}
      />
    </div>
  );
};

export default main;

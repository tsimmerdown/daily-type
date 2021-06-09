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

  const [option, setOption] = useState({
    option: "time",
    subOption: "30",
  });

  return (
    <div>
      <Header />
      <Counter wordList={wordList} inputList={inputList} option={option} />
      <MainInput
        option={option}
        setOption={setOption}
        wordList={wordList}
        setWordList={setWordList}
      />
      <Options
        option={option}
        setOption={setOption}
        setWordList={setWordList}
      />
    </div>
  );
};

export default main;

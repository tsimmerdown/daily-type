import { useEffect } from "react";
import styled from "styled-components";
import { getWords } from "../../api";
// import { getWords } from "../../pages/api/getWords";
import Option from "./Option";
import { useWordList } from "../../context/wordListContext";
import { useOptions } from "../../context/optionsContext";
import { useWordCounter } from "../../context/wordCounterContext";

const OptionCont = styled.div`
  position: absolute;
  left: 9rem;
  bottom: 4rem;
  color: #5b5b5b;
`;

const SubOptionCont = styled.div`
  display: flex;
`;

const Options = (props) => {
  const { dispatch } = useWordList();
  const { options } = useOptions();
  const { wordCounterDispatch } = useWordCounter();

  useEffect(() => {
    props.setIsLoading(true);
    const getWordList = async () => {
      const optionProps =
        options.option === "words" ? options.subOption : "100";
      const words = await getWords(optionProps);
      dispatch({ type: "SET_WORDS", payload: words });
      wordCounterDispatch({ type: "RESET" });
      props.setErrorCounter(0);
      props.setInputList([]);
      props.setStart((state) => state && false);
      props.setIsLoading(false);
    };

    getWordList();
  }, [options]);

  return (
    <OptionCont>
      <div style={{ display: "flex" }}>
        <Option label="time" {...props} />
        <Option label="words" {...props} />
      </div>
      {options.option === "words" ? (
        <SubOptionCont>
          <Option label="10" sub {...props} />
          <Option label="25" sub {...props} />
          <Option label="50" sub {...props} />
          <Option label="100" sub {...props} />
        </SubOptionCont>
      ) : (
        <SubOptionCont>
          <Option label="15" sub {...props} />
          <Option label="30" sub {...props} />
          <Option label="60" sub {...props} />
          <Option label="120" sub {...props} />
        </SubOptionCont>
      )}
    </OptionCont>
  );
};

export default Options;

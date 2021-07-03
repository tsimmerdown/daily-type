import { createContext, useContext, useReducer } from "react";

const WordCounterContext = createContext();

const WordCounterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return (state += 1);
    }
    case "RESET": {
      return (state = 0);
    }
    default: {
      throw new Error("unhandled action");
    }
  }
};

const WordCounterProvider = ({ children }) => {
  const [wordCounter, wordCounterDispatch] = useReducer(WordCounterReducer, 0);
  const value = { wordCounter, wordCounterDispatch };
  return (
    <WordCounterContext.Provider value={value}>
      {children}
    </WordCounterContext.Provider>
  );
};

const useWordCounter = () => {
  const context = useContext(WordCounterContext);
  if (context === undefined) {
    throw new Error("must be used inside Provider");
  }
  return context;
};

export { WordCounterProvider, useWordCounter };

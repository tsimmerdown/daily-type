import { createContext, useContext, useReducer } from "react";

const WordListContext = createContext();

const wordListReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORDS": {
      return { wordList: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const WordListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordListReducer, { wordList: [] });

  const value = { state, dispatch };
  return (
    <WordListContext.Provider value={value}>
      {children}
    </WordListContext.Provider>
  );
};

const useWordList = () => {
  const context = useContext(WordListContext);
  if (context === undefined) {
    throw new Error("useWordList must be used inside WordListProvider");
  }
  return context;
};

export { WordListProvider, useWordList };

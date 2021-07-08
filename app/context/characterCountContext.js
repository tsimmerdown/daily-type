import { createContext, useContext, useReducer } from "react";

const CharacterCountContext = createContext();

const characterCountReducer = (characterCount, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return {
        totalCount: (characterCount.totalCount += 1),
        errorCount: characterCount.errorCount,
      };
    }
    case "DECREMENT": {
      return {
        totalCount: (characterCount.totalCount -= 1),
        errorCount: characterCount.errorCount,
      };
    }
    case "DECREMENT_ERROR": {
      return {
        totalCount: (characterCount.totalCount -= 1),
        errorCount: (characterCount.errorCount -= 1),
      };
    }
    case "INCORRECT": {
      return {
        totalCount: (characterCount.totalCount += 1),
        errorCount: (characterCount.errorCount += 1),
      };
    }
    case "RESET": {
      return { totalCount: 0, errorCount: 0 };
    }
    default: {
      throw new Error("unhandled action type");
    }
  }
};

const CharacterCountProvider = ({ children }) => {
  const [characterCount, characterCountDispatch] = useReducer(
    characterCountReducer,
    { totalCount: 0, errorCount: 0 }
  );

  const value = { characterCount, characterCountDispatch };

  return (
    <CharacterCountContext.Provider value={value}>
      {children}
    </CharacterCountContext.Provider>
  );
};

const useCharacterCount = () => {
  const context = useContext(CharacterCountContext);

  if (context == undefined) {
    throw new Error(
      "useCharacterCount must be used inside CharacterCountProvider"
    );
  }

  return context;
};

export { CharacterCountProvider, useCharacterCount };

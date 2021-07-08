import { createContext, useContext, useReducer } from "react";

const OptionsContext = createContext();

const OptionsReducer = (options, action) => {
  switch (action.type) {
    case "SET_SUBOPTION": {
      options = { option: options.option, subOption: action.payload };
      return options;
    }
    case "SET_OPTION": {
      options = action.payload;
      return options;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const OptionsProvider = ({ children }) => {
  const [options, optionsDispatch] = useReducer(OptionsReducer, {
    option: "time",
    subOption: "30",
  });

  const value = { options, optionsDispatch };

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
};

const useOptions = () => {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error("useOptions must be used inside OptionsProvider");
  }

  return context;
};

export { OptionsProvider, useOptions };

import { createContext, useReducer } from "react";

export const accountContext = createContext({});

export default function AccountContextProvider({ children }) {
  const [accountState, dispatch] = useReducer(accountReducer, INITIAL_VALUES);

  return (
    <accountContext.Provider value={{ accountState, dispatch }}>
      {children}
    </accountContext.Provider>
  );
}

const INITIAL_VALUES = {
  accountBalances: null,
  userKeypair: null,
  loading: false,
};

export function accountReducer(state = INITIAL_VALUES, { type, payload }) {
  switch (type) {
    case "SET_ACCOUNT_LOADING":
      return {
        ...state,
        accountBalances: null,
        loading: true,
        userKeypair: null,
      };
    case "SET_ACCOUNT":
      return {
        ...state,
        accountBalances: null,
        loading: false,
        userKeypair: payload,
      };
    case "ACCOUNT_RESET_STATE":
      return {
        ...state,
        accountBalances: null,
        loading: false,
        userKeypair: null,
      };
    case "UPDATE_ACCOUNT_BALANCES":
      return {
        ...state,
        accountBalances: payload,
      };
  }
}

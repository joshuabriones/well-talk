"use client";

import ContextWrapper from "@/context/ContextWrapper";
import GlobalContext from "@/context/GlobalContext";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }) => {
  const globalContextValue = {}; // Provide the actual context value here

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <ContextWrapper>
        <Toaster position="top-center" />
        {children}
      </ContextWrapper>
    </GlobalContext.Provider>
  );
};

export default Provider;

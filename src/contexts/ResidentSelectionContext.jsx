/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

const ResidentSelectionContext = createContext({ setSelectedResident: null });

export function ResidentSelectionProvider({ children, value }) {
  return (
    <ResidentSelectionContext.Provider value={value}>
      {children}
    </ResidentSelectionContext.Provider>
  );
}

export function useResidentSelection() {
  return useContext(ResidentSelectionContext);
}

export default ResidentSelectionContext;

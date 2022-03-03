import { createContext, useContext, useState } from "react";

const MobileNavbarContext = createContext(null);

export const useMobileNavbar = () => {
  const context = useContext(MobileNavbarContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a MobileNavbarProvider");
  }
  return context;
};

export const MobileNavbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <MobileNavbarContext.Provider value={{ isOpen, toggle, setIsOpen }}>
      {children}
    </MobileNavbarContext.Provider>
  );
};

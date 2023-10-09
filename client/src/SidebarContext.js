import React, { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const contextValue = {
    isCollapsed,
    setIsCollapsed,
    showSidebar,
    setShowSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

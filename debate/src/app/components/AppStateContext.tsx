// AppStateContext.tsx
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Define the shape of the context
interface AppStateContextProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  response: string | null;
  setResponse: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  history: Array<string>;
  appendToLog: (t: string) => void
}

// Create context
const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const appendToLog = (text) => {
    setHistory(current => [...current, text]);
  }

    // Memoize the context value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        inputText,
        setInputText,
        response,
        setResponse,
        isLoading,
        setIsLoading,
        history,
        appendToLog
      }), [response, isLoading, inputText, history]);
    
    

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
// Export custom hook
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within an AppStateProvider');
  return context;
};

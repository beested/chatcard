'use client';
import runChat from '@/components/config/gemini';
import { createContext, ReactNode, useState } from 'react';

interface ContextProps {
  input: string;
  setInput: (value: string) => void;
  recentPrompt: string;
  setRecentPrompt: (value: string) => void;
  prevPrompts: string[];
  setPrevPrompts: (value: string[]) => void;
  showResult: boolean;
  setShowResult: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  resultData: any;
  setResultData: (value: any) => void;
  onSent: (prompt: string) => Promise<void>;
}

// Valor padrão para Context
const defaultContextValue: ContextProps = {
  input: '',
  setInput: () => {},
  recentPrompt: '',
  setRecentPrompt: () => {},
  prevPrompts: [],
  setPrevPrompts: () => {},
  showResult: false,
  setShowResult: () => {},
  loading: false,
  setLoading: () => {},
  resultData: null,
  setResultData: () => {},
  onSent: async () => {},
};

export const Context = createContext<ContextProps>(defaultContextValue);

const ContextProvider = (props: { children: ReactNode }) => {
  const [input, setInput] = useState<string>('');
  const [recentPrompt, setRecentPrompt] = useState<string>('');
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any>(null);

  const onSent = async () => {
    setResultData('');
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const response = await runChat(input);
    let responseArray = response.split('**');
    let newResponse = ''; // Inicialize como uma string vazia

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += '<b>' + responseArray[i] + '</b>';
      }
    }

    let newResponse2 = newResponse.split('*').join('</br>');
    setResultData(newResponse2);
    setLoading(false);
    setInput('');
  };

  const contextValue: ContextProps = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

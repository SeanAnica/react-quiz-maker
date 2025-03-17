import { createContext, useContext } from 'react';
import { QuizContextType } from '../context/QuizContext';

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('No context found : useQuiz must be used within a QuizProvider');
  }
  return context;
};

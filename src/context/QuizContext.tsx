import { createContext, ReactNode, useContext, useState } from 'react';
import { ShuffledQuestionType } from '../types/ShuffledQuestionsType';

type QuizContextType = {
  questions: ShuffledQuestionType[];
  setQuestions: (questions: ShuffledQuestionType[]) => void;
  userAnswers: Record<number, string>;
  setUserAnswer: (questionIndex: number, answer: string) => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export type QuizProviderProps = {
  children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [questions, setQuestions] = useState<ShuffledQuestionType[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const setUserAnswer = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const resetQuiz = () => {
    setQuestions([]);
    setUserAnswers({});
  };

  return (
    <QuizContext.Provider
      value={{ questions, setQuestions, userAnswers, setUserAnswer, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('No context found : useQuiz must be used within a QuizProvider');
  }
  return context;
};

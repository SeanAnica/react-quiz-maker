import { JSX, ReactNode, useState } from 'react';
import { ShuffledQuestionType } from '../types/ShuffledQuestionsType';
import { QuizContext } from '../hooks/useQuiz';

export type QuizContextType = {
  questions: ShuffledQuestionType[];
  setQuestions: (questions: ShuffledQuestionType[]) => void;
  userAnswers: Record<number, string>;
  setUserAnswer: (questionIndex: number, answer: string) => void;
  resetQuiz: () => void;
};

export type QuizProviderProps = {
  children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderProps): JSX.Element => {
  const [questions, setQuestions] = useState<ShuffledQuestionType[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const setUserAnswer = (questionIndex: number, answer: string): void => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const resetQuiz = (): void => {
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

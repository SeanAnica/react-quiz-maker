/**
 * Type QuestionType qui représente une question du quiz.
 */
export type QuestionType = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

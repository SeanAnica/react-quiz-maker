/**
 * interface Question qui représente une question du quiz.
 */
export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

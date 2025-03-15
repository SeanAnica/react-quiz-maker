import { Question } from '../interfaces/Question';
/**
 * Type ShuffledQuestionType qui vient ajouter la liste des réponses
 * qu'on pourra mélanger par la suite.
 */
export type ShuffledQuestionType = Question & { allAnswers: string[] };

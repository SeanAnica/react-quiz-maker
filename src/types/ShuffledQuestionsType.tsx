import { QuestionType } from './QuestionType';
/**
 * Type ShuffledQuestionType qui vient ajouter la liste des réponses
 * qu'on pourra mélanger par la suite.
 */
export type ShuffledQuestionType = QuestionType & { allAnswers: string[] };

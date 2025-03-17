import { QuestionType } from '../types/QuestionType';

export type QuestionsApiResponse = {
  response_code: number;
  results: QuestionType[];
};

const QUIZ_API_URL_BASE = 'https://opentdb.com/api.php';

/**
 * Récupère une liste de questions selon la trivia catégorie et le niveau de difficulté.
 * @param categoryId identifiant de la catégorie.
 * @param difficulty niveau de difficulté.
 * @param amount nombre de questions à récupérer (par défaut à 5).
 * @returns liste de questions.
 */
export const getQuestions = async (
  categoryId: number,
  difficulty: string,
  amount: number = 5,
): Promise<QuestionType[]> => {
  const url: string = `${QUIZ_API_URL_BASE}?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
  try {
    const apiResponse = await fetch(url);
    const questionsApiResponse: QuestionsApiResponse = await apiResponse.json();
    if (questionsApiResponse.response_code !== 0) {
      throw new Error('No questions found for these parameters.');
    }
    return questionsApiResponse.results;
  } catch (error: unknown) {
    console.log('error : ' + JSON.stringify(error));
    throw new Error('Unable to retrieve the quiz questions.');
  }
};

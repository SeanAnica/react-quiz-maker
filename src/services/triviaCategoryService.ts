import { TriviaCategory } from '../interfaces/TriviaCategory';

export type TriviaCategories = {
  trivia_categories: TriviaCategory[];
};

const TRIVIA_CATEGORIES_API_URL = 'https://opentdb.com/api_category.php';

/**
 * Récupère la liste des triviaCategories de l'url donnée dans le sujet d'examen.
 * @returns La liste des trivia categories.
 */
export const getTriviaCategories = async (): Promise<TriviaCategory[]> => {
  try {
    const apiResponse = await fetch(TRIVIA_CATEGORIES_API_URL);
    const categories: TriviaCategories = await apiResponse.json();
    return categories.trivia_categories;
  } catch (error: unknown) {
    console.log('error : ' + JSON.stringify(error));
    throw new Error('Unable to retrieve the Trivia categories.');
  }
};

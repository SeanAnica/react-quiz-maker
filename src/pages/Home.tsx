import { JSX, useEffect, useState } from 'react';
import { TriviaCategoryType } from '../types/TriviaCategoryType';
import { DifficultyLevelType } from '../types/DifficultyLevelType';
import { getTriviaCategories } from '../services/triviaCategoryService';
import { getDifficultyLevels } from '../services/difficultyLevelsService';
import Quiz from '../components/Quiz';
import { getQuestions } from '../services/quizQuestionsService';
import { useQuiz } from '../hooks/useQuiz';
import { ShuffledQuestionType } from '../types/ShuffledQuestionsType';

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const Home = (): JSX.Element => {
  const { setQuestions } = useQuiz();
  const [triviaCategories, setTriviaCategories] = useState<TriviaCategoryType[]>([]);
  const [difficultyLevels, setDifficultyLevels] = useState<DifficultyLevelType[]>([]);
  const [selectedTriviaCategory, setSelectedTriviaCategory] = useState<TriviaCategoryType | null>(
    null,
  );
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] =
    useState<DifficultyLevelType | null>(null);

  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  useEffect(() => {
    // liste des catégories
    getTriviaCategories()
      .then((categories) => {
        setTriviaCategories(categories);
      })
      .catch((error) => {
        console.error('failed to load categories : ' + error);
      });

    // liste des niveaux de difficulté
    const levels = getDifficultyLevels();
    setDifficultyLevels(levels);
  }, []);

  const handleTriviaCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value: number = Number(event.target.value);
    const selectedValue = triviaCategories.find((c) => c.id === value);
    setSelectedTriviaCategory(selectedValue ?? null);
  };

  const handleDifficultyLevelChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    const selectedValue = difficultyLevels.find((c) => c.code === value);
    setSelectedDifficultyLevel(selectedValue ?? null);
  };

  const handleCreateQuiz = (): void => {
    if (selectedTriviaCategory && selectedDifficultyLevel) {
      // Charger les questions
      getQuestions(selectedTriviaCategory.id, selectedDifficultyLevel.code)
        .then((data) => {
          // On ajoute la liste de réponses mélangées.
          const shuffledQuestions: ShuffledQuestionType[] = data.map((q) => ({
            ...q,
            allAnswers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
          }));
          setQuestions(shuffledQuestions);
          setShowQuiz(true);
        })
        .catch((err) => console.error(err));
    } else {
      console.error('Please select both a category and a difficulty level.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-blue-500">Quiz Maker</h1>
        <div className="flex gap-5 pt-5">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 hover:bg-gray-50 transition duration-300"
            id="categorySelect"
            onChange={handleTriviaCategoryChange}
          >
            <option value="">Select a category</option>
            {triviaCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 hover:bg-gray-50 transition duration-300"
            id="difficultySelect"
            onChange={handleDifficultyLevelChange}
          >
            <option value="">Select a difficulty</option>
            {difficultyLevels.map((difficulty) => (
              <option key={difficulty.code} value={difficulty.code}>
                {difficulty.label}
              </option>
            ))}
          </select>
          <button
            id="createBtn"
            onClick={handleCreateQuiz}
            disabled={selectedDifficultyLevel === null || selectedTriviaCategory === null}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
        {showQuiz && <Quiz />}
      </div>
    </div>
  );
};

export default Home;

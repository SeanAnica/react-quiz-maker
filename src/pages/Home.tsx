import { useEffect, useState } from 'react';
import { TriviaCategory } from '../interfaces/TriviaCategory';
import { DifficultyLevel } from '../interfaces/DifficultyLevel';
import { getTriviaCategories } from '../services/triviaCategoryService';
import { getDifficultyLevels } from '../services/difficultyLevelsService';
import Quiz from '../components/Quiz';
import { getQuestions } from '../services/quizQuestionsService';
import { Question } from '../interfaces/Question';

const Home = () => {
  const [triviaCategories, setTriviaCategories] = useState<TriviaCategory[]>([]);
  const [difficultyLevels, setDifficultyLevels] = useState<DifficultyLevel[]>([]);

  const [selectedTriviaCategory, setSelectedTriviaCategory] = useState<TriviaCategory | null>(null);
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<DifficultyLevel | null>(
    null,
  );

  const [questions, setQuestions] = useState<Question[]>([]);
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
    const getDifficulties = () => {
      const levels = getDifficultyLevels();
      setDifficultyLevels(levels);
    };
    getDifficulties();
  }, []);

  const handleTriviaCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = Number(event.target.value);
    const selectedValue = triviaCategories.find((c) => c.id === value);
    setSelectedTriviaCategory(selectedValue ?? null);
  };

  const handleDifficultyLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    const selectedValue = difficultyLevels.find((c) => c.code === value);
    setSelectedDifficultyLevel(selectedValue ?? null);
  };

  const handleCreateQuiz = () => {
    if (selectedTriviaCategory && selectedDifficultyLevel) {
      // Charger les questions
      getQuestions(selectedTriviaCategory.id, selectedDifficultyLevel.code)
        .then((data) => {
          setQuestions(data);
          setShowQuiz(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('Please select both a category and a difficulty level.');
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
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer"
          >
            Create
          </button>
        </div>
        {showQuiz && <Quiz questions={questions} />}
      </div>
    </div>
  );
};

export default Home;

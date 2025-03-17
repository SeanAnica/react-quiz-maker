import { JSX } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { ShuffledQuestionType } from '../types/ShuffledQuestionsType';
import Question from './Question';
import { useNavigate } from 'react-router';

const Quiz = (): JSX.Element => {
  const { questions, userAnswers, setUserAnswer } = useQuiz();

  const navigate = useNavigate();

  const handleAnswerSelect = (questionIndex: number, answer: string): void => {
    setUserAnswer(questionIndex, answer);
  };

  const handleSubmit = (): void => {
    navigate('/quiz-result');
  };

  const allAnswered = Object.keys(userAnswers).length === questions.length;

  return (
    <div className="flex flex-col gap-5 py-10">
      {questions.map((q: ShuffledQuestionType, index: number) => (
        <Question
          key={index}
          question={q.question}
          answers={q.allAnswers}
          onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
          selectedAnswer={userAnswers[index] || null}
          displayResults={false}
          correctAnswer={q.correct_answer}
        />
      ))}

      {allAnswered && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Quiz;

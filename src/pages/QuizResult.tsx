import { Link } from 'react-router';
import Question from '../components/Question';
import NotFound from './NotFound';
import { ShuffledQuestionType } from '../types/ShuffledQuestionsType';
import { JSX } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuizScore from '../components/QuizScore';

const QuizResult = (): JSX.Element => {
  const { questions, userAnswers, resetQuiz } = useQuiz();

  if (questions.length === 0) {
    return <NotFound message="You did not submit any quiz answers!" title="Error" />;
  }

  const score: number = questions.reduce(
    (acc, question, index) => acc + (userAnswers[index] === question.correct_answer ? 1 : 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-2 pb-5">
        <h1 className="text-6xl font-bold text-blue-500">Quiz Maker</h1>
        <h2 className="text-4xl font-bold text-blue-400">Results</h2>
        <div className="flex flex-col gap-5 py-10">
          {questions.map((q: ShuffledQuestionType, index: number) => (
            <Question
              key={index}
              question={q.question}
              answers={q.allAnswers}
              onAnswerSelect={() => {}}
              selectedAnswer={userAnswers[index] || null}
              displayResults={true}
              correctAnswer={q.correct_answer}
            />
          ))}
        </div>
        <QuizScore score={score} questionsQuantity={questions.length} />
        <Link
          to="/"
          onClick={resetQuiz}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Create a new quiz
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;

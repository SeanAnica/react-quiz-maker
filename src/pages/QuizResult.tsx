import { Link, useLocation } from 'react-router';
import Question from '../components/Question';
import { Question as QuestionType } from '../interfaces/Question';
import NotFound from './NotFound';

type LocationState = {
  questions: QuestionType[];
  userAnswers: Record<number, string>;
};

const QuizResult = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state || !state.questions || !state.userAnswers) {
    return <NotFound message="You did not submit any quiz answers !" title="Error" />;
  }

  const { questions, userAnswers } = state;

  const score = questions.reduce((acc, question, index) => {
    return acc + (userAnswers[index] === question.correct_answer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-6xl font-bold text-blue-500">Quiz Maker</h1>
        <h2 className="text-4xl font-bold text-blue-400">Results</h2>
        <div className="flex flex-col gap-5 py-10">
          {questions.map((q: QuestionType, index: number) => (
            <Question
              key={index}
              question={q.question}
              answers={[...q.incorrect_answers, q.correct_answer]}
              onAnswerSelect={() => {}}
              selectedAnswer={userAnswers[index] || null}
              displayResults={true}
              correctAnswer={q.correct_answer}
            />
          ))}
        </div>
        <p
          className={`text-2xl font-semibold text-gray-700 rounded-full px-2 ${
            score <= 1 ? 'bg-red-300' : score <= 3 ? 'bg-yellow-300' : 'bg-green-300'
          }`}
        >
          You scored&nbsp;
          <span
            className={`${score <= 1 ? 'text-red-600' : score <= 3 ? 'text-yellow-600' : 'text-green-600'}`}
          >
            {score}
          </span>
          &nbsp;out of&nbsp;
          <span
            className={`${score <= 1 ? 'text-red-600' : score <= 3 ? 'text-yellow-600' : 'text-green-600'}`}
          >
            {questions.length}
          </span>
        </p>

        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Create a new quiz
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;

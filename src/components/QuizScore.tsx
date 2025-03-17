import { JSX } from 'react';

type QuizScoreProps = {
  score: number;
  questionsQuantity: number;
};

const QuizScore = ({ score, questionsQuantity }: QuizScoreProps): JSX.Element => {
  const bgColor = score <= 1 ? 'bg-red-300' : score <= 3 ? 'bg-yellow-300' : 'bg-green-300';
  const textColor = score <= 1 ? 'text-red-600' : score <= 3 ? 'text-yellow-600' : 'text-green-600';

  return (
    <p className={`text-2xl font-semibold text-gray-700 rounded-full px-2 ${bgColor}`}>
      You scored&nbsp;
      <span className={textColor}>{score}</span>
      &nbsp;out of&nbsp;
      <span className={textColor}>{questionsQuantity}</span>
    </p>
  );
};

export default QuizScore;

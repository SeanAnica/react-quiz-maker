import { JSX } from 'react';

type QuestionProps = {
  question: string;
  answers: string[];
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  displayResults: boolean;
  correctAnswer: string;
};

const Question = ({
  question,
  answers,
  onAnswerSelect,
  selectedAnswer,
  displayResults,
  correctAnswer,
}: QuestionProps): JSX.Element => {
  const readHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || '';
  };

  const getAnswerClass = (answer: string): string => {
    if (displayResults) {
      if (answer === correctAnswer) return 'bg-green-500 text-white';
      if (answer === selectedAnswer) return 'bg-red-500 text-white';
      return 'bg-gray-200';
    }

    return selectedAnswer === answer ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300';
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold">{readHtml(question)}</h2>
      <ul className="flex gap-5">
        {answers.map((answer, index) => (
          <li key={index} className="py-1">
            <button
              onClick={() => onAnswerSelect(answer)}
              className={`py-2 px-4 rounded ${getAnswerClass(answer)}`}
              disabled={displayResults}
            >
              {readHtml(answer)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

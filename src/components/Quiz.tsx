import { useEffect, useState } from 'react';
import { Question as QuestionType } from '../interfaces/Question';
import Question from './Question';
import { useNavigate } from 'react-router';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

type QuizProps = {
  questions: QuestionType[];
};

const Quiz = ({ questions }: QuizProps) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const [shuffledAnswers, setShuffledAnswers] = useState<string[][]>([]);

  useEffect(() => {
    setShuffledAnswers(
      questions.map((q) => shuffleArray([...q.incorrect_answers, q.correct_answer])),
    );
  }, [questions]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate('/quiz-result', {
      state: { questions, userAnswers, shuffledAnswers },
    });
  };

  const allAnswered = Object.keys(userAnswers).length === questions.length;

  return (
    <div className="flex flex-col gap-5 py-10">
      {questions.map((q, index) => (
        <Question
          key={index}
          question={q.question}
          answers={shuffledAnswers[index] || []}
          onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
          selectedAnswer={userAnswers[index] || null}
          displayResults={false}
          correctAnswer={q.correct_answer}
        />
      ))}

      {!isSubmitted && allAnswered && (
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

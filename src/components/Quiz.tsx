import { useEffect, useState } from 'react';
import { Question as QuestionType } from '../interfaces/Question';
import Question from './Question';
import { useNavigate } from 'react-router';

export type ShuffledQuestion = QuestionType & { allAnswers: string[] };

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

type QuizProps = {
  questions: QuestionType[];
};

const Quiz = ({ questions }: QuizProps) => {
  const [quizData, setQuizData] = useState<ShuffledQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Mélanger les réponses une seule fois
    const shuffledQuestions: ShuffledQuestion[] = questions.map((q) => ({
      ...q,
      allAnswers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
    }));
    setQuizData(shuffledQuestions);
  }, [questions]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    navigate('/quiz-result', {
      state: { questions: quizData, userAnswers },
    });
  };

  const allAnswered = Object.keys(userAnswers).length === quizData.length;

  return (
    <div className="flex flex-col gap-5 py-10">
      {quizData.map((q, index) => (
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

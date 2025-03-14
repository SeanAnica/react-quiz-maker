import { Link } from 'react-router';

const QuizzResult = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-6xl font-bold text-blue-500">Quiz Maker</h1>
        <h2 className="text-4xl font-bold text-blue-400">Results</h2>
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

export default QuizzResult;

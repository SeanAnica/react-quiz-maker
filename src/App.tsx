import { RouterProvider } from 'react-router';
import './App.css';
import router from './routes';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  );
}

export default App;

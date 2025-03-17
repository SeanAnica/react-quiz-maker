import { RouterProvider } from 'react-router';
import './App.css';
import router from './routes';
import { QuizProvider } from './context/QuizContext';
import { JSX } from 'react';

function App(): JSX.Element {
  return (
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  );
}

export default App;

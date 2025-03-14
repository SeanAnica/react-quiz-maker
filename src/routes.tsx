import { createBrowserRouter } from 'react-router'; // ✅ Correction
import Home from './pages/Home';
import QuizzResult from './pages/QuizzResult';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/quizz-result',
      Component: QuizzResult,
    },
    {
      path: '/',
      Component: Home,
    },
    {
      path: '*',
      Component: NotFound,
    },
  ],
  { basename: '/react-quiz-maker' },
);

export default router;

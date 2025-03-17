import { createBrowserRouter } from 'react-router'; // 🛣️ utilisation de React-Router pour la gestion des routes.
import Home from './pages/Home';
import QuizResult from './pages/QuizResult';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/quiz-result',
      Component: QuizResult,
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
  { basename: '/react-quiz-maker/' },
);

export default router;

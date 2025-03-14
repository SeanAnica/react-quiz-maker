import { Link } from 'react-router';

const Home = () => {
  return (
    <div>
      <h1>Page d'Accueil</h1>
      <Link to="quizz-result">Résultat du quizz</Link>;
    </div>
  );
};

export default Home;

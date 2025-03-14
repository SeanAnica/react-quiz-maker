import { DifficultyLevel } from '../interfaces/DifficultyLevel';

/**
 * On fait comme si la liste venait d'un back-end fictif en l'isolant dans un service.
 * @returns La liste des difficultés
 */
export const getDifficultyLevels = (): DifficultyLevel[] => {
  return [
    { code: 'EASY', label: 'Easy' },
    { code: 'MEDIUM', label: 'Medium' },
    { code: 'HARD', label: 'Hard' },
  ];
};

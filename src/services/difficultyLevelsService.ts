import { DifficultyLevelType } from '../types/DifficultyLevelType';

/**
 * On fait comme si la liste venait d'un back-end fictif en l'isolant dans un service.
 * @returns La liste des difficultés
 */
export const getDifficultyLevels = (): DifficultyLevelType[] => {
  return [
    { code: 'easy', label: 'Easy' },
    { code: 'medium', label: 'Medium' },
    { code: 'hard', label: 'Hard' },
  ];
};

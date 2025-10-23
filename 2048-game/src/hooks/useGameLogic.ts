import { useState, useCallback, useEffect } from 'react';
import {
  generateInitialGrid,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  checkGameOver,
  gridsAreEqual,
  type Grid,
  type Direction,
} from '../utils/helpers';

export const useGameLogic = () => {
  const [grid, setGrid] = useState<Grid>(() => generateInitialGrid());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem('2048-best-score');
    return stored ? parseInt(stored, 10) : 0;
  });

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('2048-best-score', score.toString());
    }
  }, [score, bestScore]);

  useEffect(() => {
    if (checkGameOver(grid)) {
      setIsGameOver(true);
    }
  }, [grid]);

  const move = useCallback((direction: Direction) => {
    if (isGameOver) return;

    let newGrid: Grid;
    let scoreGained: number;

    switch (direction) {
      case 'left':
        [newGrid, scoreGained] = moveLeft(grid);
        break;
      case 'right':
        [newGrid, scoreGained] = moveRight(grid);
        break;
      case 'up':
        [newGrid, scoreGained] = moveUp(grid);
        break;
      case 'down':
        [newGrid, scoreGained] = moveDown(grid);
        break;
      default:
        return;
    }

    if (!gridsAreEqual(grid, newGrid)) {
      const gridWithNewTile = addRandomTile(newGrid);
      setGrid(gridWithNewTile);
      setScore(prev => prev + scoreGained);
    }
  }, [grid, isGameOver]);

  const resetGame = useCallback(() => {
    setGrid(generateInitialGrid());
    setScore(0);
    setIsGameOver(false);
  }, []);

  return {
    grid,
    score,
    bestScore,
    isGameOver,
    setIsGameOver,
    move,
    resetGame,
  };
};
export type Grid = number[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export const createEmptyGrid = (): Grid => {
  return Array(4).fill(null).map(() => Array(4).fill(0));
};

export const getEmptyCells = (grid: Grid): { row: number; col: number }[] => {
  const emptyCells: { row: number; col: number }[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
};

export const addRandomTile = (grid: Grid): Grid => {
  const emptyCells = getEmptyCells(grid);
  if (emptyCells.length === 0) return grid;

  const newGrid = grid.map(row => [...row]);
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  
  newGrid[randomCell.row][randomCell.col] = value;
  return newGrid;
};

export const generateInitialGrid = (): Grid => {
  let grid = createEmptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
};

export const slideAndMergeRow = (row: number[]): [number[], number] => {
  let filtered = row.filter(val => val !== 0);
  let scoreGained = 0;
  
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      scoreGained += filtered[i];
      filtered[i + 1] = 0;
    }
  }
  
  filtered = filtered.filter(val => val !== 0);
  
  while (filtered.length < 4) {
    filtered.push(0);
  }
  
  return [filtered, scoreGained];
};

export const rotateGridClockwise = (grid: Grid): Grid => {
  const newGrid = createEmptyGrid();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newGrid[col][3 - row] = grid[row][col];
    }
  }
  return newGrid;
};

export const rotateGridCounterClockwise = (grid: Grid): Grid => {
  const newGrid = createEmptyGrid();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newGrid[3 - col][row] = grid[row][col];
    }
  }
  return newGrid;
};

export const moveLeft = (grid: Grid): [Grid, number] => {
  const newGrid: Grid = [];
  let totalScore = 0;
  
  for (let row = 0; row < 4; row++) {
    const [newRow, scoreGained] = slideAndMergeRow(grid[row]);
    newGrid.push(newRow);
    totalScore += scoreGained;
  }
  
  return [newGrid, totalScore];
};

export const moveRight = (grid: Grid): [Grid, number] => {
  const reversedGrid = grid.map(row => [...row].reverse());
  const [movedGrid, score] = moveLeft(reversedGrid);
  const finalGrid = movedGrid.map(row => [...row].reverse());
  return [finalGrid, score];
};

export const moveUp = (grid: Grid): [Grid, number] => {
  const rotated = rotateGridCounterClockwise(grid);
  const [moved, score] = moveLeft(rotated);
  const finalGrid = rotateGridClockwise(moved);
  return [finalGrid, score];
};

export const moveDown = (grid: Grid): [Grid, number] => {
  const rotated = rotateGridClockwise(grid);
  const [moved, score] = moveLeft(rotated);
  const finalGrid = rotateGridCounterClockwise(moved);
  return [finalGrid, score];
};

export const gridsAreEqual = (grid1: Grid, grid2: Grid): boolean => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid1[row][col] !== grid2[row][col]) {
        return false;
      }
    }
  }
  return true;
};

export const canMove = (grid: Grid): boolean => {
  if (getEmptyCells(grid).length > 0) {
    return true;
  }

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const current = grid[row][col];
      
      if (col < 3 && current === grid[row][col + 1]) {
        return true;
      }

      if (row < 3 && current === grid[row + 1][col]) {
        return true;
      }
    }
  }
  
  return false;
};

export const checkGameOver = (grid: Grid): boolean => {
  return !canMove(grid);
};
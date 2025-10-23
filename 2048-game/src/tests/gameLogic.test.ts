import {
  generateInitialGrid,
  getEmptyCells,
  addRandomTile,
  slideAndMergeRow,
  moveLeft,
  checkGameOver,
  createEmptyGrid,
} from '../utils/helpers';

describe('2048', () => {
  describe('generateInitialGrid', () => {
    test('should initialize grid with exactly 2 tiles', () => {
      const grid = generateInitialGrid();
      
      let tileCount = 0;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (grid[row][col] !== 0) {
            tileCount++;
          }
        }
      }
      
      expect(tileCount).toBe(2);
    });

    test('should only place tiles with value 2 or 4', () => {
      const grid = generateInitialGrid();
      
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const value = grid[row][col];
          if (value !== 0) {
            expect([2, 4]).toContain(value);
          }
        }
      }
    });
  });

  describe('slideAndMergeRow', () => {
    test('should merge tiles correctly when moving left', () => {
      const row = [2, 2, 0, 0];
      const [newRow, score] = slideAndMergeRow(row);
      
      expect(newRow).toEqual([4, 0, 0, 0]);
      expect(score).toBe(4);
    });

    test('should handle multiple merges in one row', () => {
      const row = [2, 2, 4, 4];
      const [newRow, score] = slideAndMergeRow(row);
      
      expect(newRow).toEqual([4, 8, 0, 0]);
      expect(score).toBe(12);
    });

    test('should not merge non-adjacent tiles', () => {
      const row = [2, 0, 2, 0];
      const [newRow, score] = slideAndMergeRow(row);
      
      expect(newRow).toEqual([4, 0, 0, 0]);
      expect(score).toBe(4);
    });

    test('should handle row with no merges', () => {
      const row = [2, 4, 8, 16];
      const [newRow, score] = slideAndMergeRow(row);
      
      expect(newRow).toEqual([2, 4, 8, 16]);
      expect(score).toBe(0);
    });
  });

  describe('moveLeft', () => {
    test('should move and merge all rows correctly', () => {
      const grid = [
        [2, 2, 0, 0],
        [4, 0, 4, 0],
        [0, 0, 8, 8],
        [2, 4, 2, 4],
      ];
      
      const [newGrid, score] = moveLeft(grid);
      
      expect(newGrid).toEqual([
        [4, 0, 0, 0],
        [8, 0, 0, 0],
        [16, 0, 0, 0],
        [2, 4, 2, 4],
      ]);
      expect(score).toBe(28);
    });
  });

  describe('score calculation', () => {
    test('should increase score correctly when tiles merge', () => {
      const row = [2, 2, 4, 4];
      const [, score] = slideAndMergeRow(row);
      
      expect(score).toBe(12);
    });

    test('should give zero score when no merges occur', () => {
      const row = [2, 4, 8, 16];
      const [, score] = slideAndMergeRow(row);
      
      expect(score).toBe(0);
    });
  });

  describe('addRandomTile', () => {
    test('should add a new tile after a valid move', () => {
      const grid = createEmptyGrid();
      grid[0][0] = 2;
      
      const emptyCellsBefore = getEmptyCells(grid).length;
      const newGrid = addRandomTile(grid);
      const emptyCellsAfter = getEmptyCells(newGrid).length;
      
      expect(emptyCellsAfter).toBe(emptyCellsBefore - 1);
    });

    test('should not add tile to full grid', () => {
      const grid = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ];
      
      const newGrid = addRandomTile(grid);
      expect(newGrid).toEqual(grid);
    });
  });

  describe('checkGameOver', () => {
    test('should detect game over when no moves are possible', () => {
      const grid = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ];
      
      expect(checkGameOver(grid)).toBe(true);
    });

    test('should not be game over when empty cells exist', () => {
      const grid = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      
      expect(checkGameOver(grid)).toBe(false);
    });

    test('should not be game over when adjacent tiles can merge', () => {
      const grid = [
        [2, 2, 4, 8],
        [4, 8, 16, 32],
        [2, 4, 8, 16],
        [4, 2, 4, 2],
      ];
      
      expect(checkGameOver(grid)).toBe(false);
    });
  });
});
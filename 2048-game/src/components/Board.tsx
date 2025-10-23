import React from 'react';
import { Tile } from './Tile';
import type { Grid } from '../utils/helpers';

interface BoardProps {
  grid: Grid;
}

export const Board: React.FC<BoardProps> = ({ grid }) => {
  return (
    <div className="bg-[#988876] shadow-xl p-2 rounded-xl inline-block">
      <div className="grid grid-cols-4 gap-2">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={value}
            />
          ))
        )}
      </div>
    </div>
  );
};
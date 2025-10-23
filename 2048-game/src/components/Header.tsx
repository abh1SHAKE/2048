import React from 'react';
import { Button } from '@/components/ui/button';
import { ScoreBoard } from './ScoreBoard';

interface HeaderProps {
  score: number;
  bestScore: number;
  onNewGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({ score, bestScore, onNewGame }) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="md:text-6xl text-5xl font-bold text-[#988776] tracking-tighter">2048</h1>
        <ScoreBoard score={score} bestScore={bestScore} />
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-[#4B5563] max-w-md">
          Join the tiles, get to <strong>2048!</strong>
        </p>
        <Button 
          onClick={onNewGame}
          className="bg-[#988776] hover:bg-[#7C6C5B] text-[#FAFAFA] font-semibold"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};
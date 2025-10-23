import React from 'react';
import { Card } from '@/components/ui/card';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
  return (
    <div className="flex gap-3">
      <Card className="px-3 md:px-6 py-2 bg-[#EAE7D9]">
        <div className="text-xs text-[#988876] font-semibold uppercase tracking-wide">
          Score
        </div>
        <div className="md:text-2xl text-md font-bold text-[#988876] w-[42px] md:w-[64px]">
          {score}
        </div>
      </Card>
      
      <Card className="px-3 md:px-6 py-2 bg-transparent border-2 border-[#EAE7D9]">
        <div className="text-xs text-[#988876] font-semibold uppercase tracking-wide">
          Best
        </div>
        <div className="md:text-2xl text-md font-bold text-[#988876] w-[42px] md:w-[64px]">
          {bestScore}
        </div>
      </Card>
    </div>
  );
};
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  onNewGame: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  onNewGame,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => open || onClose()}>
      <DialogContent 
        className="sm:max-w-md sora bg-[#FAF8F0]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl text-[#988776] font-bold">Game Over!</DialogTitle>
          <DialogDescription className="text-lg pt-2">
            No more moves available. Your final score is{' '}
            <span className="font-bold text-[#4B5563]">{score}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onNewGame}
            className="w-full bg-[#988776] hover:bg-[#7C6C5B] text-[#FAFAFA] font-semibold"
          >
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
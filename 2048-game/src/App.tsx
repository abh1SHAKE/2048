import { useEffect } from 'react';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { GameOverModal } from './components/GameOverModal';
import { useGameLogic } from './hooks/useGameLogic';
import type { Direction } from './utils/helpers';
import { useSwipeable } from 'react-swipeable';

function App() {
  const { grid, score, bestScore, isGameOver, setIsGameOver, move, resetGame } = useGameLogic();

  const handlers = useSwipeable({
    onSwipedLeft: () => move('left'),
    onSwipedRight: () => move('right'),
    onSwipedUp: () => move('up'),
    onSwipedDown: () => move('down'),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
    delta: 20,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const directionMap: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };

      const direction = directionMap[event.key];
      if (direction) {
        event.preventDefault();
        move(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return (
    <div 
      {...handlers}
      className="h-dvh bg-[#FAF8F0] overflow-hidden flex items-center justify-center p-4 sora touch-none">
      <div className="w-full max-w-2xl">
        <Header 
          score={score} 
          bestScore={bestScore} 
          onNewGame={resetGame} 
        />
        
        <div className="flex justify-center">
          <Board grid={grid} />
        </div>
        
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p className="mb-2">
            <strong>How to play:</strong> Use your arrow keys to move the tiles.
          </p>
          <p>
            Tiles with the same number merge into one when they touch. Add them up to reach 2048!
          </p>
        </div>
      </div>
      
      <GameOverModal 
        isOpen={isGameOver} 
        score={score} 
        onNewGame={resetGame} 
        onClose={() => setIsGameOver(false)}
      />
    </div>
  );
}

export default App;
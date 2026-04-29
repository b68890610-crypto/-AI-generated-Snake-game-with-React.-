import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Play, Pause, AlertTriangle } from 'lucide-react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from '../constants';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    setIsGameOver(false);
    setIsPaused(true);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(!isPaused);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPaused]);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const moveSnake = () => {
      const head = { ...snake[0] };
      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setIsGameOver(true);
        return;
      }

      if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        return;
      }

      const newSnake = [head, ...snake];

      if (head.x === food.x && head.y === food.y) {
        setScore((s) => {
          const newScore = s + 1;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFood(newSnake));
        setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [snake, direction, food, isGameOver, isPaused, speed, highScore, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const blockSize = canvas.width / GRID_SIZE;

    // Background - Solid Dark
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // CRT Scanlines Simulation on Canvas
    ctx.fillStyle = 'rgba(0, 255, 255, 0.03)';
    for (let i = 0; i < canvas.height; i += 2) {
      ctx.fillRect(0, i, canvas.width, 1);
    }

    // Grid - Low Opacity
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
       ctx.beginPath(); ctx.moveTo(i * blockSize, 0); ctx.lineTo(i * blockSize, canvas.height); ctx.stroke();
       ctx.beginPath(); ctx.moveTo(0, i * blockSize); ctx.lineTo(canvas.width, i * blockSize); ctx.stroke();
    }

    // Draw Food (Pixelated Magenta)
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(
      food.x * blockSize + 2,
      food.y * blockSize + 2,
      blockSize - 4,
      blockSize - 4
    );
    // Glitch shadow for food
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(food.x * blockSize + 4, food.y * blockSize + 1, 2, blockSize - 4);

    // Draw Snake (Pixelated Cyan)
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#00ffff' : 'rgba(0, 255, 255, 0.8)';
      
      ctx.fillRect(
        segment.x * blockSize + 1,
        segment.y * blockSize + 1,
        blockSize - 2,
        blockSize - 2
      );

      if (isHead) {
        ctx.fillStyle = '#1a1a1c';
        // Eye
        ctx.fillRect(segment.x * blockSize + 4, segment.y * blockSize + 4, 3, 3);
        ctx.fillRect(segment.x * blockSize + 12, segment.y * blockSize + 4, 3, 3);
      }
    });
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full max-w-[400px] font-pixel text-[10px]">
        <div className="flex flex-col gap-2">
          <span className="opacity-50">STATUS::SCORE</span>
          <span className="text-xl glitch-text text-[var(--color-glitch-magenta)]">
            {String(score).padStart(4, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="opacity-50">ARCHIVE::MAX</span>
          <div className="flex items-center gap-2">
            <span className="text-xl text-[var(--color-glitch-cyan)] tracking-tighter">
              {String(highScore).padStart(4, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="relative pixel-border p-2 bg-black group shrink-0">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-black relative z-0 image-render-pixel"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Overlay glitch line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
          <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-[var(--color-glitch-magenta)] blur-[1px]"
          />
        </div>

        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm z-20 p-8 text-center"
            >
              {isGameOver ? (
                <>
                  <AlertTriangle className="w-12 h-12 text-red-600 mb-4 animate-pulse" />
                  <h2 className="text-xl font-pixel text-red-600 mb-2 glitch-text">SEGMENTATION_FAULT</h2>
                  <p className="text-[10px] font-pixel opacity-50 mb-8 leading-relaxed">CORE_DUMP_SCORE: {score}</p>
                  <button
                    onClick={resetGame}
                    className="pixel-border px-4 py-3 bg-[var(--color-glitch-magenta)] text-black font-pixel text-[10px] hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 transition-transform"
                  >
                    REBOOT_CORE
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-pixel text-[var(--color-glitch-cyan)] mb-2">SYSTEM_IDLE</h2>
                  <p className="text-[10px] font-pixel opacity-50 mb-8">WAITING_FOR_UPLINK...</p>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="pixel-border px-6 py-4 bg-[var(--color-glitch-cyan)] text-black font-pixel text-[10px] hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 transition-transform"
                  >
                    STRIKE_TO_LINK
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Controls for Keyboard Simulation on Mobile */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
        <div />
        <button 
           className="pixel-border w-10 h-10 aspect-square flex items-center justify-center bg-black hover:bg-[var(--color-glitch-magenta)] group"
           onClick={() => direction !== 'DOWN' && setDirection('UP')}
        >
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[var(--color-glitch-cyan)] group-hover:border-b-black" />
        </button>
        <div />
        <button 
           className="pixel-border w-10 h-10 aspect-square flex items-center justify-center bg-black hover:bg-[var(--color-glitch-magenta)] group"
           onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
        >
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[var(--color-glitch-cyan)] group-hover:border-r-black" />
        </button>
        <button 
           className="pixel-border w-10 h-10 aspect-square flex items-center justify-center bg-black hover:bg-[var(--color-glitch-magenta)] group"
           onClick={() => direction !== 'UP' && setDirection('DOWN')}
        >
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--color-glitch-cyan)] group-hover:border-t-black" />
        </button>
        <button 
           className="pixel-border w-10 h-10 aspect-square flex items-center justify-center bg-black hover:bg-[var(--color-glitch-magenta)] group"
           onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
        >
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[var(--color-glitch-cyan)] group-hover:border-l-black" />
        </button>
      </div>
    </div>
  );
}


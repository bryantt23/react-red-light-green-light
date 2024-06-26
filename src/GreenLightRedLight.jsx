import { useState, useRef, useEffect } from 'react';

const GameStates = {
  PRE_GAME: 'preGame',
  ACTIVE_GAME: 'activeGame',
  GAME_OVER: 'gameOver'
};

function getRandomTime(min = 0.5, max = 2) {
  return (Math.random() * (max - min) + min) * 1000; // Convert seconds to milliseconds
}

const TARGET_COUNT = 3;

function GreenLightRedLight() {
  const [gameState, setGameState] = useState(GameStates.PRE_GAME);
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7);
  const [playerWins, setPlayerWins] = useState(false);
  const [redBox, setRedBox] = useState(true);
  const timeout = useRef(null);
  const interval = useRef(null);
  const colorTimeout = useRef(null);

  const clearAllTimers = () => {
    clearInterval(interval.current);
    clearTimeout(timeout.current);
    clearTimeout(colorTimeout.current);
    interval.current = null;
    timeout.current = null;
    colorTimeout.current = null;
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameState(GameStates.GAME_OVER);
      clearAllTimers();
    } else if (gameState === GameStates.GAME_OVER) {
      clearAllTimers();
    } else if (gameState === GameStates.ACTIVE_GAME) {
      if (colorTimeout.current === null) {
        const randomTime = getRandomTime();
        colorTimeout.current = setTimeout(() => {
          setRedBox(prev => !prev);
          colorTimeout.current = null;
        }, randomTime);
      }
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setCount(0);
    setTimeLeft(7);
    setPlayerWins(false);
    setRedBox(true);
    setGameState(GameStates.ACTIVE_GAME);

    interval.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    timeout.current = setTimeout(() => {
      // Add any additional game start logic here if needed
    }, 7000);
  };

  const handleBoxClick = () => {
    if (gameState !== GameStates.ACTIVE_GAME) return;

    if (redBox) {
      setGameState(GameStates.GAME_OVER);
      setPlayerWins(false);
    } else {
      if (count === TARGET_COUNT - 1) {
        setGameState(GameStates.GAME_OVER);
        setPlayerWins(true);
      }
      setCount(prev => prev + 1);
    }
  };

  return (
    <div>
      {gameState}
      <div>
        <p>{gameState === GameStates.ACTIVE_GAME && `Time left: ${timeLeft}s`}</p>
        {(gameState === GameStates.PRE_GAME || gameState === GameStates.GAME_OVER) && (
          <button onClick={startGame}>Start Game</button>
        )}
      </div>
      <div>
        <h3>Score: {count}</h3>
        <div
          onClick={handleBoxClick}
          style={{ height: 100, width: 100, backgroundColor: redBox ? 'red' : 'green' }}
        ></div>
        <div>
          {gameState === GameStates.GAME_OVER && (playerWins ? 'Player wins' : 'Player loses')}
        </div>
      </div>
    </div>
  );
}

export default GreenLightRedLight;



/*
Plan
game will have 3 states
preGame
  reset count, timer/interval
  ui will only have start button and score
activeGame
  ui will have score & green or red box, no start button
  2 states, red & green
  if click on box while red it's game over
    change state to gameOver & player win
  if click on green increment count
    if count equal to 15 then change state to gameOver & player lost
gameOver
  ui will have start button and score 
  will show you win or you lost
  can reach this by timer getting to zero, count to 15, or clicking red

  i guess for gameover state always clear timer, maybe the timeout will automaticall lead to game over, so if clear it it's fine

  make the game 7 seconds & make it a random length between .5 and 1.5 seconds
  need 3 clicks
*/

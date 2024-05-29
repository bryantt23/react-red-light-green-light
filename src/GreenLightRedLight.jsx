import { useState, useRef, useEffect } from 'react'
const GameStates = {
  PRE_GAME: 'preGame',
  ACTIVE_GAME: 'activeGame',
  GAME_OVER: 'gameOver'
}
function getRandomTime(min = 0.5, max = 2) {
  return (Math.random() * (max - min) + min) * 1000; // Convert seconds to milliseconds
}

function GreenLightRedLight() {
  const [gameState, setGameState] = useState(GameStates.PRE_GAME)
  const [count, setCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(7)
  const [playerWins, setPlayerWins] = useState(false)
  const [redBox, setRedBox] = useState(true)
  const timeout = useRef(null)
  const interval = useRef(null)
  const colorTimeout = useRef(null)

  useEffect(() => {
    return () => {
      clearInterval(interval.current)
      interval.current = null
      clearTimeout(timeout.current)
      timeout.current = null
      clearTimeout(colorTimeout.current)
      colorTimeout.current = null
    }
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameState(GameStates.GAME_OVER)
      clearInterval(interval.current)
      interval.current = null
      clearTimeout(timeout.current)
      timeout.current = null
      clearTimeout(colorTimeout.current)
      colorTimeout.current = null
    }
    else if (gameState === GameStates.GAME_OVER) {
      clearInterval(interval.current)
      interval.current = null
      clearTimeout(timeout.current)
      timeout.current = null
      clearTimeout(colorTimeout.current)
      colorTimeout.current = null
    }
    else if (gameState === GameStates.ACTIVE_GAME) {
      if (colorTimeout.current === null) {
        const randomTime = getRandomTime()
        colorTimeout.current = setTimeout(() => {
          setRedBox(prev => !prev)
          colorTimeout.current = null
        }, randomTime)
      }
    }
  }, [timeLeft, gameState])

  const startGame = () => {
    setCount(0);
    setTimeLeft(7)
    setPlayerWins(false)
    setGameState(GameStates.ACTIVE_GAME)

    timeout.current = setTimeout(() => {
    }, 7000)

    interval.current = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
  }

  // Write your game here
  return <div>
    {gameState}
    <div>
      <p>{gameState === GameStates.ACTIVE_GAME && `Time left: ${timeLeft}s`}</p>
      {(gameState === GameStates.PRE_GAME || gameState === GameStates.GAME_OVER) && <button onClick={startGame}>Start Game</button>}
    </div>
    <div>
      <h3>Score: {count}</h3>
      redbox:  {redBox ? "red" : "green"}
      <div style={{ height: 100, width: 100, backgroundColor: `${redBox ? "red" : "green"}` }}></div>
      <div>
        {gameState === GameStates.GAME_OVER && (playerWins ? "Player wins" : "Player loses")}
      </div>
    </div>
  </div>
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

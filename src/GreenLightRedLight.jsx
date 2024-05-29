import { useState, useRef } from 'react'
const GameStates = {
  PRE_GAME: 'preGame',
  ACTIVE_GAME: 'activeGame',
  GAME_OVER: 'gameOver'
}
function GreenLightRedLight() {
  const [gameState, setGameState] = useState(GameStates.PRE_GAME)
  const [count, setCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(7000)
  const [playerWins, setPlayerWins] = useState(false)
  const timeout = useRef(null)
  const interval = useRef(null)

  const startGame = () => {
    timeout.current = setTimeout(() => {
      setGameState(GameStates.ACTIVE_GAME)
      clearInterval(interval.current)
      interval.current = null
      clearTimeout(timeout.current)
      timeout.current = null
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

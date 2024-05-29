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

function GreenLightRedLight() {
  // Write your game here
  return "GreenLightRedLight"
}

export default GreenLightRedLight;
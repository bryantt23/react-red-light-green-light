import { useState } from 'react'
import GreenLightRedLight from './GreenLightRedLight'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GreenLightRedLight />
    </>
  )
}

export default App

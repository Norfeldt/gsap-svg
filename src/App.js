import React, { useState } from 'react'
import Toggle from './Toggle'

function App() {
  const [value, setValue] = useState(true)

  return (
    <div className="App" style={styles.container}>
      <Toggle
        value={value}
        onClick={() => setValue(!value)}
        scale={1}
        hasBoldText
      />
      <Toggle
        value={!value}
        onTextValue="ON"
        onTextColor="black"
        onTextBorderColor="white"
        onBackgroundColor="white"
        offTextValue="OFF"
        offTextBorderColor="black"
        offBackgroundColor="black"
        knobColor="purple"
        borderColor="purple"
        length={90}
        onClick={() => setValue(!value)}
        scale={1}
        hasBoldText
      />
      <Toggle
        value={value}
        onClick={() => setValue(!value)}
        scale={2}
        hasBoldText
      />
      <Toggle
        value={!value}
        onClick={() => setValue(!value)}
        scale={6}
        hasBoldText
      />
    </div>
  )
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignContent: 'center',
    justifyItems: 'center',
    gridGap: '1rem',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#eee',
  },
}

export default App

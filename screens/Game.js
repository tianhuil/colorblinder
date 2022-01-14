import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { BottomBar, Header, Tiles } from '../components'
import { generateRGB, mutateRGB, useAudio } from '../util'

const size = 4

const useTileState = () => {
  const [RGB, setRGB] = React.useState(generateRGB())
  const [diffRGB, setDiffRGB] = React.useState(mutateRGB(RGB))
  const [idx, setIdx] = React.useState(Math.floor(Math.random() * size))

  return {
    RGB,
    diffRGB,
    idx,
    regenerate: () => {
      const newRGB = generateRGB()
      setRGB(newRGB)
      setDiffRGB(mutateRGB(newRGB))
      setIdx(Math.floor(Math.random() * size))
    },
  }
}

const useCounters = (regenerate) => {
  const [points, setPoints] = React.useState(0)
  const [timeLeft, setTimeLeft] = React.useState(15)

  return {
    points,
    timeLeft,
    setTimeLeft,
    onTilePress: (rightTile) => {
      if (rightTile) {
        setPoints(points + 1)
        setTimeLeft(timeLeft + 2)
        regenerate()
      } else {
        setTimeLeft(timeLeft - 1)
      }
    },
    reset: () => {
      console.log('hi')
      setPoints(0)
      setTimeLeft(15)
    },
  }
}

const useGameLogic = () => {
  const tileState = useTileState()
  const counterState = useCounters(tileState.regenerate)
  const [gameState, setGameState] = React.useState('IN_GAME')
  const loseFX = useAudio(require('../assets/sfx/lose.wav'))

  return {
    ...tileState,
    ...counterState,
    gameState,
    toggleGameState: () => {
      switch (gameState) {
        case 'IN_GAME': {
          setGameState('PAUSED')
          break
        }
        case 'PAUSED': {
          setGameState('IN_GAME')
          break
        }
        case 'LOST': {
          counterState.reset()
          tileState.regenerate()
          setGameState('IN_GAME')
          break
        }
      }
    },
    gameTimer: () => {
      const interval = setInterval(() => {
        if (gameState === 'IN_GAME') {
          if (counterState.timeLeft <= 0) {
            loseFX.replayAsync()
            setGameState('LOST')
          } else {
            counterState.setTimeLeft(counterState.timeLeft - 1)
          }
        }
      }, 1000)
      return () => clearInterval(interval)
    },
  }
}

const Game = () => {
  const {
    RGB,
    diffRGB,
    idx,
    points,
    timeLeft,
    gameTimer,
    onTilePress,
    gameState,
    toggleGameState,
  } = useGameLogic()
  const { width, height } = useWindowDimensions()
  const dimension = Math.min(width, height)

  const tileProp = {
    onTilePress,
    RGB,
    diffRGB,
    idx,
    gameState,
    dimension,
    size,
  }
  React.useEffect(gameTimer)

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Tiles {...tileProp} />
      <View style={{ width: dimension * 0.9 }}>
        <BottomBar
          timeLeft={timeLeft}
          points={points}
          toggleGameState={toggleGameState}
          gameState={gameState}
        />
      </View>
    </SafeAreaView>
  )
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

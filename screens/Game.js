import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Header } from '../components'
import { BottomBar } from '../components/BottomBar'
import { CoffeeBreak, Lost } from '../components/PausedContainer'
import { generateRGB, getDimension, mutateRGB } from '../util'

const size = 4
const dimension = getDimension()

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

const Tiles = ({ onTilePress, RGB, diffRGB, idx, gameState }) => {
  const toRGB = (RGB) => `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`

  return (
    <View style={styles.tile}>
      {gameState === 'IN_GAME' ? (
        Array(size)
          .fill()
          .map((_, key) => (
            <TouchableOpacity
              key={key}
              style={{
                width: dimension * 0.4,
                height: dimension * 0.4,
                backgroundColor: key === idx ? toRGB(diffRGB) : toRGB(RGB),
                margin: dimension * 0.0125,
              }}
              onPress={() => onTilePress(key === idx)}
            />
          ))
      ) : gameState === 'PAUSED' ? (
        <CoffeeBreak />
      ) : (
        <Lost />
      )}
    </View>
  )
}

export default () => {
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

  const tileProp = { onTilePress, RGB, diffRGB, idx, gameState }
  React.useEffect(gameTimer)

  return (
    <View style={styles.container}>
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
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    height: dimension * 0.9,
    width: dimension * 0.9,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
})

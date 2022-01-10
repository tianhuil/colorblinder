import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Header } from '../components'
import { generateRGB, getDimension, mutateRGB, white } from '../util'

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
    tileState,
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
  }
}

const getBottomIcon = (gameState) => {
  switch (gameState) {
    case 'IN_GAME':
      return require('../assets/icons/pause.png')
    case 'PAUSED':
      return require('../assets/icons/play.png')
    default:
      return require('../assets/icons/replay.png')
  }
}

const BottomBar = ({ timeLeft, points, toggleGameState, gameState }) => {
  const bottomIcon = getBottomIcon(gameState)
  return (
    <View style={styles.bottomContainer}>
      <View>
        <Text style={styles.counterCount}>{points}</Text>
        <Text style={styles.counterLabel}>Points</Text>
        <View style={styles.bestContainer}>
          <Image
            source={require('../assets/icons/trophy.png')}
            style={styles.bestIcon}
          />
          <Text style={styles.bestLabel}>0</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ alignItems: 'center', flex: 1 }}
          onPress={toggleGameState}
        >
          <Image source={bottomIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.counterCount}>{timeLeft}</Text>
        <Text style={styles.counterLabel}>Time Left</Text>
      </View>
    </View>
  )
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
      ) : (
        <View style={styles.pausedContainer}>
          <Image
            source={require('../assets/icons/mug.png')}
            style={styles.pausedIcon}
          />
          <Text style={styles.pausedText}>COFFEE BREAK</Text>
        </View>
      )}
    </View>
  )
}

export default ({ navigation }) => {
  const {
    tileState,
    points,
    timeLeft,
    setTimeLeft,
    onTilePress,
    gameState,
    toggleGameState,
  } = useGameLogic()

  React.useEffect(() => {
    const interval = setInterval(
      () => gameState === 'IN_GAME' && setTimeLeft(timeLeft - 1),
      1000
    )
    return () => clearInterval(interval)
  })

  return (
    <View style={styles.container}>
      <Header />
      <Tiles onTilePress={onTilePress} {...tileState} gameState={gameState} />
      <BottomBar
        timeLeft={timeLeft}
        points={points}
        toggleGameState={toggleGameState}
        gameState={gameState}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width: dimension * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 15,
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
  counterCount: {
    color: white,
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'dogbyte',
  },
  counterLabel: {
    color: '#bbb',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'dogbyte',
  },
  bestContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bestIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  bestLabel: {
    fontFamily: 'dogbyte',
    color: '#bbb',
    fontSize: 25,
    marginTop: 2.5,
  },
  pausedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pausedText: {
    fontFamily: 'dogbyte',
    textAlign: 'center',
    color: '#eee',
    marginTop: 20,
    fontSize: 60,
  },
  pausedIcon: {
    width: 80,
    height: 80,
  },
  bottomIcon: {
    width: 50,
    height: 50,
  },
})

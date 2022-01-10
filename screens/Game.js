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

const BottomBar = ({ timeLeft, points }) => (
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
    <View style={{ flex: 1 }}></View>
    <View>
      <Text style={styles.counterCount}>{timeLeft}</Text>
      <Text style={styles.counterLabel}>Time Left</Text>
    </View>
  </View>
)

const Tiles = ({ onTilePress, RGB, diffRGB, idx }) => {
  const toRGB = (RGB) => `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`

  return (
    <View style={styles.tile}>
      {Array(size)
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
        ))}
    </View>
  )
}

export default ({ navigation }) => {
  const [points, setPoints] = React.useState(0)
  const [timeLeft, setTimeLeft] = React.useState(15)
  const tileState = useTileState()

  const onTilePress = (rightTile) => {
    if (rightTile) {
      setPoints(points + 1)
      setTimeLeft(timeLeft + 2)
      tileState.regenerate()
    } else {
      setTimeLeft(timeLeft - 1)
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearInterval(interval)
  })

  return (
    <View style={styles.container}>
      <Header />
      <Tiles onTilePress={onTilePress} {...tileState} />
      <BottomBar timeLeft={timeLeft} points={points} />
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
})

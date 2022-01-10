import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Header } from '../components'
import { generateRGB } from '../util'

const Tiles = () => {
  const [RGB, setRGB] = React.useState(generateRGB())
  const { width, height } = Dimensions.get('window')
  const dimension = Math.min(width, height)

  return (
    <View
      style={{
        height: dimension * 0.9,
        width: dimension * 0.9,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {Array(4)
        .fill()
        .map((_, key) => (
          <TouchableOpacity
            key={key}
            style={{
              width: dimension * 0.4,
              height: dimension * 0.4,
              backgroundColor: `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`,
              margin: dimension * 0.0125,
            }}
            onPress={() => console.log(key)}
          />
        ))}
    </View>
  )
}

export default ({ navigation }) => {
  const [points, setPoints] = React.useState(0)
  const [timeLeft, setTimeLeft] = React.useState(15)

  React.useEffect(() => {
    const interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearInterval(interval)
  })

  return (
    <View style={styles.container}>
      <Header />
      <Tiles />
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
})

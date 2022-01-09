import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Header } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    fontSize: 45,
    fontFamily: 'dogbyte',
    color: '#ecf0f1',
    marginTop: 5,
  },
  playIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
  },
})

const PlayButton = () => {
  const onPlayPress = () => console.log('onPlayPress event handler')

  return (
    <TouchableOpacity
      onPress={onPlayPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Image
        source={require('../assets/icons/play_arrow.png')}
        style={styles.playIcon}
      />
      <Text style={styles.play}>PLAY!</Text>
    </TouchableOpacity>
  )
}

export default () => (
  <View style={styles.container}>
    <Header />
    <PlayButton />
  </View>
)

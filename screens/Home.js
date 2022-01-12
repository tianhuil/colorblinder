import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Banner, Header, HighScore, LeaderBoard } from '../components'
import { white } from '../util'

const PlayButton = () => {
  const backgroundMusic = new Audio.Sound()
  const buttonFX = new Audio.Sound()

  const onPlayPress = () => {
    buttonFX.replayAsync()
    backgroundMusic.stopAsync()
    navigation.navigate('Game')
  }

  const navigation = useNavigation()

  React.useEffect(() => {
    ;(async () => {
      await backgroundMusic.loadAsync(
        require('../assets/music/Komiku_Mushrooms.mp3')
      )
      await buttonFX.loadAsync(require('../assets/sfx/button.wav'))
      await backgroundMusic.setIsLoopingAsync(true)
      await backgroundMusic.playAsync()
    })()
  })

  return (
    <TouchableOpacity
      onPress={onPlayPress}
      style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80 }}
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
    <HighScore />
    <LeaderBoard />
    <Banner />
  </View>
)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    fontSize: 45,
    fontFamily: 'dogbyte',
    color: white,
    marginTop: 5,
  },
  playIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
  },
})

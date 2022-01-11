import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Banner, Header, HighScore, LeaderBoard } from '../components'
import { white } from '../util'

const PlayButton = () => {
  const navigation = useNavigation()
  const onPlayPress = () => {
    navigation.navigate('Game')
  }

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

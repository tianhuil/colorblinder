import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Header } from '../components'
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

const HighScore = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
    <Image
      source={require('../assets/icons/trophy.png')}
      style={styles.trophyIcon}
    />
    <Text style={styles.hiscore}>Hi-score: 0</Text>
  </View>
)

const LeaderBoard = () => (
  <TouchableOpacity
    onPress={() => console.log('Pressed Leaderboard')}
    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80 }}
  >
    <Image
      source={require('../assets/icons/leaderboard.png')}
      style={styles.leaderboardIcon}
    />
    <Text style={styles.leaderboard}>Leaderboard</Text>
  </TouchableOpacity>
)

const Banner = () => {
  const [soundOn, setSoundOn] = React.useState(true)

  const imageSource = soundOn
    ? require('../assets/icons/speaker-on.png')
    : require('../assets/icons/speaker-off.png')

  return (
    <View style={styles.bottomContainer}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={[styles.copyrightText, { color: '#E64C3C' }]}>
          Music: Komiku
        </Text>
        <Text style={[styles.copyrightText, { color: '#E57E31' }]}>
          SFX: SubspaceAudio
        </Text>
        <Text style={[styles.copyrightText, { color: '#3998DB' }]}>
          Development: RisingStack + Me
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity onPress={() => setSoundOn(!soundOn)}>
        <Image source={imageSource} style={styles.soundIcon} />
      </TouchableOpacity>
    </View>
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
    color: white,
    marginTop: 5,
  },
  playIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
  },
  hiscore: {
    fontSize: 28.5,
    fontFamily: 'dogbyte',
    color: white,
    marginTop: 5,
  },
  trophyIcon: {
    height: 45,
    width: 45,
    marginRight: 12.5,
  },
  leaderboard: {
    fontSize: 38,
    fontFamily: 'dogbyte',
    color: white,
    marginTop: 5,
  },
  leaderboardIcon: {
    height: 50,
    width: 50,
    marginRight: 15,
  },
  bottomContainer: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 12.5, // the 2.5px bottom margin from the text is subtracted from the 15px spacing
    flexDirection: 'row',
  },
  copyrightText: {
    fontSize: 16,
    fontFamily: 'dogbyte',
    marginBottom: 2.5,
  },
  soundIcon: {
    height: 35,
    width: 35,
  },
})

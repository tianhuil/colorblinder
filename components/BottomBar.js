import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAudio, white } from '../util'

export const getBottomIcon = (gameState) => {
  switch (gameState) {
    case 'IN_GAME':
      return require('../assets/icons/pause.png')
    case 'PAUSED':
      return require('../assets/icons/play.png')
    default:
      return require('../assets/icons/replay.png')
  }
}

export const BottomBar = ({ timeLeft, points, toggleGameState, gameState }) => {
  const bottomIcon = getBottomIcon(gameState)
  const pauseInFX = useAudio(require('../assets/sfx/pause_in.wav'))
  const pauseOutFX = useAudio(require('../assets/sfx/pause_out.wav'))

  const onBottomBarPress = () => {
    if (gameState === 'IN_GAME') {
      pauseInFX.replayAsync()
    } else if (gameState === 'PAUSED') {
      pauseOutFX.replayAsync()
    }
    toggleGameState()
  }

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
          onPress={onBottomBarPress}
        >
          <Image source={bottomIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.counterCount}>{timeLeft}</Text>
        <Text style={styles.counterLabel}>Time Left</Text>
        <View style={styles.bestContainer}>
          <Image
            source={require('../assets/icons/clock.png')}
            style={styles.bestIcon}
          />
          <Text style={styles.bestLabel}>0s</Text>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 15,
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
  bottomIcon: {
    width: 50,
    height: 50,
  },
})

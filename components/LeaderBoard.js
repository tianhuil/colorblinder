import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { white } from '../util'

export const LeaderBoard = () => (
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

const styles = StyleSheet.create({
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
})

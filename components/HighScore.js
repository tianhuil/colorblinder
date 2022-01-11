import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { white } from '../util'

export const HighScore = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
    <Image
      source={require('../assets/icons/trophy.png')}
      style={styles.trophyIcon}
    />
    <Text style={styles.hiscore}>Hi-score: 0</Text>
  </View>
)

const styles = StyleSheet.create({
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
})

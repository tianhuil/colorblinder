import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PausedContainer = ({ children }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.pausedContainer}>
      {children}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/icons/escape.png')}
          style={styles.exitIcon}
        />
      </TouchableOpacity>
    </View>
  )
}
export const CoffeeBreak = () => (
  <PausedContainer>
    <Image
      source={require('../assets/icons/mug.png')}
      style={styles.pausedIcon}
    />
    <Text style={styles.pausedText}>COFFEE BREAK</Text>
  </PausedContainer>
)
export const Lost = () => (
  <PausedContainer>
    <Image
      source={require('../assets/icons/dead.png')}
      style={styles.pausedIcon}
    />
    <Text style={styles.pausedText}>YOU LOST</Text>
  </PausedContainer>
)

const styles = StyleSheet.create({
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
  exitIcon: {
    marginTop: 20,
    width: 90,
    height: 45,
  },
})

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default () => (
  <View style={styles.container}>
    <Header />
  </View>
)

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const Banner = () => {
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

const styles = StyleSheet.create({
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

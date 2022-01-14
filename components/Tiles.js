import React from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { useAudio } from '../util'
import { CoffeeBreak, Lost } from './PausedContainer'

const useShakAnimation = () => {
  const animation = React.useRef(new Animated.Value(0)).current
  const animationTiming = (toValue, duration) =>
    Animated.timing(animation, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    })

  return {
    animation,
    shake: () =>
      Animated.sequence([
        animationTiming(30, 100),
        animationTiming(-30, 100),
        animationTiming(30, 100),
        animationTiming(-30, 100),
        animationTiming(0, 100),
      ]).start(),
  }
}

export const Tiles = ({
  size,
  onTilePress,
  RGB,
  diffRGB,
  idx,
  gameState,
  dimension,
}) => {
  const toRGB = (RGB) => `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`

  const tileTapFX = useAudio(require('../assets/sfx/tile_tap.wav'))
  const tileWrongFX = useAudio(require('../assets/sfx/tile_wrong.wav'))

  const { animation, shake } = useShakAnimation()

  const onTileTap = (rightTile) => {
    if (rightTile) {
      tileTapFX.replayAsync()
    } else {
      shake()
      tileWrongFX.replayAsync()
    }
    onTilePress(rightTile)
  }

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          transform: [{ translateX: animation }],
        },
        { height: dimension * 0.9, width: dimension * 0.9 },
      ]}
    >
      {gameState === 'IN_GAME' ? (
        Array(size)
          .fill()
          .map((_, key) => (
            <TouchableOpacity
              key={key}
              style={{
                width: dimension * 0.4,
                height: dimension * 0.4,
                backgroundColor: key === idx ? toRGB(diffRGB) : toRGB(RGB),
                margin: dimension * 0.025,
              }}
              onPress={() => onTileTap(key === idx)}
            />
          ))
      ) : gameState === 'PAUSED' ? (
        <CoffeeBreak />
      ) : (
        <Lost />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  tile: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
})

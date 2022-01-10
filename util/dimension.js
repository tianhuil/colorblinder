import { Dimensions } from 'react-native'

export const getDimension = () => {
  const { width, height } = Dimensions.get('window')
  return Math.min(width, height)
}

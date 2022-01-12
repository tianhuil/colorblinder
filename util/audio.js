import { Audio } from 'expo-av'
import { useEffect } from 'react'

export const useAudio = (req) => {
  const audio = new Audio.Sound()
  useEffect(() => {
    audio.loadAsync(req)
  }, [audio, req])
  return audio
}

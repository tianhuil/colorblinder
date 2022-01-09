import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import React from 'react'
import { StatusBar } from 'react-native'
import Routes from './screens/Routes'

export default () => {
  const [loaded] = useFonts({
    dogbyte: require('./assets/fonts/dogbyte.otf'),
  })

  if (loaded) {
    return (
      <React.Fragment>
        <StatusBar barStyle='light-content' />
        <Routes />
      </React.Fragment>
    )
  } else {
    return <AppLoading />
  }
}

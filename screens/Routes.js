import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Game from './Game'
import Home from './Home'

const Stack = createNativeStackNavigator()

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ title: 'Home', header: () => null }}
      />
      <Stack.Screen
        name='Game'
        component={Game}
        options={{ title: 'Game', header: () => null, gestureEnabled: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Routes

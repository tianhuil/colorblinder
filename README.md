# Colorblinder
[Rising Stack's guide to React Native] is very comprehensive.  However, it's API is very out of date.  Overall, the react style of the original is very out of date and uses class components.  We've updated it to use functional components with hooks.  This version also updates the following:

1. The new provider-consumer-based [React Navigation API](https://reactnative.dev/docs/navigation)
2. Expo's new [AppLoading component](https://docs.expo.dev/versions/latest/sdk/app-loading/)
3. Expo's new hook-based [font API](https://docs.expo.dev/versions/latest/sdk/font/)
5. Expo's new [expo-av API](https://docs.expo.dev/versions/latest/sdk/av/)
4. I've broken the massive classes into more bite-sized pieces
5. In animations, using `useNativeDriver` does not work with `left`.  Instead, must use `translateX` (See [Github post](https://github.com/react-native-modal/react-native-modal/issues/163#issuecomment-433711780))

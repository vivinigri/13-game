import React, { memo, useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import * as Font from "expo-font"

import { ToastWrapper } from "@components/Toast"

type Props = {
  children: React.ReactNode
}

const AppContainer = ({ children }: Props) => {
  const [fontLoaded, setFontLoadingStatus] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "ibm-plex-bold": require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
        "ibm-plex-medium": require("../assets/fonts/IBMPlexSans-Medium.ttf"),
        "ibm-plex-regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
        "shadow-into-light": require("../assets/fonts/ShadowsIntoLight-Regular.ttf"),
      })

      setFontLoadingStatus(true)
    }

    loadFonts()
  }, [])

  return (
    <View style={styles.container}>
      {fontLoaded && (
        <>
          {children}
          <ToastWrapper />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
})

export default memo(AppContainer)

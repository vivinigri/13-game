import { StatusBar } from "expo-status-bar"
import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { Provider as StoreProvider } from "react-redux"
import { theme } from "@core/theme"
import store from "@store"

import useCachedResources from "@hooks/useCachedResources"
import AppContainer from "@components/AppContainer"
import Navigation from "@navigation"

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <AppContainer>
            <Navigation />
            <StatusBar />
          </AppContainer>
        </PaperProvider>
      </StoreProvider>
    )
  }
}

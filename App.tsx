import { StatusBar } from "expo-status-bar"
import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react"
import { getPersistor } from "@rematch/persist"
import { theme } from "@core/theme"
import store from "@store"

import useCachedResources from "@hooks/useCachedResources"
import AppContainer from "@components/AppContainer"
import Navigation from "@navigation"
import Loading from "@components/Loading"

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return <Loading />
  } else {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={<Loading />} persistor={getPersistor()}>
          <PaperProvider theme={theme}>
            <AppContainer>
              <Navigation />
              <StatusBar />
            </AppContainer>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    )
  }
}

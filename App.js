import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import useCachedResources from "./hooks/useCachedResources";
// import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { dark, light } from "./styles/theme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [useDark, changeTheme] = useState(true);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={useDark ? dark : light}>
        <SafeAreaProvider>
          <Navigation changeTheme={changeTheme} useDark={useDark} />
          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}

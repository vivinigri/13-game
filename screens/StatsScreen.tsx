import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

export default function StatsScreen({
  navigation,
}: StackScreenProps<RootStackParamList, RouteNames.NotFoundScreen>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚧 Em construção 🚧</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E3F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
})

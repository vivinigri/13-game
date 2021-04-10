import { StackScreenProps } from "@react-navigation/stack"
import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { RootStackParamList } from "../types"

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WHy?!?😰</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>🠔 Voltar o menu</Text>
      </TouchableOpacity>
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

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ButtonStartScreen from "./../components/ButtonStartScreen";

const LINKS = [
  { label: "Novo Placar", link: "TabOne" },
  { label: "Nova Mesa", link: "TabOne" },
  { label: "Entrar em Mesa", link: "TabOne" },
  { label: "Estatísticas", link: "TabOne" }
];

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.title}>13</Text>
        <View style={styles.buttonsGroup}>
          <FlatList
            data={LINKS}
            keyExtractor={(item) => item.link}
            renderItem={({ item }) => (
              <ButtonStartScreen label={item.label} link={item.link} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink"
  },
  title: {
    color: "red",
    fontSize: 20
  },
  buttonsGroup: {
    width: 300
  }
});

export default StartScreen;

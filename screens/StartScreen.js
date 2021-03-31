import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ButtonStartScreen from "../components/ButtonStartScreen";
import styled from "styled-components/native";

const LINKS = [
  { label: "Novo Placar", link: "ScoreBoardScreen" },
  { label: "Nova Mesa", link: "TabOne" },
  { label: "Entrar em Mesa", link: "TabTwo" },
  { label: "Estatísticas", link: "TabThree" }
];

const MainView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`;

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <MainView>
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
      </MainView>
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

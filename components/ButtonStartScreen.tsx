import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export type ButtonProps = {
  label: string;
  link: string;
};

const ButtonStartScreen: React.FC<ButtonProps> = ({ label, link }) => {
  const navigation = useNavigation();
  return (
    <Button
      mode="contained"
      style={styles.buttonStartScreen}
      onPress={() => {
        navigation.navigate(link);
      }}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonStartScreen: {
    marginVertical: 10
  }
});

export default ButtonStartScreen;

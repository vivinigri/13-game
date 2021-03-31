import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const ButtonMain = styled(Button)`
  background-color: ${(props) => props.theme.INACTIVE_COLOR};
  color: ${(props) => props.theme.FOREGROUND_COLOR};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonStartScreen = ({ label, link }) => {
  const navigation = useNavigation();
  return (
    <ButtonMain
      mode="contained"
      onPress={() => {
        navigation.navigate(link);
      }}
    >
      {label}
    </ButtonMain>
  );
};

export default ButtonStartScreen;

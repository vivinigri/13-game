import React from "react";
import { Switch } from "react-native-paper";
import { View, Text } from "react-native";

export default function ThemeToggler(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingRight: 5,
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
    >
      <Switch
        value={props.useDark}
        onValueChange={() => props.changeTheme(!props.useDark)}
      />
      <Text>{props.useDark ? "🌙" : "☀️"}</Text>
    </View>
  );
}

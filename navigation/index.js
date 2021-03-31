import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { withTheme } from "styled-components/native";

import TabOneScreen from "../screens/TabOneScreen";
import StartScreen from "../screens/StartScreen";
import ScoreBoardScreen from "../screens/ScoreBoardScreen";

import ThemeToggler from "../components/ThemeToggler";

const Stack = createStackNavigator();

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: props.theme.ACTIVE_COLOR
          },
          headerTintColor: props.theme.FOREGROUND_COLOR,
          headerRight: () => (
            <ThemeToggler
              changeTheme={props.changeTheme}
              useDark={props.useDark}
            />
          )
        }}
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="ScoreBoardScreen"
          component={ScoreBoardScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="TabOne"
          component={TabOneScreen}
          options={{ title: "Overview", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withTheme(Navigation);

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

// import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from "../types";
// import BottomTabNavigator from './BottomTabNavigator';
// import LinkingConfiguration from './LinkingConfiguration';
import TabOneScreen from "../screens/TabOneScreen";
import StartScreen from "../screens/StartScreen";
import ScoreBoardScreen from "../screens/ScoreBoardScreen";
// import TabTwoScreen from '../screens/TabTwoScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
// linking={LinkingConfiguration}
export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {/* <RootNavigator /> */}
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ScoreBoardScreen" component={ScoreBoardScreen} />
        <Stack.Screen
          name="TabOne"
          component={TabOneScreen}
          options={{ title: "Overview", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

/* function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
} */

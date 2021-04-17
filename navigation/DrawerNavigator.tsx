import React from "react"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer"
import { DrawerParamList, ApostasScreenParam } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
// style
import { drawerOptions } from "@core/config"
// content
import { BottomTabNavigator } from "@navigation/BottomTabNavigator"

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Resetar rodada"
        onPress={() =>
          props.navigation.navigate(RouteNames.ApostasScreen, {
            type: ApostasScreenParam.RESET,
          })
        }
        activeTintColor={props.activeTintColor}
        inactiveTintColor={props.activeTintColor}
        style={{ backgroundColor: props.activeBackgroundColor }}
      />
      <DrawerItem
        label="Reiniciar jogo"
        onPress={() =>
          props.navigation.navigate(RouteNames.ApostasScreen, {
            type: ApostasScreenParam.RESTART,
          })
        }
        activeTintColor={props.activeTintColor}
        inactiveTintColor={props.activeTintColor}
        style={{ backgroundColor: props.activeBackgroundColor }}
      />
      <DrawerItem
        label="Menu inicial"
        onPress={() => props.navigation.navigate(RouteNames.StartScreen)}
        activeTintColor={props.activeTintColor}
        inactiveTintColor={props.activeTintColor}
        style={{ backgroundColor: props.activeBackgroundColor }}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator<DrawerParamList>()
export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContentOptions={drawerOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={RouteNames.Drawer}
        component={BottomTabNavigator}
        options={{ drawerLabel: "Voltar ➝" }}
      />
    </Drawer.Navigator>
  )
}

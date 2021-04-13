import React, { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Tab } from "@types"
import Text from "@components/Text"
import { theme } from "@core/theme"

type Props = {
  tabs: Array<Tab>
  currentTab: Tab
  onTabChange: (tab: Tab) => void
}

const TabView = ({ tabs, currentTab, onTabChange }: Props) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabChange(tab)}
          activeOpacity={0.5}
          style={styles.tabContainer}
        >
          <Text
            type="paragraph"
            textTransform="uppercase"
            variant="dark"
            family="bold"
            style={{ opacity: tab.id === currentTab.id ? 1 : 0.5 }}
          >
            {tab.label}
          </Text>
          <View
            style={[
              styles.border,
              tab.id === currentTab.id && styles.tabFocused,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.colors.textLight,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: theme.colors.dark,
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  tabFocused: {
    backgroundColor: theme.colors.dark,
  },
  border: {
    width: "100%",
    height: 5,
    backgroundColor: theme.colors.textLight,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
  },
})

export default memo(TabView)

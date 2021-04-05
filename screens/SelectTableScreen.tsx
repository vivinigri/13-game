import React from "react"
import { StyleSheet } from "react-native"
import Text from "@components/Text"
import { TextInput, View, TouchableOpacity } from "react-native"
import { Formik } from "formik"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "@types"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import TitleHeader from "@components/Headers/TitleHeader"
import Divider from "@components/Divider"

type Props = StackScreenProps<RootStackParamList, "SelectTableScreen">

const SelectTableScreen = ({ navigation }: Props) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  const handleSubmit = (values: any) => {
    console.log("VALUES", values)
  }

  const goToNext = () => navigation.navigate("StartScreen")

  return (
    <GradientView>
      <TitleHeader title="Selecione a Mesa" />
      <View style={themedStyle.mainContainer}>
        <Text
          type="title"
          align="center"
          variant="white"
          style={{
            marginBottom: theme.spacings.padding * 2,
          }}
        >
          Busque ou crie uma nova
        </Text>
        <Formik
          initialValues={{ mesa: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                style={themedStyle.input}
                onChangeText={handleChange("mesa")}
                onBlur={handleBlur("mesa")}
                value={values.mesa}
                placeholder="Nome da mesa"
                textAlign="center"
              />
              <TouchableOpacity onPress={(values: any) => handleSubmit(values)}>
                <View style={themedStyle.addButton}>
                  <Text
                    type="mainheading"
                    align="center"
                    variant="white"
                    family="bold"
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Divider />
      </View>
      <BottomMenu onConfirm={goToNext} confirmLabel="Continuar ➝" />
    </GradientView>
  )
}

export default SelectTableScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "flex-start",
      width: "80%",
      maxWidth: 600,
    },
    input: {
      height: 50,
      color: colors.white,
      borderColor: colors.yellow,
      backgroundColor: colors.backdrop,
      padding: spacings.padding,
      borderRadius: 50,
    },
    separator: {
      marginVertical: spacings.padding * 2,
      height: 1,
      width: "80%",
      maxWidth: 600,
    },
    addButton: {
      backgroundColor: colors.yellow,
      width: 40,
      height: 40,
      borderRadius: 40,
      position: "absolute",
      right: 10,
      top: -45,
    },
  })

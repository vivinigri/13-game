import { DefaultTheme } from "react-native-paper"
import { PixelRatio } from "react-native"

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      textSecondary: string
      textTertiary: string
      textLight: string
      textDark: string
      yellow: string
      grey: string
      textPrimary: string
      border: string
      highlight: string
      primaryLight: string
      hover: string
      lightGrey: string
      orange: string
      green: string
      red: string
      transparent: string
      white: string
      dark: string
      cyan: string
    }

    interface ThemeFontSizes {
      giga: number
      mainheading: number
      header: number
      subheading: number
      title: number
      paragraph: number
      label: number
      caption: number
    }

    interface ThemeIconSizes {
      small: number
      normal: number
      big: number
    }

    interface ThemeFonts {
      bold: ThemeFont
      cursive: ThemeFont
    }

    interface ThemeSpacings {
      insideContent: number
      padding: number
      section: number
      large: number
    }

    interface Theme {
      fontSizes: ThemeFontSizes
      iconSize: ThemeIconSizes
      spacings: ThemeSpacings
    }
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#404088", //"#24283b",
    dark: "#1A1A3E", //"#1F2335",
    primary: "#26265C", //"#414868",
    primaryLight: "#565f89",
    white: "#fff",
    border: "#3D59A1",

    // textLight: "#a9b1d6",
    textLight: "#C2C1D1", //"#d4dbf8",
    textPrimary: "#f7768e",
    textSecondary: "#ff9e64",
    textTertiary: "#e0af68",
    textDark: "#2ac3de",

    backdrop: "#00AEEF",
    error: "#f13a59",
    green: "#00D193",
    orange: "#FFA726",
    yellow: "#FBC02D",
    red: "#EB5757",
    lightOrange: "#FFE0B2",
    lightRed: "#ffcdd2",
    lightGreen: "#C1F4E5",
    placeholder: "#7fa9c6",
    hover: "#F3F9FD",
    grey: "#A2C1D6",
    lightGrey: "#E8F0F6",
    sideMenu: "#003C6B",
    sideMenuFocus: "#1a4f7a",
    highlight: "#00AEEF",
    cyan: "#b4f9f8",
    silver: "#D6D6D6",

    //toasts
    toastError: "#f7768e",
    toastSuccess: "#9ece6a",
    toastWarning: "#e0af68",
    toastInfo: "#2ac3de",
    transparent: "transparent",
  },
  fonts: {
    medium: {
      fontFamily: "ibm-plex-medium",
    },
    regular: {
      fontFamily: "ibm-plex-regular",
    },
    light: {
      fontFamily: "ibm-plex-regular",
    },
    thin: {
      fontFamily: "ibm-plex-regular",
    },
    bold: {
      fontFamily: "ibm-plex-bold",
    },
    cursive: {
      fontFamily: "shadow-into-light",
    },
  },
  fontSizes: {
    giga: PixelRatio.getFontScale() * 32,
    mainheading: PixelRatio.getFontScale() * 26,
    header: PixelRatio.getFontScale() * 21,
    subheading: PixelRatio.getFontScale() * 18,
    title: PixelRatio.getFontScale() * 16,
    paragraph: PixelRatio.getFontScale() * 15,
    label: PixelRatio.getFontScale() * 15,
    caption: PixelRatio.getFontScale() * 12,
  },
  iconSize: {
    big: PixelRatio.getFontScale() * 42,
    normal: PixelRatio.getFontScale() * 30,
    small: PixelRatio.getFontScale() * 18,
  },
  spacings: {
    insideContent: PixelRatio.getFontScale() * 8,
    padding: PixelRatio.getFontScale() * 12,
    section: PixelRatio.getFontScale() * 20,
    large: PixelRatio.getFontScale() * 40,
  },
}

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
      footerSize: number
      headerSize: number
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
    background: "#1E1E3F", //"#24283b",
    dark: "#2D2B55",
    primary: "#222244", //"#414868",
    primaryLight: "#565f89",
    white: "#fff",
    border: "#3D59A1",

    // textLight: "#a9b1d6",
    textLight: "#A599E9", //"#d4dbf8",
    textPrimary: "#f7768e",
    textSecondary: "#FAD000",
    textTertiary: "#e0af68",
    textDark: "#1E1E3F",

    backdrop: "#28284E",
    sideMenu: "#1E1E3F",
    hover: "#4D21FC",
    yellow: "#FAD000",
    lightOrange: "#FFEE80",
    lightRed: "#FAEFA5",
    orange: "#FF7200",
    red: "#B362FF",
    sideMenuFocus: "#FF9D00",
    cyan: "#9EFFFF",
    green: "#A5FF90",
    silver: "#FB94FF",
    highlight: "#3AD900",
    error: "#EC3A37",

    lightGreen: "#C1F4E5",
    placeholder: "#7fa9c6",

    grey: "#A2C1D6",
    lightGrey: "#E8F0F6",

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
    headerSize: PixelRatio.getFontScale() * 60,
    footerSize: PixelRatio.getFontScale() * 70,
  },
}

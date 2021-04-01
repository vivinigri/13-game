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

    interface Theme {
      fontSizes: ThemeFontSizes
      iconSize: ThemeIconSizes
    }
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#07639D",
    primaryLight: "#26B9F2",
    border: "#00AEEF",
    error: "#f13a59",
    green: "#00D193",
    orange: "#FFA726",
    yellow: "#FBC02D",
    red: "#EB5757",
    lightOrange: "#FFE0B2",
    lightRed: "#ffcdd2",
    lightGreen: "#C1F4E5",
    textPrimary: "#000000",
    textSecondary: "#385f7f",
    textTertiary: "#5b91b6",
    textLight: "#ffffff",
    textDark: "#000000",
    placeholder: "#7fa9c6",
    hover: "#F3F9FD",
    grey: "#A2C1D6",
    lightGrey: "#E8F0F6",
    dark: "#000000",
    sideMenu: "#003C6B",
    sideMenuFocus: "#1a4f7a",
    highlight: "#00AEEF",
    cyan: "#00FFFF",
    background: "#F3F9FD",
    silver: "#D6D6D6",
    backdrop: "#07639DD0",

    //toasts
    toastError: "#d64646",
    toastSuccess: "#4bb678",
    toastWarning: "#efa842",
    toastInfo: "#5ca8f5",
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
    section: PixelRatio.getFontScale() * 20,
    large: PixelRatio.getFontScale() * 40,
  },
}

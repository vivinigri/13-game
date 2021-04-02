export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  StartScreen: undefined
}

export type BottomTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}

export type Toast = {
  id: string
  variant: "success" | "error" | "info" | "warning"
  content: string
  duration?: number
  tryAgain?: () => void
  label?: string
}

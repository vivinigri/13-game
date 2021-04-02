export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type TabOneParamList = {
  StartScreen: undefined
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

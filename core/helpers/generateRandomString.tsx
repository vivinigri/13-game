export function generateRandomString(length: number) {
  let result = ""
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export function generateQuickGuid(key: string = "") {
  return `${key}-${Math.random().toString(36).substring(2, 15)}`
  /* return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  ) */
}

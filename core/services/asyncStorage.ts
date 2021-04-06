import AsyncStorage from "@react-native-community/async-storage"

export async function getData(key: string, parse: boolean = true) {
  try {
    const data = await AsyncStorage.getItem(key)
    if (parse) {
      return data ? JSON.parse(data) : null
    } else {
      return data
    }
  } catch (e) {
    throw new Error(`Failed to get item at key: ${key}`)
  }
}

export async function storeData(key: string, value: object | string | null) {
  try {
    const jsonValue = typeof value === "object" ? JSON.stringify(value) : value
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    throw new Error(`Failed to save item at key: ${key}`)
  }
}

export async function removeData(key: string) {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (error) {
    throw new Error(`Failed to remove item at key: ${key}`)
  }
}

// --------------------

const mockedData: any = {
  globalPlayers: [
    {
      id: "player-ex0ylnlrqv7",
      name: "Sarita",
      games: [],
    },
    {
      id: "player-ycit8vrwah",
      name: "Vivian",
      games: [],
    },
    {
      id: "player-mta2cl8bjbk",
      name: "Flávio",
      games: [],
    },
    {
      id: "player-mm3tme9167i",
      name: "Debora",
      games: [],
    },
    {
      id: "player-yrw1pr86rln",
      name: "Arnaldo",
      games: [],
    },
  ],
  globalTables: [
    {
      id: "table-9rxmy6sfo4l",
      name: "Monday Desert",
      players: [
        "player-ex0ylnlrqv7",
        "player-ycit8vrwah",
        "player-mta2cl8bjbk",
        "player-mm3tme9167i",
      ],
      used: 2,
    },
    {
      id: "table-5bmkwzhqeet",
      name: "Sunday Noon",
      players: [
        "player-ycit8vrwah",
        "player-mta2cl8bjbk",
        "player-mm3tme9167i",
        "player-ex0ylnlrqv7",
      ],
      used: 1,
    },
  ],
}

export async function getMockedData(key: string) {
  return mockedData[key]
}

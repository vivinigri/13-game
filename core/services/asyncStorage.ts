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
      id: 0,
      name: "Sarita",
      games: [],
    },
    {
      id: 1,
      name: "Vivian",
      games: [],
    },
    {
      id: 2,
      name: "Flávio",
      games: [],
    },
    {
      id: 3,
      name: "Debora",
      games: [],
    },
    {
      id: 4,
      name: "Arnaldo",
      games: [],
    },
  ],
  globalTables: [
    {
      id: 0,
      name: "Monday Desert",
      players: [0, 1, 2, 3],
      used: 2,
    },
    {
      id: 1,
      name: "Sunday Noom",
      players: [1, 2, 3, 4],
      used: 1,
    },
  ],
}

export async function getMockedData(key: string) {
  return mockedData[key]
}

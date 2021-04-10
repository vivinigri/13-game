type Action = {
  index: number
  item?: any | string | number | boolean
}

export function insertItem(array: [], action: Action) {
  let newArray = array.slice()
  newArray.splice(action.index, 0, action.item)
  return newArray
}

export function removeItem(array: [], action: Action) {
  let newArray = array.slice()
  newArray.splice(action.index, 1)
  return newArray
}

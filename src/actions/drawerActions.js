export const openDrawer = () => {
  return { type: "OPEN_DRAWER", payload: true }
}

export const closeDrawer = () => {
  return { type: "CLOSE_DRAWER", payload: false }
}

import { useState, useEffect } from "react"

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key)
    if (localValue == null) {
      return initial
    } else {
      return JSON.parse(localValue)
    }
  })

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  return [value, setValue]
}

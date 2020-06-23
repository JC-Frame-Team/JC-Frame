import { useState, useEffect } from 'react'


export default function useDebounce(value: any, delay = 300) {
  const [DebounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return DebounceValue
}
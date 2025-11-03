import { useState, useEffect } from "react"
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedValue = localStorage.getItem("darkMode")
      if (storedValue) {
        return JSON.parse(storedValue)
      }
    } catch (error) {
      console.error(error)
      return false 
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } catch (error) {
      console.error(error)
    }
  }, [isDarkMode])
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }
  return [isDarkMode, toggleDarkMode]
}
export default useDarkMode
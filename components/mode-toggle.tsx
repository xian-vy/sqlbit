import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  const displayTheme = theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : 'Theme'

  return (
    <Button  
      size="sm"
      variant="ghost" 
      onClick={toggleTheme}
      className="font-medium text-xs px-0"
    >
      {displayTheme}
    </Button>
  )
}
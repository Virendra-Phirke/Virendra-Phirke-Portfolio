import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set initial value in a timeout to avoid sync warning
    const timeoutId = setTimeout(checkIsMobile, 0)
    
    mql.addEventListener("change", checkIsMobile)
    return () => {
      clearTimeout(timeoutId)
      mql.removeEventListener("change", checkIsMobile)
    }
  }, [])

  return !!isMobile
}

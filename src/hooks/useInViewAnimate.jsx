import { useEffect, useMemo, useRef, useState } from 'react'

export default function useInViewAnimate(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const optionsJson = useMemo(() => JSON.stringify(options), [options])

  useEffect(() => {
    const observerOptions = optionsJson ? JSON.parse(optionsJson) : {}
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      observerOptions
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [optionsJson])

  return [ref, isVisible]
}

import React, { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  /** delay in ms before revealing once intersected */
  delayMs?: number
  /** additional classes applied to the wrapper */
  className?: string
  /** threshold for IntersectionObserver */
  threshold?: number
}

const Reveal: React.FC<RevealProps> = ({ children, delayMs = 0, className = '', threshold = 0.15 }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => setVisible(true), delayMs)
            } else {
              setVisible(true)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delayMs, threshold])

  return (
    <div
      ref={ref}
      className={
        `${className} transition-all duration-700 ease-out ` +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
      }
    >
      {children}
    </div>
  )
}

export default Reveal

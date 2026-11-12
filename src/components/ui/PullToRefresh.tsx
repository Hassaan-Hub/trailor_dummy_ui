import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => void
  children: React.ReactNode
}

/**
 * Lightweight touch-based pull-to-refresh for mobile lists.
 * Activates only when the window is scrolled to the very top.
 */
export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const tracking = useRef(false)
  const pullRef = useRef(0)
  const refreshingRef = useRef(false)

  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      if (window.scrollY > 0 || refreshingRef.current) return
      startY.current = e.touches[0].clientY
      tracking.current = true
    }

    const onMove = (e: TouchEvent) => {
      if (!tracking.current || refreshingRef.current) return
      const delta = e.touches[0].clientY - startY.current
      if (delta <= 0 || window.scrollY > 0) {
        pullRef.current = 0
        setPull(0)
        return
      }
      const next = Math.min(80, delta * 0.45)
      pullRef.current = next
      setPull(next)
    }

    const onEnd = () => {
      if (!tracking.current) return
      tracking.current = false
      const distance = pullRef.current
      if (distance >= 50 && !refreshingRef.current) {
        refreshingRef.current = true
        setRefreshing(true)
        setPull(56)
        onRefresh()
        window.setTimeout(() => {
          refreshingRef.current = false
          setRefreshing(false)
          setPull(0)
          pullRef.current = 0
        }, 900)
      } else {
        setPull(0)
        pullRef.current = 0
      }
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
    }
  }, [onRefresh])

  return (
    <div className="relative">
      {/* Pull indicator */}
      {(pull > 0 || refreshing) && (
        <div
          className="flex items-center justify-center overflow-hidden transition-[height] duration-150"
          style={{ height: refreshing ? 56 : pull }}
        >
          <div
            className={refreshing ? 'animate-spin' : ''}
            style={{ opacity: Math.min(1, pull / 45), transform: `rotate(${pull * 3}deg)` }}
          >
            <RefreshCw size={20} className="text-gold-500" />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

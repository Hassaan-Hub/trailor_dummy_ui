import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BottomNav } from '@/components/layout/BottomNav'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = {
  duration: 0.25,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

interface LayoutProps {
  children: React.ReactNode
  showBottomNav?: boolean
}

export function Layout({ children, showBottomNav = true }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 text-navy-900 dark:text-gray-100">
      {/* Main scrollable area */}
      <div className={showBottomNav ? 'pb-20' : ''}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      {showBottomNav && <BottomNav />}
    </div>
  )
}

// Export variants for use in pages
export { pageVariants, pageTransition }

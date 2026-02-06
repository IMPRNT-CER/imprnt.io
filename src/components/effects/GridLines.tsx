import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCallback, useRef } from 'react'

interface GridLinesProps {
  /** Number of horizontal lines */
  horizontalLines?: number
  /** Number of vertical lines */
  verticalLines?: number
  /** Line color */
  color?: 'accent' | 'gold' | 'neutral' | 'light'
  /** Line opacity (0-1) */
  opacity?: number
  /** Enable perspective effect */
  perspective?: boolean
  /** Perspective depth (higher = more dramatic) */
  perspectiveDepth?: number
  /** Enable mouse-based perspective shift */
  interactive?: boolean
  /** Animate the grid lines */
  animated?: boolean
  /** Animation speed (1 = normal) */
  animationSpeed?: number
  /** Additional class names */
  className?: string
}

const COLORS = {
  accent: 'rgb(0, 102, 204)',
  gold: 'rgb(201, 169, 98)',
  neutral: 'rgb(115, 115, 115)',
  light: 'rgb(200, 200, 200)',
}

export default function GridLines({
  horizontalLines = 12,
  verticalLines = 20,
  color = 'accent',
  opacity = 0.15,
  perspective = true,
  perspectiveDepth = 800,
  interactive = true,
  animated = true,
  animationSpeed = 1,
  className = '',
}: GridLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking for perspective shift
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  const springConfig = { damping: 30, stiffness: 80 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  
  // Transform mouse position to rotation
  const rotateX = useTransform(smoothY, [0, 1], [15, -15])
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [interactive, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [mouseX, mouseY])

  const lineColor = COLORS[color]

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: perspective ? `${perspectiveDepth}px` : 'none' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: perspective && interactive ? rotateX : perspective ? 60 : 0,
          rotateY: perspective && interactive ? rotateY : 0,
          transformOrigin: 'center center',
        }}
      >
        {/* Horizontal lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ opacity }}
        >
          <defs>
            <linearGradient id="lineGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
              <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
              <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal lines with perspective scaling */}
          {Array.from({ length: horizontalLines }, (_, i) => {
            const progress = i / (horizontalLines - 1)
            // Apply exponential spacing for perspective effect
            const yPos = perspective 
              ? 50 + (progress - 0.5) * 100 * Math.pow(Math.abs(progress - 0.5) * 2, 0.5) * Math.sign(progress - 0.5)
              : progress * 100
            const lineOpacity = perspective ? 0.3 + progress * 0.7 : 1
            
            return (
              <motion.line
                key={`h-${i}`}
                x1="0%"
                y1={`${yPos}%`}
                x2="100%"
                y2={`${yPos}%`}
                stroke="url(#lineGradientH)"
                strokeWidth={perspective ? 0.5 + progress : 1}
                style={{ opacity: lineOpacity }}
                initial={animated ? { pathLength: 0 } : undefined}
                animate={animated ? { 
                  pathLength: 1,
                  opacity: [lineOpacity * 0.5, lineOpacity, lineOpacity * 0.5],
                } : undefined}
                transition={{
                  pathLength: { 
                    duration: 2 / animationSpeed, 
                    delay: i * 0.1 / animationSpeed,
                    ease: 'easeOut',
                  },
                  opacity: {
                    duration: 4 / animationSpeed,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2 / animationSpeed,
                  },
                }}
              />
            )
          })}

          {/* Vertical lines */}
          {Array.from({ length: verticalLines }, (_, i) => {
            const progress = i / (verticalLines - 1)
            const xPos = progress * 100
            // Converging lines for perspective
            const topOffset = perspective ? (progress - 0.5) * 30 : 0
            
            return (
              <motion.line
                key={`v-${i}`}
                x1={`${xPos}%`}
                y1="0%"
                x2={`${50 + topOffset}%`}
                y2="100%"
                stroke="url(#lineGradientV)"
                strokeWidth={0.5}
                initial={animated ? { pathLength: 0 } : undefined}
                animate={animated ? { 
                  pathLength: 1,
                  opacity: [opacity * 0.3, opacity * 0.8, opacity * 0.3],
                } : undefined}
                transition={{
                  pathLength: { 
                    duration: 1.5 / animationSpeed, 
                    delay: 0.5 + i * 0.05 / animationSpeed,
                    ease: 'easeOut',
                  },
                  opacity: {
                    duration: 5 / animationSpeed,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15 / animationSpeed,
                  },
                }}
              />
            )
          })}
        </svg>

        {/* Animated scan line */}
        {animated && (
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
              boxShadow: `0 0 20px ${lineColor}`,
            }}
            animate={{
              top: ['0%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 / animationSpeed,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </motion.div>

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  )
}

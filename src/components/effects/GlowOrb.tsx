import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCallback, useRef } from 'react'

interface GlowOrbProps {
  /** Size of the orb in pixels */
  size?: number
  /** Primary color */
  color?: 'accent' | 'gold' | 'custom'
  /** Custom color value (hex or rgba) */
  customColor?: string
  /** Animation intensity (0-1) */
  intensity?: number
  /** Enable mouse tracking */
  followMouse?: boolean
  /** Position as percentage [x, y] */
  position?: [number, number]
  /** Blur amount in pixels */
  blur?: number
  /** Pulse animation */
  pulse?: boolean
  /** Float animation */
  float?: boolean
  /** Additional class names */
  className?: string
}

const COLOR_MAP = {
  accent: {
    primary: 'rgba(0, 102, 204, 0.4)',
    secondary: 'rgba(51, 136, 221, 0.2)',
    glow: 'rgba(0, 102, 204, 0.15)',
  },
  gold: {
    primary: 'rgba(201, 169, 98, 0.4)',
    secondary: 'rgba(212, 185, 120, 0.2)',
    glow: 'rgba(201, 169, 98, 0.15)',
  },
}

export default function GlowOrb({
  size = 300,
  color = 'accent',
  customColor,
  intensity = 1,
  followMouse = false,
  position = [50, 50],
  blur = 80,
  pulse = true,
  float = true,
  className = '',
}: GlowOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 50 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!followMouse || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = (e.clientX - rect.left - centerX) * 0.2
    const y = (e.clientY - rect.top - centerY) * 0.2
    mouseX.set(x)
    mouseY.set(y)
  }, [followMouse, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Get colors
  let colors = color !== 'custom' ? COLOR_MAP[color] : null
  if (color === 'custom' && customColor) {
    colors = {
      primary: customColor,
      secondary: customColor.replace(/[\d.]+\)$/, '0.2)'),
      glow: customColor.replace(/[\d.]+\)$/, '0.15)'),
    }
  }
  if (!colors) colors = COLOR_MAP.accent

  // Animation variants
  const floatVariants = float ? {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } : {}

  const pulseVariants = pulse ? {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [intensity * 0.8, intensity, intensity * 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } : {}

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${position[0]}%`,
          top: `${position[1]}%`,
          x: followMouse ? smoothX : 0,
          y: followMouse ? smoothY : 0,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        variants={{ ...floatVariants, ...pulseVariants }}
        animate="animate"
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
            filter: `blur(${blur * 1.5}px)`,
            transform: 'scale(2)',
          }}
          animate={pulse ? {
            opacity: [0.5, 0.8, 0.5],
            scale: [1.8, 2.2, 1.8],
          } : undefined}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mid layer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 60%)`,
            filter: `blur(${blur}px)`,
            transform: 'scale(1.5)',
          }}
          animate={pulse ? {
            opacity: [0.6, 1, 0.6],
          } : undefined}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Core */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: '25%',
            top: '25%',
            width: '50%',
            height: '50%',
            background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 100%)`,
            filter: `blur(${blur / 2}px)`,
          }}
          animate={pulse ? {
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          } : undefined}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

// Convenience component for multiple orbs
interface GlowOrbsProps {
  orbs?: Array<Omit<GlowOrbProps, 'className'>>
  className?: string
}

export function GlowOrbs({ orbs, className = '' }: GlowOrbsProps) {
  const defaultOrbs: Array<Omit<GlowOrbProps, 'className'>> = orbs || [
    { color: 'accent', position: [20, 30], size: 400, intensity: 0.8 },
    { color: 'gold', position: [80, 70], size: 300, intensity: 0.6 },
    { color: 'accent', position: [60, 20], size: 200, intensity: 0.4 },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {defaultOrbs.map((orbProps, i) => (
        <GlowOrb key={i} {...orbProps} />
      ))}
    </div>
  )
}

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
  duration: number
  color: 'accent' | 'gold' | 'neutral'
}

interface ParticleFieldProps {
  /** Number of particles to render */
  particleCount?: number
  /** Enable mouse interaction */
  interactive?: boolean
  /** Color theme */
  theme?: 'accent' | 'gold' | 'mixed' | 'neutral'
  /** Base opacity for particles (0-1) */
  baseOpacity?: number
  /** Size range [min, max] in pixels */
  sizeRange?: [number, number]
  /** Additional class names */
  className?: string
}

const COLORS = {
  accent: 'rgba(0, 102, 204, VAR)',
  gold: 'rgba(201, 169, 98, VAR)',
  neutral: 'rgba(115, 115, 115, VAR)',
}

function ParticleComponent({ 
  particle, 
  mouseX, 
  mouseY, 
  interactive 
}: { 
  particle: Particle
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  interactive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: particle.x, y: particle.y })
  
  // Smooth spring for mouse influence
  const springConfig = { damping: 30, stiffness: 100 }
  const offsetX = useSpring(0, springConfig)
  const offsetY = useSpring(0, springConfig)

  useEffect(() => {
    if (!interactive) return

    const unsubX = mouseX.on('change', (mx) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const my = mouseY.get()
      
      const dx = mx - centerX
      const dy = my - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 200
      
      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 30
        offsetX.set(-dx / distance * force)
        offsetY.set(-dy / distance * force)
      } else {
        offsetX.set(0)
        offsetY.set(0)
      }
    })

    return () => unsubX()
  }, [interactive, mouseX, mouseY, offsetX, offsetY])

  const colorBase = COLORS[particle.color]
  const color = colorBase.replace('VAR', String(particle.opacity))

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: color,
        boxShadow: `0 0 ${particle.size * 2}px ${color}`,
        x: offsetX,
        y: offsetY,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, particle.opacity, particle.opacity, 0],
        scale: [0.5, 1, 1, 0.5],
        y: [0, -30, -60, -90],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function ParticleField({
  particleCount = 50,
  interactive = true,
  theme = 'mixed',
  baseOpacity = 0.6,
  sizeRange = [2, 6],
  className = '',
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      let color: Particle['color']
      if (theme === 'mixed') {
        const rand = Math.random()
        color = rand < 0.4 ? 'accent' : rand < 0.7 ? 'gold' : 'neutral'
      } else {
        color = theme
      }

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        opacity: baseOpacity * (0.5 + Math.random() * 0.5),
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        color,
      }
    })
  }, [particleCount, theme, baseOpacity, sizeRange])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!interactive) return
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }, [interactive, mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
    >
      {particles.map((particle) => (
        <ParticleComponent
          key={particle.id}
          particle={particle}
          mouseX={mouseX}
          mouseY={mouseY}
          interactive={interactive}
        />
      ))}
    </div>
  )
}

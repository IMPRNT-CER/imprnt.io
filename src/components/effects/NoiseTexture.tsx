import { motion } from 'framer-motion'
import { useEffect, useRef, useMemo } from 'react'

interface NoiseTextureProps {
  /** Noise opacity (0-1) */
  opacity?: number
  /** Noise density/frequency */
  density?: number
  /** Blend mode */
  blendMode?: 'overlay' | 'multiply' | 'soft-light' | 'hard-light' | 'normal'
  /** Animate the noise */
  animated?: boolean
  /** Animation speed (frames to skip, higher = slower) */
  frameSkip?: number
  /** Noise type */
  type?: 'fine' | 'coarse' | 'grain'
  /** Tint color (optional) */
  tint?: string
  /** Additional class names */
  className?: string
}

// Generate noise pattern as data URL (memoized for performance)
function generateNoiseDataURL(density: number, type: 'fine' | 'coarse' | 'grain'): string {
  const size = type === 'fine' ? 100 : type === 'coarse' ? 50 : 150
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return ''
  
  const imageData = ctx.createImageData(size, size)
  const data = imageData.data
  
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255
    data[i] = value     // R
    data[i + 1] = value // G
    data[i + 2] = value // B
    data[i + 3] = type === 'grain' 
      ? Math.random() * 50 // More transparent for grain
      : Math.random() * 100 // Semi-transparent noise
  }
  
  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

// SVG-based noise for SSR compatibility
function SVGNoise({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="4" 
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        filter="url(#noiseFilter)" 
        opacity={opacity}
      />
    </svg>
  )
}

// Canvas-based animated noise for performance
function CanvasNoise({ 
  opacity, 
  density, 
  animated, 
  frameSkip,
  type,
}: Pick<NoiseTextureProps, 'opacity' | 'density' | 'animated' | 'frameSkip' | 'type'>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      // Use lower resolution for performance
      const scale = type === 'fine' ? 0.5 : type === 'coarse' ? 0.25 : 0.4
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
    }
    
    resize()
    window.addEventListener('resize', resize)

    const drawNoise = () => {
      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      
      const skip = frameSkip || 3
      if (animated && frameRef.current++ % skip !== 0) {
        animationRef.current = requestAnimationFrame(drawNoise)
        return
      }

      const densityFactor = (density || 1) * 0.5
      
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > densityFactor) {
          data[i + 3] = 0
          continue
        }
        
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = Math.random() * 60
      }
      
      ctx.putImageData(imageData, 0, 0)
      
      if (animated) {
        animationRef.current = requestAnimationFrame(drawNoise)
      }
    }

    drawNoise()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [density, animated, frameSkip, type])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        opacity: opacity || 0.05,
        imageRendering: 'pixelated',
      }}
    />
  )
}

// Static image-based noise (most performant for non-animated)
function ImageNoise({ 
  opacity, 
  density, 
  type,
  tint,
}: Pick<NoiseTextureProps, 'opacity' | 'density' | 'type' | 'tint'>) {
  const noiseUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return generateNoiseDataURL(density || 1, type || 'fine')
  }, [density, type])

  if (!noiseUrl) {
    return <SVGNoise opacity={opacity} />
  }

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${noiseUrl})`,
        backgroundRepeat: 'repeat',
        opacity: opacity || 0.05,
        ...(tint && {
          backgroundColor: tint,
          backgroundBlendMode: 'overlay',
        }),
      }}
    />
  )
}

export default function NoiseTexture({
  opacity = 0.05,
  density = 1,
  blendMode = 'overlay',
  animated = false,
  frameSkip = 3,
  type = 'fine',
  tint,
  className = '',
}: NoiseTextureProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        mixBlendMode: blendMode,
        isolation: 'isolate',
      }}
    >
      {animated ? (
        <CanvasNoise
          opacity={opacity}
          density={density}
          animated={animated}
          frameSkip={frameSkip}
          type={type}
        />
      ) : (
        <ImageNoise
          opacity={opacity}
          density={density}
          type={type}
          tint={tint}
        />
      )}
      
      {/* Optional grain enhancement with motion */}
      {type === 'grain' && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            opacity: opacity * 0.5,
          }}
          animate={animated ? {
            x: [0, -10, 5, -5, 0],
            y: [0, 5, -10, 5, 0],
          } : undefined}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      )}
    </div>
  )
}

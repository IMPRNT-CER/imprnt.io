import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, ElementType } from 'react'

// Base typography component props
interface TypographyBaseProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

// Title - uses Playfair Display
export interface TitleProps extends TypographyBaseProps, Omit<HTMLMotionProps<'h1'>, 'ref'> {
  level?: 1 | 2 | 3 | 4
}

const titleSizes: Record<1 | 2 | 3 | 4, string> = {
  1: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
  2: 'text-4xl sm:text-5xl md:text-6xl',
  3: 'text-3xl sm:text-4xl md:text-5xl',
  4: 'text-2xl sm:text-3xl',
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level = 1, children, className = '', gradient, ...props }, ref) => {
    const Tag = `h${level}` as ElementType
    const MotionTag = motion.create(Tag)
    
    return (
      <MotionTag
        ref={ref}
        className={`
          font-display font-bold leading-tight text-ink
          ${titleSizes[level]}
          ${gradient ? 'text-gradient' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </MotionTag>
    )
  }
)

Title.displayName = 'Title'

// Subtitle - uses Playfair Display, lighter weight
export interface SubtitleProps extends TypographyBaseProps, Omit<HTMLMotionProps<'h2'>, 'ref'> {
  level?: 1 | 2
}

const subtitleSizes: Record<1 | 2, string> = {
  1: 'text-2xl sm:text-3xl md:text-4xl',
  2: 'text-xl sm:text-2xl md:text-3xl',
}

export const Subtitle = forwardRef<HTMLHeadingElement, SubtitleProps>(
  ({ level = 1, children, className = '', gradient, ...props }, ref) => {
    return (
      <motion.h2
        ref={ref}
        className={`
          font-display font-medium leading-snug text-charcoal
          ${subtitleSizes[level]}
          ${gradient ? 'text-gradient' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.h2>
    )
  }
)

Subtitle.displayName = 'Subtitle'

// Body - uses Inter
export interface BodyProps extends TypographyBaseProps, Omit<HTMLMotionProps<'p'>, 'ref'> {
  size?: 'sm' | 'md' | 'lg'
  muted?: boolean
}

const bodySizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg sm:text-xl',
}

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ size = 'md', children, className = '', muted, ...props }, ref) => {
    return (
      <motion.p
        ref={ref}
        className={`
          font-body font-normal leading-relaxed
          ${bodySizes[size]}
          ${muted ? 'text-stone' : 'text-slate'}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.p>
    )
  }
)

Body.displayName = 'Body'

// Label - uses Inter, uppercase tracking
export interface LabelProps extends TypographyBaseProps, Omit<HTMLMotionProps<'span'>, 'ref'> {
  size?: 'sm' | 'md'
}

const labelSizes: Record<'sm' | 'md', string> = {
  sm: 'text-xs tracking-[0.3em]',
  md: 'text-sm tracking-[0.2em]',
}

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ size = 'md', children, className = '', ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={`
          font-body font-medium uppercase
          ${labelSizes[size]}
          text-accent
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)

Label.displayName = 'Label'

// Mono - uses Space Mono for technical/code text
export interface MonoProps extends TypographyBaseProps, Omit<HTMLMotionProps<'span'>, 'ref'> {
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}

const monoSizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export const Mono = forwardRef<HTMLSpanElement, MonoProps>(
  ({ size = 'md', block, children, className = '', ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={`
          font-mono
          ${monoSizes[size]}
          text-stone
          ${block ? 'block bg-warm/50 px-3 py-2 rounded-md' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)

Mono.displayName = 'Mono'

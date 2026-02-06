import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass'

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: CardVariant
  hoverable?: boolean
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-paper border border-warm shadow-sm',
  elevated: 'bg-paper shadow-lg shadow-ink/5',
  outlined: 'bg-transparent border border-stone/20',
  glass: 'bg-paper/80 backdrop-blur-md border border-white/20 shadow-lg',
}

const paddingStyles: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hoverable = false, padding = 'md', children, className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={hoverable ? { y: 0, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' } : undefined}
        whileHover={
          hoverable
            ? {
                y: -4,
                boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }
            : undefined
        }
        className={`
          rounded-xl overflow-hidden
          transition-colors duration-200
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${hoverable ? 'cursor-pointer' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Card Header subcomponent
export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
)

CardHeader.displayName = 'CardHeader'

// Card Content subcomponent
export interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={className}>{children}</div>
)

CardContent.displayName = 'CardContent'

// Card Footer subcomponent
export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`mt-4 pt-4 border-t border-warm ${className}`}>{children}</div>
)

CardFooter.displayName = 'CardFooter'

export default Card

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

export type BadgeStatus = 'coming-soon' | 'in-development' | 'live' | 'beta' | 'archived' | 'custom'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'ref'> {
  status?: BadgeStatus
  size?: BadgeSize
  children?: React.ReactNode
  pulse?: boolean
}

const statusConfig: Record<BadgeStatus, { label: string; styles: string }> = {
  'coming-soon': {
    label: 'Coming Soon',
    styles: 'bg-gold/15 text-gold border-gold/30',
  },
  'in-development': {
    label: 'In Development',
    styles: 'bg-accent/15 text-accent border-accent/30',
  },
  live: {
    label: 'Live',
    styles: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
  },
  beta: {
    label: 'Beta',
    styles: 'bg-violet-500/15 text-violet-600 border-violet-500/30',
  },
  archived: {
    label: 'Archived',
    styles: 'bg-stone/15 text-stone border-stone/30',
  },
  custom: {
    label: '',
    styles: 'bg-warm text-slate border-stone/20',
  },
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ status = 'custom', size = 'md', children, pulse, className = '', ...props }, ref) => {
    const config = statusConfig[status]
    const label = children || config.label

    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`
          inline-flex items-center gap-1.5
          font-mono font-normal uppercase tracking-wider
          rounded-full border
          ${config.styles}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {pulse && (
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-current"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {label}
      </motion.span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge

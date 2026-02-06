import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, useState } from 'react'

export type InputVariant = 'default' | 'filled' | 'outlined'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<HTMLMotionProps<'input'>, 'ref' | 'size'> {
  variant?: InputVariant
  size?: InputSize
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const variantStyles: Record<InputVariant, { base: string; focus: string }> = {
  default: {
    base: 'bg-paper border border-stone/20',
    focus: 'border-accent ring-2 ring-accent/20',
  },
  filled: {
    base: 'bg-warm border border-transparent',
    focus: 'bg-paper border-accent ring-2 ring-accent/20',
  },
  outlined: {
    base: 'bg-transparent border-2 border-stone/30',
    focus: 'border-accent',
  },
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      error,
      helperText,
      icon,
      className = '',
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const styles = variantStyles[variant]

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div className="w-full">
        {label && (
          <motion.label
            initial={false}
            animate={{ color: isFocused ? '#0066cc' : '#737373' }}
            className="block font-body text-sm font-medium mb-2 transition-colors"
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
              {icon}
            </span>
          )}

          <motion.input
            ref={ref}
            initial={false}
            animate={{
              borderColor: error ? '#ef4444' : isFocused ? '#0066cc' : undefined,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              w-full font-body
              rounded-lg
              transition-all duration-200
              placeholder:text-stone/50
              focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
              ${styles.base}
              ${isFocused ? styles.focus : ''}
              ${error ? 'border-red-500 ring-2 ring-red-500/20' : ''}
              ${sizeStyles[size]}
              ${icon ? 'pl-11' : ''}
              ${className}
            `}
            {...props}
          />
        </div>

        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-2 text-sm font-body ${error ? 'text-red-500' : 'text-stone'}`}
          >
            {error || helperText}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Email-specific input with validation styling
export interface EmailInputProps extends Omit<InputProps, 'type'> {
  showIcon?: boolean
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ showIcon = true, placeholder = 'your@email.com', ...props }, ref) => {
    const emailIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )

    return (
      <Input
        ref={ref}
        type="email"
        placeholder={placeholder}
        icon={showIcon ? emailIcon : undefined}
        autoComplete="email"
        autoCapitalize="off"
        autoCorrect="off"
        {...props}
      />
    )
  }
)

EmailInput.displayName = 'EmailInput'

export default Input

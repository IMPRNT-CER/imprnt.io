import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#faf9f7' },
        { name: 'ink', value: '#1a1a1a' },
        { name: 'paper', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Get Started',
    size: 'md',
  },
}

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Learn More',
    size: 'md',
  },
}

// Ghost Button
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
    size: 'md',
  },
}

// Loading State
export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Submitting...',
    isLoading: true,
  },
}

// Disabled State
export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Unavailable',
    disabled: true,
  },
}

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-start">
      <div className="space-y-2">
        <p className="font-mono text-xs text-stone uppercase tracking-wider">Primary</p>
        <div className="flex items-center gap-4">
          <Button variant="primary">Default</Button>
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="font-mono text-xs text-stone uppercase tracking-wider">Secondary</p>
        <div className="flex items-center gap-4">
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" isLoading>Loading</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="font-mono text-xs text-stone uppercase tracking-wider">Ghost</p>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" isLoading>Loading</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
}

// CTA Example
export const CTAExample: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="lg">
        Join the Waitlist
      </Button>
      <Button variant="secondary" size="lg">
        Learn More →
      </Button>
    </div>
  ),
}

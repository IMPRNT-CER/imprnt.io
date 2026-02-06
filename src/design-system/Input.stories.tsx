import type { Meta, StoryObj } from '@storybook/react'
import Input, { EmailInput } from './Input'
import Button from './Button'
import { Title, Body, Label } from './Typography'

const meta = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'padded',
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
      options: ['default', 'filled', 'outlined'],
      description: 'Visual style of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    label: {
      control: 'text',
      description: 'Label text above the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Default Input
export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: 'Enter your name...',
  },
}

// With Label
export const WithLabel: Story = {
  args: {
    variant: 'default',
    label: 'Full Name',
    placeholder: 'John Doe',
  },
}

// Filled Variant
export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
}

// Outlined Variant
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Organization',
    placeholder: 'Research Institute...',
  },
}

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: "We'll never share your email with anyone.",
  },
}

// With Error
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address.',
    defaultValue: 'invalid-email',
  },
}

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    disabled: true,
    defaultValue: 'disabled@example.com',
  },
}

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input variant="default" label="Default" placeholder="Standard input..." />
      <Input variant="filled" label="Filled" placeholder="Filled background..." />
      <Input variant="outlined" label="Outlined" placeholder="Bold border..." />
    </div>
  ),
}

// Email Input Component
export const EmailInputDefault: Story = {
  render: () => (
    <div className="max-w-md">
      <EmailInput label="Email Address" />
    </div>
  ),
}

// Email Input Without Icon
export const EmailInputNoIcon: Story = {
  render: () => (
    <div className="max-w-md">
      <EmailInput label="Email Address" showIcon={false} />
    </div>
  ),
}

// Newsletter Signup Form
export const NewsletterSignup: Story = {
  render: () => (
    <div className="max-w-md p-8 bg-paper rounded-xl shadow-lg">
      <Title level={4} className="mb-2">Stay Updated</Title>
      <Body size="sm" muted className="mb-6">
        Get the latest research updates and breakthroughs delivered to your inbox.
      </Body>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <EmailInput 
          label="Email Address" 
          helperText="We respect your privacy. Unsubscribe anytime."
        />
        <Button variant="primary" className="w-full">
          Join the Waitlist
        </Button>
      </form>
    </div>
  ),
}

// Inline Signup
export const InlineSignup: Story = {
  render: () => (
    <div className="max-w-lg">
      <Label className="mb-4 block">Join Our Research Network</Label>
      <div className="flex gap-3">
        <div className="flex-1">
          <EmailInput variant="filled" size="lg" />
        </div>
        <Button variant="primary" size="lg">
          Subscribe
        </Button>
      </div>
    </div>
  ),
}

// CTA Section
export const CTASection: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="bg-ink py-20 px-8">
      <div className="max-w-2xl mx-auto text-center">
        <Title level={2} className="text-paper mb-4">
          Be Part of the Future
        </Title>
        <Body className="text-stone mb-8">
          Join thousands of researchers and institutions already using Imprnt 
          to accelerate cancer research and save lives.
        </Body>
        
        <form 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 max-w-sm">
            <EmailInput 
              variant="filled" 
              size="lg"
              className="bg-charcoal border-charcoal text-paper placeholder:text-stone"
            />
          </div>
          <Button variant="primary" size="lg">
            Request Early Access
          </Button>
        </form>
        
        <Body size="sm" className="text-stone mt-4">
          Currently in private beta. Limited spots available.
        </Body>
      </div>
    </div>
  ),
}

// Contact Form
export const ContactForm: Story = {
  render: () => (
    <div className="max-w-md p-8 bg-paper rounded-xl border border-warm">
      <Title level={4} className="mb-6">Get in Touch</Title>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
        </div>
        <EmailInput label="Email" />
        <Input label="Organization" placeholder="Research Institute" variant="filled" />
        <div className="pt-2">
          <Button variant="primary" className="w-full">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  ),
}

// States Showcase
export const StatesShowcase: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <Label size="sm" className="mb-3 block text-stone">Default</Label>
        <Input placeholder="Default state..." />
      </div>
      <div>
        <Label size="sm" className="mb-3 block text-stone">With Value</Label>
        <Input defaultValue="user@example.com" />
      </div>
      <div>
        <Label size="sm" className="mb-3 block text-stone">Error State</Label>
        <Input 
          error="This field is required" 
          defaultValue="" 
          placeholder="Required field"
        />
      </div>
      <div>
        <Label size="sm" className="mb-3 block text-stone">Disabled</Label>
        <Input disabled defaultValue="Cannot edit" />
      </div>
    </div>
  ),
}

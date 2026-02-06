import type { Meta, StoryObj } from '@storybook/react'
import Card, { CardHeader, CardContent, CardFooter } from './Card'
import { Title, Body, Label, Mono } from './Typography'
import Badge from './Badge'
import Button from './Button'

const meta = {
  title: 'Design System/Card',
  component: Card,
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
      options: ['default', 'elevated', 'outlined', 'glass'],
      description: 'Visual style of the card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enables hover lift effect',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Default Card
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <CardHeader>
          <Title level={4}>Research Initiative</Title>
        </CardHeader>
        <CardContent>
          <Body>
            Our ongoing research focuses on developing targeted therapies 
            that minimize side effects while maximizing treatment efficacy.
          </Body>
        </CardContent>
      </>
    ),
  },
}

// Elevated Card
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <Title level={4}>Featured Update</Title>
        </CardHeader>
        <CardContent>
          <Body>
            Elevated cards have more prominent shadows, making them 
            stand out from the background for important content.
          </Body>
        </CardContent>
      </>
    ),
  },
}

// Outlined Card
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>
          <Title level={4}>Clinical Trial</Title>
        </CardHeader>
        <CardContent>
          <Body>
            Outlined cards provide a subtle, minimal appearance 
            suitable for secondary content or grouped items.
          </Body>
        </CardContent>
      </>
    ),
  },
}

// Glass Card (for use on images/gradients)
export const Glass: Story = {
  render: () => (
    <div 
      className="p-12 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
      }}
    >
      <Card variant="glass">
        <CardHeader>
          <Title level={4} className="text-ink">Glassmorphism</Title>
        </CardHeader>
        <CardContent>
          <Body>
            Glass cards work beautifully on top of images or gradient 
            backgrounds with their frosted appearance.
          </Body>
        </CardContent>
      </Card>
    </div>
  ),
}

// Hoverable Card
export const Hoverable: Story = {
  args: {
    variant: 'default',
    hoverable: true,
    children: (
      <>
        <CardHeader>
          <Label size="sm">Pillar 01</Label>
          <Title level={4} className="mt-2">Drug Discovery</Title>
        </CardHeader>
        <CardContent>
          <Body>
            Hover over this card to see the lift effect. Click to interact.
          </Body>
        </CardContent>
      </>
    ),
  },
}

// Card with Badge
export const WithBadge: Story = {
  render: () => (
    <Card hoverable className="max-w-sm">
      <CardHeader className="flex items-start justify-between">
        <div>
          <Title level={4}>Platform Alpha</Title>
          <Mono size="sm" className="mt-1">v0.4.2-beta</Mono>
        </div>
        <Badge status="in-development" pulse />
      </CardHeader>
      <CardContent>
        <Body size="sm">
          AI-powered drug discovery platform for accelerating 
          therapeutic compound identification.
        </Body>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm">View Details →</Button>
      </CardFooter>
    </Card>
  ),
}

// Card Grid
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      {[
        { 
          label: 'Pillar 01', 
          title: 'Drug Discovery',
          body: 'AI-driven molecular modeling and compound screening.',
          status: 'in-development' as const,
        },
        { 
          label: 'Pillar 02', 
          title: 'Personalized Medicine',
          body: 'Tailored treatment protocols based on genetic profiles.',
          status: 'coming-soon' as const,
        },
        { 
          label: 'Pillar 03', 
          title: 'Research Collaboration',
          body: 'Global network connecting researchers and institutions.',
          status: 'live' as const,
        },
      ].map((item, i) => (
        <Card key={i} hoverable>
          <CardHeader className="flex items-start justify-between">
            <Label size="sm">{item.label}</Label>
            <Badge status={item.status} size="sm" />
          </CardHeader>
          <CardContent>
            <Title level={4} className="mb-3">{item.title}</Title>
            <Body size="sm" muted>{item.body}</Body>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

// Feature Card
export const FeatureCard: Story = {
  render: () => (
    <Card variant="elevated" padding="lg" className="max-w-md">
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
        <span className="text-2xl">🔬</span>
      </div>
      <Title level={3} className="mb-4">Advanced Analytics</Title>
      <Body className="mb-6">
        Real-time data processing and visualization tools that help 
        researchers identify patterns and accelerate discoveries.
      </Body>
      <div className="flex gap-3">
        <Button variant="primary" size="sm">Get Started</Button>
        <Button variant="ghost" size="sm">Learn More</Button>
      </div>
    </Card>
  ),
}

// Testimonial Card
export const TestimonialCard: Story = {
  parameters: {
    backgrounds: { default: 'ink' },
  },
  render: () => (
    <Card 
      variant="outlined" 
      padding="lg" 
      className="max-w-lg border-stone/10 bg-charcoal/50"
    >
      <blockquote className="font-display text-xl text-paper/90 italic leading-relaxed mb-6">
        "The imprnt platform has revolutionized how we approach 
        early-stage drug discovery. What used to take months now 
        takes weeks."
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-stone/30" />
        <div>
          <p className="font-body font-medium text-paper">Dr. Sarah Chen</p>
          <p className="font-mono text-xs text-stone uppercase tracking-wider">
            Head of Research, BioTech Labs
          </p>
        </div>
      </div>
    </Card>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-3xl">
      {(['default', 'elevated', 'outlined'] as const).map((variant) => (
        <Card key={variant} variant={variant} hoverable>
          <CardHeader>
            <Mono size="sm" className="uppercase">{variant}</Mono>
            <Title level={4} className="mt-2">Card Variant</Title>
          </CardHeader>
          <CardContent>
            <Body size="sm">
              This is the {variant} card variant with hover enabled.
            </Body>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

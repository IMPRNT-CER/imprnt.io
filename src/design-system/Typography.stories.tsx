import type { Meta, StoryObj } from '@storybook/react'
import { Title, Subtitle, Body, Label, Mono } from './Typography'

const meta = {
  title: 'Design System/Typography',
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
} satisfies Meta

export default meta
type Story = StoryObj

// Title Component
export const Titles: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Label size="sm" className="mb-2 block">Title Level 1 — Playfair Display</Label>
        <Title level={1}>Eradicating Cancer</Title>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Title Level 2</Label>
        <Title level={2}>Our Mission Statement</Title>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Title Level 3</Label>
        <Title level={3}>Research & Innovation</Title>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Title Level 4</Label>
        <Title level={4}>Making Progress Together</Title>
      </div>
    </div>
  ),
}

// Title with Gradient
export const TitleGradient: Story = {
  render: () => (
    <div className="space-y-4">
      <Title level={1}>
        <span>Eradicating </span>
        <span className="text-gradient">Cancer</span>
      </Title>
      <Title level={2} gradient>
        Full Gradient Title
      </Title>
    </div>
  ),
}

// Subtitle Component
export const Subtitles: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Label size="sm" className="mb-2 block">Subtitle Level 1 — Playfair Display</Label>
        <Subtitle level={1}>Through research. Through innovation.</Subtitle>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Subtitle Level 2</Label>
        <Subtitle level={2}>Pioneering the future of oncology</Subtitle>
      </div>
    </div>
  ),
}

// Body Text
export const BodyText: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Label size="sm" className="mb-2 block">Body Large — Inter</Label>
        <Body size="lg">
          We're building the next generation of cancer research tools, 
          combining cutting-edge technology with decades of medical expertise.
        </Body>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Body Medium (Default)</Label>
        <Body>
          Our platform leverages artificial intelligence and machine learning 
          to accelerate drug discovery and personalized treatment protocols.
        </Body>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Body Small</Label>
        <Body size="sm">
          By partnering with leading research institutions worldwide, we're 
          creating a collaborative ecosystem focused on breakthrough discoveries.
        </Body>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Body Muted</Label>
        <Body muted>
          This is muted text for secondary information that doesn't need 
          as much visual emphasis as primary content.
        </Body>
      </div>
    </div>
  ),
}

// Labels
export const Labels: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs text-stone mb-2">Label Medium — Inter, Uppercase</p>
        <Label>A New Beginning</Label>
      </div>
      <div>
        <p className="font-mono text-xs text-stone mb-2">Label Small</p>
        <Label size="sm">Scroll to Explore</Label>
      </div>
    </div>
  ),
}

// Mono Text
export const MonoText: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Label size="sm" className="mb-2 block">Mono Large — Space Mono</Label>
        <Mono size="lg">console.log("Hello, World!")</Mono>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Mono Medium</Label>
        <Mono>v1.0.0-beta.4</Mono>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Mono Small</Label>
        <Mono size="sm">IMPRNT-2024-001</Mono>
      </div>
      <div>
        <Label size="sm" className="mb-2 block">Mono Block</Label>
        <Mono block>npm install @imprnt/core</Mono>
      </div>
    </div>
  ),
}

// Full Typography Scale
export const FullScale: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl">
      <section>
        <Label className="mb-6 block">Display / Headings</Label>
        <div className="space-y-4">
          <Title level={1}>Title 1 — Hero Headlines</Title>
          <Title level={2}>Title 2 — Section Headers</Title>
          <Title level={3}>Title 3 — Card Titles</Title>
          <Title level={4}>Title 4 — Small Headers</Title>
          <Subtitle level={1}>Subtitle 1 — Supporting Text</Subtitle>
          <Subtitle level={2}>Subtitle 2 — Smaller Support</Subtitle>
        </div>
      </section>
      
      <section>
        <Label className="mb-6 block">Body Text</Label>
        <div className="space-y-4">
          <Body size="lg">Body Large — Introductions and key paragraphs</Body>
          <Body>Body Medium — Standard paragraph text for most content</Body>
          <Body size="sm">Body Small — Fine print, captions, and footnotes</Body>
          <Body muted>Body Muted — Secondary, less important information</Body>
        </div>
      </section>
      
      <section>
        <Label className="mb-6 block">Technical / UI</Label>
        <div className="space-y-4 flex flex-col items-start">
          <Label>Label — Navigation, Tags, Categories</Label>
          <Label size="sm">Label Small — Micro Labels</Label>
          <Mono>Mono — Technical Text, Versions</Mono>
          <Mono block>Mono Block — Code Snippets</Mono>
        </div>
      </section>
    </div>
  ),
}

// Dark Background Example
export const OnDarkBackground: Story = {
  parameters: {
    backgrounds: { default: 'ink' },
  },
  render: () => (
    <div className="space-y-6">
      <Title level={2} className="text-paper">Title on Dark</Title>
      <Subtitle level={1} className="text-cream">Subtitle on Dark</Subtitle>
      <Body className="text-stone">Body text adapts to dark backgrounds with lighter shades.</Body>
      <Label className="text-accent-light">Label on Dark</Label>
      <Mono className="text-gold">Mono on Dark</Mono>
    </div>
  ),
}

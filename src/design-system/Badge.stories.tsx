import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'
import { Mono } from './Typography'

const meta = {
  title: 'Design System/Badge',
  component: Badge,
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
    status: {
      control: 'select',
      options: ['coming-soon', 'in-development', 'live', 'beta', 'archived', 'custom'],
      description: 'Preset status styles',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size',
    },
    pulse: {
      control: 'boolean',
      description: 'Animated pulse indicator',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Coming Soon
export const ComingSoon: Story = {
  args: {
    status: 'coming-soon',
  },
}

// In Development
export const InDevelopment: Story = {
  args: {
    status: 'in-development',
    pulse: true,
  },
}

// Live
export const Live: Story = {
  args: {
    status: 'live',
    pulse: true,
  },
}

// Beta
export const Beta: Story = {
  args: {
    status: 'beta',
  },
}

// Archived
export const Archived: Story = {
  args: {
    status: 'archived',
  },
}

// Custom Badge
export const Custom: Story = {
  args: {
    status: 'custom',
    children: 'Custom Label',
  },
}

// All Statuses
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Badge status="coming-soon" />
        <Mono size="sm">status="coming-soon"</Mono>
      </div>
      <div className="flex items-center gap-3">
        <Badge status="in-development" pulse />
        <Mono size="sm">status="in-development" pulse</Mono>
      </div>
      <div className="flex items-center gap-3">
        <Badge status="live" pulse />
        <Mono size="sm">status="live" pulse</Mono>
      </div>
      <div className="flex items-center gap-3">
        <Badge status="beta" />
        <Mono size="sm">status="beta"</Mono>
      </div>
      <div className="flex items-center gap-3">
        <Badge status="archived" />
        <Mono size="sm">status="archived"</Mono>
      </div>
      <div className="flex items-center gap-3">
        <Badge status="custom">NEW</Badge>
        <Mono size="sm">status="custom"</Mono>
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Badge status="in-development" size="sm" />
        <Mono size="sm">size="sm"</Mono>
      </div>
      <div className="flex items-center gap-3">
        <Badge status="in-development" size="md" />
        <Mono size="sm">size="md" (default)</Mono>
      </div>
    </div>
  ),
}

// With Pulse Animation
export const WithPulse: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge status="coming-soon" pulse />
      <Badge status="in-development" pulse />
      <Badge status="live" pulse />
      <Badge status="beta" pulse />
    </div>
  ),
}

// In Context - Feature List
export const InContext: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center justify-between p-3 bg-paper rounded-lg border border-warm">
        <span className="font-body text-ink">Drug Discovery Platform</span>
        <Badge status="live" size="sm" pulse />
      </div>
      <div className="flex items-center justify-between p-3 bg-paper rounded-lg border border-warm">
        <span className="font-body text-ink">Genomics Analysis</span>
        <Badge status="in-development" size="sm" pulse />
      </div>
      <div className="flex items-center justify-between p-3 bg-paper rounded-lg border border-warm">
        <span className="font-body text-ink">Clinical Trials Network</span>
        <Badge status="beta" size="sm" />
      </div>
      <div className="flex items-center justify-between p-3 bg-paper rounded-lg border border-warm">
        <span className="font-body text-ink">Patient Portal</span>
        <Badge status="coming-soon" size="sm" />
      </div>
      <div className="flex items-center justify-between p-3 bg-paper rounded-lg border border-warm">
        <span className="font-body text-slate">Legacy API</span>
        <Badge status="archived" size="sm" />
      </div>
    </div>
  ),
}

// On Dark Background
export const OnDark: Story = {
  parameters: {
    backgrounds: { default: 'ink' },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge status="coming-soon" />
      <Badge status="in-development" pulse />
      <Badge status="live" pulse />
      <Badge status="beta" />
    </div>
  ),
}

// Version Badges
export const VersionBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge status="custom">v1.0.0</Badge>
      <Badge status="custom">v2.0.0-alpha</Badge>
      <Badge status="beta">v3.0.0-beta.4</Badge>
      <Badge status="custom">Latest</Badge>
    </div>
  ),
}

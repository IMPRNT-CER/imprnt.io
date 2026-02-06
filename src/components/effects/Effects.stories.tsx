import type { Meta, StoryObj } from '@storybook/react'
import ParticleField from './ParticleField'
import GlowOrb, { GlowOrbs } from './GlowOrb'
import GridLines from './GridLines'
import NoiseTexture from './NoiseTexture'

// ============================================
// PARTICLE FIELD STORIES
// ============================================

const particleMeta: Meta<typeof ParticleField> = {
  title: 'Effects/ParticleField',
  component: ParticleField,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-ink">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default particleMeta

type ParticleStory = StoryObj<typeof ParticleField>

export const Default: ParticleStory = {
  args: {
    particleCount: 50,
    interactive: true,
    theme: 'mixed',
    baseOpacity: 0.6,
    sizeRange: [2, 6],
  },
}

export const AccentTheme: ParticleStory = {
  args: {
    particleCount: 40,
    theme: 'accent',
    interactive: true,
    baseOpacity: 0.8,
  },
}

export const GoldTheme: ParticleStory = {
  args: {
    particleCount: 40,
    theme: 'gold',
    interactive: true,
    baseOpacity: 0.7,
  },
}

export const Dense: ParticleStory = {
  args: {
    particleCount: 100,
    theme: 'mixed',
    interactive: true,
    baseOpacity: 0.4,
    sizeRange: [1, 4],
  },
}

export const NonInteractive: ParticleStory = {
  args: {
    particleCount: 50,
    theme: 'mixed',
    interactive: false,
    baseOpacity: 0.6,
  },
}

export const LightBackground: ParticleStory = {
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-cream">
        <Story />
      </div>
    ),
  ],
  args: {
    particleCount: 40,
    theme: 'neutral',
    interactive: true,
    baseOpacity: 0.4,
    sizeRange: [2, 5],
  },
}

// ============================================
// GLOW ORB STORIES
// ============================================

const glowOrbMeta: Meta<typeof GlowOrb> = {
  title: 'Effects/GlowOrb',
  component: GlowOrb,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-ink">
        <Story />
      </div>
    ),
  ],
}

export const SingleAccentOrb: StoryObj<typeof GlowOrb> = {
  args: {
    size: 400,
    color: 'accent',
    position: [50, 50],
    intensity: 1,
    pulse: true,
    float: true,
    followMouse: false,
  },
}

export const SingleGoldOrb: StoryObj<typeof GlowOrb> = {
  args: {
    size: 350,
    color: 'gold',
    position: [50, 50],
    intensity: 0.8,
    pulse: true,
    float: true,
  },
}

export const MouseFollowing: StoryObj<typeof GlowOrb> = {
  args: {
    size: 300,
    color: 'accent',
    position: [50, 50],
    intensity: 1,
    followMouse: true,
    pulse: true,
    float: false,
  },
}

export const MultipleOrbs: StoryObj<typeof GlowOrbs> = {
  render: () => (
    <div className="relative w-full h-screen bg-ink">
      <GlowOrbs
        orbs={[
          { color: 'accent', position: [25, 30], size: 400, intensity: 0.8 },
          { color: 'gold', position: [75, 60], size: 300, intensity: 0.6 },
          { color: 'accent', position: [50, 80], size: 250, intensity: 0.5 },
        ]}
      />
    </div>
  ),
}

export const StaticOrb: StoryObj<typeof GlowOrb> = {
  args: {
    size: 300,
    color: 'accent',
    position: [50, 50],
    pulse: false,
    float: false,
    intensity: 0.8,
  },
}

export const LargeBlur: StoryObj<typeof GlowOrb> = {
  args: {
    size: 500,
    color: 'gold',
    position: [50, 50],
    blur: 150,
    intensity: 0.6,
    pulse: true,
    float: true,
  },
}

// ============================================
// GRID LINES STORIES
// ============================================

const gridLinesMeta: Meta<typeof GridLines> = {
  title: 'Effects/GridLines',
  component: GridLines,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-ink">
        <Story />
      </div>
    ),
  ],
}

export const DefaultGrid: StoryObj<typeof GridLines> = {
  args: {
    horizontalLines: 12,
    verticalLines: 20,
    color: 'accent',
    opacity: 0.15,
    perspective: true,
    interactive: true,
    animated: true,
  },
}

export const GoldGrid: StoryObj<typeof GridLines> = {
  args: {
    horizontalLines: 10,
    verticalLines: 16,
    color: 'gold',
    opacity: 0.2,
    perspective: true,
    interactive: true,
    animated: true,
  },
}

export const FlatGrid: StoryObj<typeof GridLines> = {
  args: {
    horizontalLines: 8,
    verticalLines: 12,
    color: 'neutral',
    opacity: 0.1,
    perspective: false,
    interactive: false,
    animated: false,
  },
}

export const DenseGrid: StoryObj<typeof GridLines> = {
  args: {
    horizontalLines: 20,
    verticalLines: 30,
    color: 'accent',
    opacity: 0.1,
    perspective: true,
    perspectiveDepth: 1000,
    interactive: true,
    animated: true,
    animationSpeed: 0.5,
  },
}

export const StaticPerspective: StoryObj<typeof GridLines> = {
  args: {
    horizontalLines: 12,
    verticalLines: 20,
    color: 'accent',
    opacity: 0.2,
    perspective: true,
    interactive: false,
    animated: false,
  },
}

export const LightBackgroundGrid: StoryObj<typeof GridLines> = {
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-cream">
        <Story />
      </div>
    ),
  ],
  args: {
    horizontalLines: 10,
    verticalLines: 16,
    color: 'neutral',
    opacity: 0.15,
    perspective: true,
    interactive: true,
    animated: true,
  },
}

// ============================================
// NOISE TEXTURE STORIES
// ============================================

const noiseTextureMeta: Meta<typeof NoiseTexture> = {
  title: 'Effects/NoiseTexture',
  component: NoiseTexture,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-ink">
        <Story />
      </div>
    ),
  ],
}

export const SubtleNoise: StoryObj<typeof NoiseTexture> = {
  args: {
    opacity: 0.05,
    density: 1,
    type: 'fine',
    blendMode: 'overlay',
    animated: false,
  },
}

export const AnimatedNoise: StoryObj<typeof NoiseTexture> = {
  args: {
    opacity: 0.08,
    density: 0.8,
    type: 'fine',
    blendMode: 'overlay',
    animated: true,
    frameSkip: 3,
  },
}

export const CoarseGrain: StoryObj<typeof NoiseTexture> = {
  args: {
    opacity: 0.1,
    density: 1,
    type: 'coarse',
    blendMode: 'soft-light',
    animated: false,
  },
}

export const FilmGrain: StoryObj<typeof NoiseTexture> = {
  args: {
    opacity: 0.12,
    density: 0.6,
    type: 'grain',
    blendMode: 'overlay',
    animated: true,
    frameSkip: 2,
  },
}

export const TintedNoise: StoryObj<typeof NoiseTexture> = {
  args: {
    opacity: 0.08,
    density: 1,
    type: 'fine',
    blendMode: 'overlay',
    tint: 'rgba(0, 102, 204, 0.1)',
    animated: false,
  },
}

export const LightBackgroundNoise: StoryObj<typeof NoiseTexture> = {
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-cream">
        <Story />
      </div>
    ),
  ],
  args: {
    opacity: 0.03,
    density: 1,
    type: 'fine',
    blendMode: 'multiply',
    animated: false,
  },
}

// ============================================
// COMBINED EFFECTS STORY
// ============================================

export const CombinedEffects: StoryObj<typeof ParticleField> = {
  render: () => (
    <div className="relative w-full h-screen bg-ink overflow-hidden">
      {/* Base grid */}
      <GridLines
        color="accent"
        opacity={0.1}
        perspective={true}
        interactive={true}
        animated={true}
      />
      
      {/* Glow orbs */}
      <GlowOrbs
        orbs={[
          { color: 'accent', position: [20, 40], size: 400, intensity: 0.5 },
          { color: 'gold', position: [80, 60], size: 300, intensity: 0.4 },
        ]}
      />
      
      {/* Particles */}
      <ParticleField
        particleCount={40}
        theme="mixed"
        interactive={true}
        baseOpacity={0.5}
      />
      
      {/* Noise overlay */}
      <NoiseTexture
        opacity={0.04}
        type="fine"
        blendMode="overlay"
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-['Playfair_Display'] text-white/90">
          Imprnt Effects
        </h1>
      </div>
    </div>
  ),
}

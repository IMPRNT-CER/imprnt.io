import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#faf9f7' },
        { name: 'paper', value: '#ffffff' },
        { name: 'ink', value: '#1a1a1a' },
        { name: 'warm', value: '#f5f0eb' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

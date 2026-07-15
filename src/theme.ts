import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "JetBrains Mono, monospace" },
        body: { value: "JetBrains Mono, monospace" },
        mono: { value: "JetBrains Mono, monospace" },
      },
      colors: {
        terminal: {
          background: { value: "var(--portfolio-background, #050508)" },
          surface: { value: "var(--portfolio-surface, #0b0b0f)" },
          border: { value: "var(--portfolio-border, #1f1f2e)" },
          muted: { value: "var(--portfolio-muted, #6b7280)" },
          primary: { value: "var(--portfolio-primary, #22d3ee)" },
          secondary: { value: "var(--portfolio-secondary, #0fee0f)" },
          text: { value: "var(--portfolio-text, #e5e7eb)" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          canvas: { value: "{colors.terminal.background}" },
          surface: { value: "{colors.terminal.surface}" },
        },
        border: {
          matrix: { value: "{colors.terminal.border}" },
        },
        accent: {
          primary: { value: "{colors.terminal.primary}" },
          secondary: { value: "{colors.terminal.secondary}" },
          solid: { value: "{colors.terminal.secondary}" },
        },
        fg: {
          DEFAULT: { value: "{colors.terminal.text}" },
          muted: { value: "{colors.terminal.muted}" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

import { createStitches, defaultThemeMap } from '@stitches/react'
import { colors } from './colors'

export const { getCssText, styled, globalCss, css, keyframes, theme, config } =
  createStitches({
    themeMap: {
      ...defaultThemeMap,
    },
    theme: {
      colors,
    },
    media: {
      mobile: '(max-width: 530px)',
      tablet: '(max-width: 768px)',
      pc: '(min-width: 1024px)',
    },
  })

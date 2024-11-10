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
  })

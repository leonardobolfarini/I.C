import { globalCss } from './stitches'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  'body, input, button': {
    backgroundColor: '$slate50',
    fontFamily: 'Roboto, sans-serif',
    color: '#000',
  },
})

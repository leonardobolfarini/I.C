import { globalCss, keyframes, styled } from './stitches'

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

export const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const LoadingIcon = styled('div', {
  border: '4px solid $colors$gray300',
  borderTop: '4px solid $colors$blue500',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  animation: `${spin} 0.8s linear infinite`,
})

import { styled } from '@/src/styles/stitches'

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '1.25rem',
  fontWeight: 'bold',

  padding: '1rem 1.75rem',
  borderRadius: 6,
  border: 0,
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  variants: {
    colorButton: {
      cyan: {
        background: '$cyan300',
        color: '$white',
        '&:hover': {
          background: '$cyan500',
          color: '$gray',
        },
      },
      white: {
        background: '$white',
        color: '$cyan300',
        '&:hover': {
          background: '$gray',
          color: '$cyan500',
        },
      },
    },
  },
})

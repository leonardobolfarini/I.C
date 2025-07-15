import { styled } from '@/src/styles/stitches'

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',

  fontSize: '1.125rem',
  fontWeight: '500',

  padding: '1rem 1.75rem',
  borderRadius: 6,
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',

  svg: {
    background: 'transparent',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  variants: {
    colorButton: {
      black: {
        background: '$black',
        color: '$white',
        '&:hover': {
          background: '$slate700',
          color: '$slate100',
        },
      },
      transparent: {
        background: 'transparent',
        borderColor: '$slate300',
        color: '$black',
        '&:hover': {
          background: '$slate100',
          color: '$black',
        },
      },
    },
    size: {
      small: {
        fontSize: '0.875rem',
        padding: '0.25rem 1rem',
        gap: '1rem',
      },
      medium: {
        fontSize: '1rem',
        padding: '0.875rem 1.5rem',
      },
      large: {
        fontSize: '1.125rem',
        padding: '1rem 1.75rem',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    colorButton: 'transparent',
  },
})

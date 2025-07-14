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
  border: 0,
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
    },
  },
})

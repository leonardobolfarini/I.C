import { styled } from '@/src/styles/stitches'

export const NavBarContainer = styled('nav', {
  display: 'flex',
  flexDirection: 'row',

  padding: '4px',
  backgroundColor: '$slate100',
  borderRadius: '8px',
})

export const NavBarItem = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  textDecoration: 'none',

  width: '100%',
  padding: '0.5rem 0',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: '$slate50',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$white',
        color: '$black',
        fontWeight: 'bold',
      },
      false: {
        backgroundColor: '$slate100',
        color: '$slate700',
        fontWeight: 'normal',
      },
    },
  },
})

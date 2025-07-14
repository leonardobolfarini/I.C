import { styled } from '@/src/styles/stitches'

export const InfoCardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  padding: '1rem',
  borderRadius: '8px',

  backgroundColor: '$white',

  h3: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: 1.4,
    color: '$slate600',
  },

  p: {
    fontSize: '1.25rem',
    fontWeight: '700',
    lineHeight: 1.4,
  },

  '*': {
    backgroundColor: '$white',
  },
})

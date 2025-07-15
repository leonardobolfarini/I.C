import { styled } from '@/src/styles/stitches'

export const GeneratedFileContainer = styled('div', {
  backgroundColor: '$white',
  border: '1px solid $slate300',
  borderRadius: '6px',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '0.75rem',

  '& > div': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',

      p: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '$black',
      },

      span: {
        fontSize: '0.875rem',
        fontWeight: 'normal',
        color: '$slate500',
      },
    },
  },
  '& a': {
    textDecoration: 'none',
  },
})

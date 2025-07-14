import { styled } from '@/src/styles/stitches'

export const TopicCardContainer = styled('div', {
  backgroundColor: '$white',

  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1rem',
  borderRadius: '8px',

  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
})

export const CardHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundColor: '$white',

  svg: {
    backgroundColor: '$white',
  },

  span: {
    backgroundColor: '$slate100',

    borderRadius: '999px',
    padding: '0.25rem 0.5rem',

    fontWeight: '500',
    fontSize: '0.875rem',

    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const CardTitle = styled('h3', {
  backgroundColor: '$white',

  fontSize: '1.25rem',
  fontWeight: 'bold',
})
export const CardDetails = styled('span', {
  backgroundColor: '$white',
  color: '$slate500',

  fontSize: '0.875rem',
  lineHeight: '140%',
})
export const CardDescription = styled('p', {
  backgroundColor: '$white',
  color: '$slate600',
})

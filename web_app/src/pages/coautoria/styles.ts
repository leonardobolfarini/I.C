import { styled } from '@/src/styles/stitches'

export const GraphViewContainer = styled('div', {
  marginTop: '2rem',
  padding: '1rem',

  border: '1px solid $slate300',
  borderRadius: '8px',

  backgroundColor: '$white',
})

export const GraphViewHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  marginBottom: '2rem',

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    gap: '0.5rem',

    h1: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
  },

  footer: {
    fontSize: '0.875rem',
    color: '$slate500',
  },
})

export const GraphViewForm = styled('div', {})

export const GraphViewFileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const GraphContainer = styled('div', {
  marginTop: '1rem',
  width: '100%',
  height: '100%',
})

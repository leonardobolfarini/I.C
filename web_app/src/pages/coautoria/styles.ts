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

export const GraphDisplayContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  backgroundColor: '$slate100',
  border: '1px solid $slate300',

  padding: '2rem',
  borderRadius: '8px',
  marginTop: '2rem',
})

export const GraphDisplayHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  h3: {
    fontSize: '1.25rem',
    fontWeight: '600',
  },

  span: {
    fontSize: '0.875rem',
    color: '$slate500',
  },
})

export const GraphDisplay = styled('div', {
  backgroundColor: '$white',
  border: '1px solid $slate300',
  borderRadius: '8px',
})

export const GraphDisplayWithoutData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '400px',
  padding: '2rem',

  h2: {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '$slate400',
    marginTop: '1rem',
  },

  span: {
    fontSize: '0.875rem',
    color: '$slate400',
    textAlign: 'center',
  },
})

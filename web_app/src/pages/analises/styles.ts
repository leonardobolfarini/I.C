import { styled } from '@/src/styles/stitches'

export const Header = styled('div', {
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

      '@mobile': {
        fontSize: '1rem',
      },
    },

    '@mobile': {
      svg: {
        display: 'none',
      },
    },
  },

  footer: {
    fontSize: '0.875rem',
    color: '$slate500',

    '@mobile': {
      fontSize: '0.75rem',
    },
  },
})

export const ChartsContainer = styled('div', {
  marginTop: '2rem',
  padding: '1rem',

  border: '1px solid $slate300',
  borderRadius: '8px',

  backgroundColor: '$white',
})

export const ChartsForm = styled('div', {})

export const ChartsDisplayContainer = styled('div', {
  marginTop: '2rem',

  backgroundColor: '$slate100',
  padding: '1rem',
  borderRadius: '8px',
})

export const ChartsBarViewDisplayContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const ChartViewContainer = styled('div', {
  backgroundColor: '$white',
  border: '1px solid $slate300',
  borderRadius: '8px',
  padding: '1rem',
})

export const ChartLineViewDisplayContainer = styled('div', {})

export const YearsChartLine = styled('div', {})

export const ChartWithoutData = styled('div', {
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

  '@mobile': {
    padding: '1rem',

    svg: {
      height: '48px',
    },

    h2: {
      fontSize: '1rem',
      textAlign: 'center',
    },

    span: {
      fontSize: '0.75rem',
    },
  },
})

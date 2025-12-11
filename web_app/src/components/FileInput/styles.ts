import { styled } from '@/src/styles/stitches'

export const FileInputLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '300px',
  fontWeight: 'bold',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#fafafa',
  },
})

export const FileInputContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  textAlign: 'center',

  svg: {
    backgroundColor: 'transparent',
  },

  p: {
    fontSize: '1.25rem',
    fontWeight: '800',
  },

  span: {
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    padding: '0.25rem 1rem',
    borderRadius: '9999px',

    fontSize: '0.875rem',
    fontWeight: '700',
    color: '$blue800',
  },

  '@mobile': {
    p: {
      fontSize: '0.875rem',
    },
    svg: {
      height: '48px',
    },
  },
})

export const FileInputStyle = styled('input', {
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
})

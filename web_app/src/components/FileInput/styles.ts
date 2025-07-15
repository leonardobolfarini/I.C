import { styled } from '@/src/styles/stitches'

export const FileInputLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontWeight: 'bold',
  cursor: 'default',

  width: '100%',
  height: '300px',

  div: {
    cursor: 'pointer',
    padding: '20px',
    background: '$white',
  },
})

export const FileInputContent = styled('div', {
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',

    svg: {
      backgroundColor: 'transparent',
    },
  },
})

export const FileInputStyle = styled('input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: '0',
})

import { styled } from '@/src/styles/stitches'

export const FileInputLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px 12px',

  gap: '0.25rem',
  fontWeight: 'bold',
  cursor: 'default',

  div: {
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '4px',
    lineHeight: 0,

    background: '#ccc',
    transition: 'background 0.2s',

    '&:hover': {
      background: '#c4c4c4',
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

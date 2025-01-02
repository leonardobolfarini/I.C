import { styled } from '@/src/styles/stitches'

export const FileInputLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px 12px',

  div: {
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '2px',

    background: '#ccc',
    transition: 'background 0.2s',

    '&:hover': {
      background: '#c4c4c4',
    },
  },
})

export const FileInputStyle = styled('input', {
  display: 'none',
})

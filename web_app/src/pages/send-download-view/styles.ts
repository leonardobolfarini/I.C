import { styled } from '@/src/styles/stitches'

export const FilesContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
  padding: '1rem',
})

export const FilesToSend = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$cyan300',
  color: '$white',
  fontSize: '1.5rem',
  padding: '2rem',
  borderRadius: 6,

  div: {
    display: 'flex',
    flexDirection: 'row',
    gap: '25px',
    alignItems: 'center',
  },
})

export const FilesToDownload = styled('div', {
  background: '$cyan300',
})

export const FilesView = styled('div', {
  background: '$cyan300',
})

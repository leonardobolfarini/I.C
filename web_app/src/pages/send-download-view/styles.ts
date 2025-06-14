import { styled } from '@/src/styles/stitches'

export const FilesContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
  padding: '1rem',
})

const ContainersBase = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$cyan300',
  color: '$white',
  fontSize: '1.5rem',
  padding: '2rem',
  borderRadius: 6,
})

export const FilesToSend = styled(ContainersBase, {
  gridColumn: 'span 1',
})

export const FilesToSendContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const FilesToDownload = styled(ContainersBase, {
  gridColumn: 'span 1',
  div: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
    alignItems: 'center',
    a: {
      color: '$white',
    },
  },
})

export const MetricsView = styled('div', {
  gridColumn: 'span 2',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
})

export const GraphCard = styled(ContainersBase, {
  h1: {
    textAlign: 'center',
    fontSize: '2rem',
  },
})

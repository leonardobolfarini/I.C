import { styled } from '@/src/styles/stitches'

export const PageContainer = styled('div', {
  gap: '0.5rem',
  padding: '1rem',
})

export const FileToSend = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$cyan300',
  color: '$white',
  fontSize: '1.5rem',
  padding: '2rem',
  borderRadius: 6,
  width: '50%',
})

export const FileToSendContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const GraphContainer = styled('div', {
  marginTop: '1rem',
})

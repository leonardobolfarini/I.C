import { styled } from '@/src/styles/stitches'

export const HomeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  marginTop: '2rem',
})

export const Topics = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1rem',
})

export const InfoCards = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1rem',
})

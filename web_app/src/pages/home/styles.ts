import { styled } from '@/src/styles/stitches'

export const HomeContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
})

export const HomeLeftInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '15rem',

  fontWeight: 'bold',
  color: '#21A485',

  h1: {
    fontSize: '2rem',
  },
  p: {
    margin: '2.75rem 0',
    width: '295px',
    textAlign: 'center',
  },
  img: {
    marginTop: '7.75rem',
  },
})

export const HomeRightInfos = styled('div', {
  height: '100vh',
  background: '$cyan300',
  color: '$white',
})

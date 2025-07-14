import { styled } from '../styles/stitches'

export const LayoutContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '1rem 2rem ',
})

export const LayoutHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '2rem',
})

export const LayoutTitle = styled('h1', {
  fontSize: '2.5rem',

  color: '$slate800',
})
export const LayoutSubtitle = styled('span', {
  fontSize: '1.25rem',
  color: '$slate600',
})

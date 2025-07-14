import { styled } from '@/src/styles/stitches'

export const ChartsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '2',
  gridTemplateRows: '2',
  gridGap: '1rem',
})

export const AuthorsChartBar = styled('div', {
  gridColumn: '1',
  gridRow: '1',
})

export const KeywordsChartBar = styled('div', {
  gridColumn: '2',
  gridRow: '1',
})

export const SourceChartBar = styled('div', {
  gridColumn: '1',
  gridRow: '2',
})

export const YearsChartBar = styled('div', {
  gridColumn: '2',
  gridRow: '2',
})

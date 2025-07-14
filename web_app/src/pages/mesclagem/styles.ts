import { styled } from '@/src/styles/stitches'

export const FilesContainer = styled('div', {
  marginTop: '2rem',
  padding: '1rem',

  border: '1px solid $slate300',
  borderRadius: '8px',

  backgroundColor: '$white',

  '*': {
    backgroundColor: '$white',
  },
})

const ContainersBase = styled('div', {})

export const FilesToSend = styled(ContainersBase, {})

export const FilesToSendHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  marginBottom: '2rem',

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    gap: '0.5rem',

    h1: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
  },

  footer: {
    fontSize: '0.875rem',
    color: '$slate500',
  },
})

export const FilesToSendContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const FilesToSendContent = styled('div', {
  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',

    span: {
      backgroundColor: 'rgba(96, 165, 250, 0.3)',
      padding: '0.25rem 1rem',
      borderRadius: '9999px',

      fontSize: '0.875rem',
      fontWeight: '700',
      color: '$blue800',
    },

    p: {
      fontSize: '1.25rem',
      fontWeight: '800',
    },
  },
})

export const FilesToDownload = styled(ContainersBase, {})

export const MetricsView = styled('div', {})

export const GraphCard = styled(ContainersBase, {})

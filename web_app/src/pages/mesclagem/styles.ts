import { styled } from '@/src/styles/stitches'

export const FilesContainer = styled('div', {
  marginTop: '2rem',
  padding: '1rem',

  border: '1px solid $slate300',
  borderRadius: '8px',

  backgroundColor: '$white',
})

export const FilesToSend = styled('div', {})

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

    '@mobile': {
      svg: {
        display: 'none',
      },
    },

    h1: {
      fontSize: '1.5rem',
      fontWeight: '600',

      '@mobile': {
        fontSize: '1rem',
        fontWeight: '500',
      },
    },
  },

  footer: {
    fontSize: '0.875rem',
    color: '$slate500',

    '@mobile': {
      fontSize: '0.75rem',
    },
  },
})

export const FilesToSendContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2rem',

  '@mobile': {
    flexDirection: 'column',
  },

  '@pc': {
    gap: '8rem',
  },
})

export const FilesToSendContent = styled('div', {
  width: '100%',
  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2rem',

  '@pc': {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  '@mobile': {
    width: '100%',
  },
})

export const GeneratedFilesContainer = styled('div', {
  backgroundColor: '$slate100',

  marginTop: '1rem',
  padding: '1.5rem',
  border: '1px solid $slate300',
  borderRadius: '8px',

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '@mobile': {
    padding: '0.5rem',
    gap: '0.5rem',
  },

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
})

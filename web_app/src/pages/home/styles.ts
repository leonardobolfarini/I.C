import { styled } from '@/src/styles/stitches'

export const HomeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  marginTop: '2rem',
  padding: '2rem 1rem',

  border: '1px solid $slate300',
  borderRadius: '4px',

  background: '$white',
})

export const HomeHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',

  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',

    h1: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },
  span: {
    fontSize: '0.875rem',
    color: '$slate500',
  },
})

export const DescriptionContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  h2: {
    fontWeight: 500,
    color: '$slate700',
  },

  p: {
    lineHeight: 2,
    color: '$slate600',
  },
})

export const AppFunctionsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',

    svg: {
      color: '$green500',
    },

    h2: {
      color: '$slate700',
    },
  },
})

export const AppFunctionsCards = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    border: '2px solid $slate300',
    borderRadius: '8px',

    padding: '1rem',

    p: {
      fontSize: '1rem',
      lineHeight: 1.4,
      color: '$slate600',
    },
  },
})

export const HowToUseContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  h2: {
    fontSize: '1.5rem',
    color: '$slate700',
  },
})

export const HowToUseVariants = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',

  padding: '1.5rem',
  border: '1px solid transparent',
  borderRadius: '8px',

  span: {
    width: '25px',
    height: '25px',
    borderRadius: '999px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '$white',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',

    h3: {
      fontWeight: 500,
    },

    p: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      color: '$slate600',
    },
  },
  variants: {
    phase: {
      first: {
        background: '$blue100',
        borderColor: '$blue400',

        span: {
          background: '$blue500',
        },
      },
      second: {
        background: '$green100',
        borderColor: '$green400',

        span: {
          background: '$green500',
        },
      },
      third: {
        background: '$purple100',
        borderColor: '$purple400',

        span: {
          background: '$purple500',
        },
      },
    },
  },
})

export const UsedTechnologiesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  paddingBottom: '2rem',
  borderBottom: '1px solid $slate300',

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',

    h2: {
      fontSize: '1.5rem',
      color: '$slate700',
    },
    svg: {
      color: '$orange500',
    },
  },
})

export const UsedTechnologies = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  background: '$slate100',
  border: '1px solid $slate300',
  borderRadius: '8px',
  padding: '2rem',

  '>div': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '1rem',

    span: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',

      h3: {
        fontWeight: 500,
        fontSize: '1.125rem',
        color: '$slate800',
      },

      p: {
        fontSize: '0.875rem',
        color: '$slate600',
      },
    },
  },
})

export const OurInfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  h2: {
    color: '$slate700',
  },

  img: {
    borderRadius: '8px',
  },

  '>div': {
    display: 'grid',
    gridTemplateColumns: '500px 1fr',
    gridGap: '1rem',
  },
})

export const OurInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  a: {
    textDecorationLine: 'none',
  },

  h3: {
    fontWeight: 500,
    fontSize: '1.125rem',
  },

  p: {
    fontSize: '0.875rem',
    color: '$slate600',
    lineHeight: 1.4,
  },

  '>div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    padding: '2rem',
    border: '2px solid $slate300',
    borderRadius: '8px',

    div: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1rem',

      span: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.25rem',

        color: '$slate700',
        fontWeight: 600,

        padding: '0.25rem 0.5rem',
        border: '1px solid $slate300',
        borderRadius: '8px',

        fontSize: '0.875rem',
      },
    },
  },
})

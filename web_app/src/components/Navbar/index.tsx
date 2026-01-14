import { Database, Info, TrendUp, Users } from '@phosphor-icons/react/dist/ssr'
import { NavBarContainer, NavBarItem } from './styles'
import { useRouter } from 'next/router'

export function NavBar() {
  const { pathname } = useRouter()

  return (
    <NavBarContainer>
      <NavBarItem href="/" active={pathname === '/'}>
        <Info size={20} />
        Sobre
      </NavBarItem>
      <NavBarItem href="/mesclagem" active={pathname === '/mesclagem'}>
        <Database size={20} />
        Mesclagem
      </NavBarItem>
      <NavBarItem href="/coautoria" active={pathname === '/coautoria'}>
        <Users size={20} />
        Coautoria
      </NavBarItem>
      <NavBarItem href="/analises" active={pathname === '/analises'}>
        <TrendUp size={20} />
        Análises
      </NavBarItem>
    </NavBarContainer>
  )
}

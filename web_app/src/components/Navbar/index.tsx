import {
  ChartBar,
  Database,
  TrendUp,
  Users,
} from '@phosphor-icons/react/dist/ssr'
import { NavBarContainer, NavBarItem } from './styles'
import { useRouter } from 'next/router'

export function NavBar() {
  const { pathname } = useRouter()

  return (
    <NavBarContainer>
      <NavBarItem href="/" active={pathname === '/'}>
        <ChartBar size={16} />
        Dashboard
      </NavBarItem>
      <NavBarItem href="/mesclagem" active={pathname === '/mesclagem'}>
        <Database size={16} />
        Mesclagem
      </NavBarItem>
      <NavBarItem href="/coautoria" active={pathname === '/coautoria'}>
        <Users size={16} />
        Coautoria
      </NavBarItem>
      <NavBarItem href="/analises" active={pathname === '/analises'}>
        <TrendUp size={16} />
        Análises
      </NavBarItem>
    </NavBarContainer>
  )
}

import { NavBar } from '../components/Navbar'
import {
  LayoutContainer,
  LayoutHeader,
  LayoutSubtitle,
  LayoutTitle,
} from './styles'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <LayoutHeader>
        <LayoutTitle>Análise bibliométrica</LayoutTitle>
        <LayoutSubtitle>
          Ferramenta completa para análise e visualização de dados científicos
        </LayoutSubtitle>
      </LayoutHeader>
      <NavBar />
      <main className="flex-1 p-4">{children}</main>
    </LayoutContainer>
  )
}

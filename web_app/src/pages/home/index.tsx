import { HomeContainer, InfoCards, Topics } from './styles'
import { MainLayout } from '../layout'
import { TopicCard } from '@/src/components/TopicCard'
import {
  ChartBar,
  Database,
  File,
  TrendUp,
  Users,
} from '@phosphor-icons/react/dist/ssr'
import { InfoCard } from '@/src/components/InfoCard'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <MainLayout>
      <HomeContainer>
        <Topics>
          <TopicCard
            icon={Database}
            category="Novo"
            title="Mesclagem de Bases"
            details="Combine dados do Scopus e Web of Science"
            description="Faça upload de dois arquivos e gere uma base unificada para análise"
            onClick={() => {
              router.push('/mesclagem')
            }}
          />
          <TopicCard
            icon={Users}
            iconColor="green"
            category="Grafo"
            title="Rede de Coautoria"
            details="Visualize colaborações entre autores"
            description="Gere grafos interativos de relacionamento entre pesquisadores"
            onClick={() => {
              router.push('/coautoria')
            }}
          />
          <TopicCard
            icon={TrendUp}
            iconColor="purple"
            category="Múltiplos"
            title="Análises Estatísticas"
            details="Gráficos de barras e tendências temporais"
            description="Visualize distribuições e evolução temporal dos dados"
            onClick={() => {
              router.push('/analises')
            }}
          />
        </Topics>
        <InfoCards>
          <InfoCard
            title="Formatos Aceitos"
            description="CSV, TXT"
            icon={File}
          />
          <InfoCard
            title="Bases Suportadas"
            description="Scopus & WoS"
            icon={Database}
            iconColor="green"
          />
          <InfoCard
            title="Visualizações"
            description="Grafos & Gráficos"
            icon={Users}
            iconColor="purple"
          />
          <InfoCard
            title="Processamento"
            description="Tempo Real"
            icon={ChartBar}
            iconColor="orange"
          />
        </InfoCards>
      </HomeContainer>
    </MainLayout>
  )
}

import Image from 'next/image'
import ScopusWosImage from '../../assets/scopus_and_wos.jpeg'
import { HomeContainer, HomeLeftInfos, HomeRightInfos } from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '../components/Button'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <HomeContainer>
      <HomeLeftInfos>
        <h1>Merge & Insight</h1>
        <p>Junte e analise bases de dados distintas de forma fácil!</p>
        <Button
          colorButton={'cyan'}
          onClick={() => router.push('/send-download-view')}
        >
          Avançar
          <ArrowRight weight="bold" height={20} width={20} />
        </Button>
        <Image
          src={ScopusWosImage}
          alt="Imagem das bases de dados Scopus e Web of Science"
          width={445}
        />
      </HomeLeftInfos>
      <HomeRightInfos></HomeRightInfos>
    </HomeContainer>
  )
}

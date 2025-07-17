import { z } from 'zod'
import { ChartBarComponent } from './components/ChartBarComponent'
import { useMutation } from '@tanstack/react-query'
import {
  AuthorsCountInterface,
  GetChartBarFormat,
  KeywordsCountInterface,
  SourcesCountInterface,
  YearsCountInterface,
} from '@/src/api/get-chart-bar-format'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileInput } from '@/src/components/FileInput'
import { Button } from '@/src/components/Button'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useState } from 'react'
import {
  ChartLineViewDisplayContainer,
  ChartsBarViewDisplayContainer,
  ChartsContainer,
  ChartsDisplayContainer,
  ChartsForm,
  ChartViewContainer,
  ChartWithoutData,
  Header,
} from './styles'
import { ChartBar, ChartLine } from '@phosphor-icons/react/dist/ssr'
import { MainLayout } from '../layout'
import { ChartLineComponent } from './components/ChartLineComponent'
import { colors } from '@/src/styles/colors'

const getChartBarFormatFile = z.object({
  chartBarFile: z
    .any()
    .refine(
      (files) =>
        (files instanceof FileList &&
          files.length > 0 &&
          files[0].name.endsWith('.csv')) ||
        files[0].name.endsWith('.txt'),
      {
        message: 'Selecione um arquivo .csv para Scopus.',
      },
    )
    .transform((files) => files[0]),
})

type GetChartBarFormatFile = z.infer<typeof getChartBarFormatFile>

export default function Charts() {
  const [authorsCount, setAuthorsCount] =
    useState<AuthorsCountInterface | null>(null)
  const [keywordsCount, setKeywordsCount] =
    useState<KeywordsCountInterface | null>(null)
  const [sourcesCount, setSourcesCount] =
    useState<SourcesCountInterface | null>(null)
  const [yearsCount, setYearsCount] = useState<YearsCountInterface | null>(null)

  const { mutateAsync: getChartBarFormatFn } = useMutation({
    mutationFn: GetChartBarFormat,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isProcessing },
  } = useForm<GetChartBarFormatFile>({
    resolver: zodResolver(getChartBarFormatFile),
  })

  async function handleGetChartBarFormat({
    chartBarFile,
  }: GetChartBarFormatFile) {
    const { authors, keywords, sources, years } = await getChartBarFormatFn({
      chartBarFile,
    })

    setAuthorsCount(authors)
    setKeywordsCount(keywords)
    setSourcesCount(sources)
    setYearsCount(years)
  }

  return (
    <MainLayout>
      <ChartsContainer>
        <ChartsForm as="form" onSubmit={handleSubmit(handleGetChartBarFormat)}>
          <Header>
            <header>
              <ChartBar size={32} />
              <h1>Análises Estatísticas Completas</h1>
            </header>
            <footer>
              Faça upload de um arquivo para gerar gráficos de barras e análise
              temporal
            </footer>
          </Header>
          <FileInput
            idhtml="chartBarFile"
            accept=".csv, .txt"
            {...register('chartBarFile')}
          />
          <span>
            {errors.chartBarFile ? String(errors.chartBarFile.message) : ''}
          </span>
          <Button
            colorButton="black"
            style={{ marginTop: '1rem', marginLeft: 'auto' }}
            disabled={isProcessing}
            type="submit"
          >
            Analisar
            <PaperPlaneRight weight="bold" height={20} width={20} />
          </Button>
        </ChartsForm>
        <ChartsDisplayContainer>
          <Header>
            <header>
              <ChartBar size={32} />
              <h1>Gráficos de Distribuição</h1>
            </header>
            <footer>Análise quantitativa por categorias</footer>
          </Header>
          {keywordsCount || authorsCount || sourcesCount ? (
            <ChartsBarViewDisplayContainer>
              <ChartViewContainer>
                <ChartBarComponent
                  dataListName="10 palavras-chaves mais citadas"
                  chartBarData={
                    keywordsCount?.keywords
                      ?.sort((a, b) => b.count - a.count)
                      .slice(0, 10)
                      .map((keyword) => ({
                        name: keyword.keyword,
                        count: keyword.count,
                      })) || []
                  }
                />
              </ChartViewContainer>
              <ChartViewContainer>
                <ChartBarComponent
                  dataListName="10 autores mais citados"
                  chartBarData={
                    authorsCount?.authors
                      ?.sort((a, b) => b.count - a.count)
                      .slice(0, 10)
                      .map((author) => ({
                        name: author.author,
                        count: author.count,
                      })) || []
                  }
                />
              </ChartViewContainer>
              <ChartViewContainer>
                <ChartBarComponent
                  dataListName="10 fontes mais citadas"
                  chartBarData={
                    sourcesCount?.sources
                      ?.sort((a, b) => b.count - a.count)
                      .slice(0, 10)
                      .map((source) => ({
                        name: source.source,
                        count: source.count,
                      })) || []
                  }
                />
              </ChartViewContainer>
            </ChartsBarViewDisplayContainer>
          ) : (
            <ChartViewContainer>
              <ChartWithoutData>
                <ChartBar size={50} color={colors.slate400} />
                <span>Gráficos de barra aparecerão aqui</span>
              </ChartWithoutData>
            </ChartViewContainer>
          )}
        </ChartsDisplayContainer>
        <ChartsDisplayContainer>
          <Header>
            <header>
              <ChartLine size={32} />
              <h1>Evolução Temporal</h1>
            </header>
            <footer>Tendências e padrões ao longo do tempo</footer>
          </Header>
          {yearsCount ? (
            <ChartLineViewDisplayContainer>
              <ChartViewContainer>
                <ChartLineComponent
                  dataListName="Últimos 10 anos"
                  chartBarData={
                    yearsCount?.years
                      ?.sort((a, b) => b.count - a.count)
                      .slice(0, 10)
                      .map((source) => ({
                        name: source.year,
                        count: source.count,
                      })) || []
                  }
                />
              </ChartViewContainer>
            </ChartLineViewDisplayContainer>
          ) : (
            <ChartViewContainer>
              <ChartWithoutData>
                <ChartLine size={50} color={colors.slate400} />
                <h2>Gráfico de Linha Temporal</h2>
                <span>Dados de evolução temporal serão exibidos aqui</span>
              </ChartWithoutData>
            </ChartViewContainer>
          )}
        </ChartsDisplayContainer>
      </ChartsContainer>
    </MainLayout>
  )
}

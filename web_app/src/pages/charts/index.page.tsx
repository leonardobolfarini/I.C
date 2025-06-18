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
  AuthorsChartBar,
  ChartsContainer,
  KeywordsChartBar,
  SourceChartBar,
  YearsChartBar,
} from './styles'
import { ChartLineComponent } from './components/chartLineComponent'

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

  console.log(yearsCount)

  return (
    <div className="max-h-[1000px] max-w-[1000px]">
      <form onSubmit={handleSubmit(handleGetChartBarFormat)}>
        <FileInput
          accept=".csv, .txt"
          idhtml="chartBarFile"
          {...register('chartBarFile')}
        />
        <span>
          {errors.chartBarFile ? String(errors.chartBarFile.message) : ''}
        </span>
        <Button disabled={isProcessing} type="submit">
          Enviar
          <PaperPlaneRight weight="bold" height={20} width={20} />
        </Button>
      </form>
      <ChartsContainer>
        {keywordsCount ? (
          <KeywordsChartBar>
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
          </KeywordsChartBar>
        ) : (
          <h1>ChartBar</h1>
        )}
        {authorsCount ? (
          <AuthorsChartBar>
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
          </AuthorsChartBar>
        ) : (
          <h1>ChartBar</h1>
        )}
        {sourcesCount ? (
          <SourceChartBar>
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
          </SourceChartBar>
        ) : (
          <h1>ChartBar</h1>
        )}
        {yearsCount ? (
          <YearsChartBar>
            <ChartLineComponent
              dataListName="10 anos com mais publicações"
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
          </YearsChartBar>
        ) : (
          <h1>ChartBar</h1>
        )}
      </ChartsContainer>
    </div>
  )
}

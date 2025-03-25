import { z } from 'zod'
import { ChartBarComponent } from './components/ChartBarComponent'
import { useMutation } from '@tanstack/react-query'
import {
  AuthorsCountInterface,
  GetChartBarFormat,
  KeywordsCountInterface,
  SourcesCountInterface,
} from '@/src/api/get-chart-bar-format'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileInput } from '@/src/components/FileInput'
import { Button } from '@/src/components/Button'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useState } from 'react'

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
    const { authors, keywords, sources } = await getChartBarFormatFn({
      chartBarFile,
    })

    setAuthorsCount(authors)
    setKeywordsCount(keywords)
    setSourcesCount(sources)
  }

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
      {keywordsCount ? (
        <ChartBarComponent
          dataListName="Keywords"
          chartBarData={
            keywordsCount?.keywords?.map((keyword) => ({
              name: keyword.keyword,
              count: keyword.count,
            })) || []
          }
        />
      ) : (
        <h1>ChartBar</h1>
      )}
    </div>
  )
}

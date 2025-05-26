import {
  FilesContainer,
  FilesToDownload,
  FilesToSend,
  FilesToSendContainer,
  GraphCard,
  MetricsView,
} from './styles'
import { Button } from '../../components/Button'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendFiles } from '@/src/api/send-files'
import { useState } from 'react'
import { z } from 'zod'
import JSZip from 'jszip'
import { FileInput } from '@/src/components/FileInput'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

const formFilesSchema = z.object({
  scopusFile: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length > 0 &&
        files[0].name.endsWith('.csv'),
      {
        message: 'Selecione um arquivo .csv para Scopus.',
      },
    )
    .transform((files) => files[0]),

  wosFile: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length > 0 &&
        files[0].name.endsWith('.txt'),
      {
        message: 'Selecione um arquivo .txt para WoS.',
      },
    )
    .transform((files) => files[0]),
})

export type FormFilesProps = z.infer<typeof formFilesSchema>

interface DownloadUrlsTypes {
  csvUrl: string | null
  txtUrl: string | null
}

export default function SendDownloadView() {
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrlsTypes>({
    csvUrl: null,
    txtUrl: null,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isProcessing },
  } = useForm<FormFilesProps>({
    resolver: zodResolver(formFilesSchema),
  })

  const { mutateAsync: sendFilesFn } = useMutation({
    mutationFn: SendFiles,
  })

  async function handleSendFiles(files: FormFilesProps) {
    try {
      const response = await sendFilesFn({
        scopusFile: files.scopusFile,
        wosFile: files.wosFile,
      })

      const blob = new Blob([response], { type: 'application/zip' })
      const zip = await JSZip.loadAsync(blob)
      const extractedFiles: DownloadUrlsTypes = {
        csvUrl: null,
        txtUrl: null,
      }

      for (const fileName of Object.keys(zip.files)) {
        const file = zip.files[fileName]
        if (!file.dir) {
          const fileBlob = await file.async('blob')
          const url = URL.createObjectURL(fileBlob)
          if (fileName.endsWith('.csv')) {
            extractedFiles.csvUrl = url
          } else if (fileName.endsWith('.txt')) {
            extractedFiles.txtUrl = url
          }
        }
      }

      setDownloadUrls(extractedFiles)
    } catch {
      alert('Ocorreu um erro.')
    }
  }

  return (
    <FilesContainer>
      <FilesToSend as="form" onSubmit={handleSubmit(handleSendFiles)}>
        <FilesToSendContainer>
          <p>Scopus(.csv): </p>
          <FileInput
            accept=".csv"
            idhtml="scopusFile"
            {...register('scopusFile')}
          />
          <span>
            {errors.scopusFile ? String(errors.scopusFile.message) : ''}
          </span>
        </FilesToSendContainer>

        <FilesToSendContainer>
          <p>WoS(.txt): </p>
          <FileInput accept=".txt" idhtml="wosFile" {...register('wosFile')} />
          <span>{errors.wosFile ? String(errors.wosFile.message) : ''}</span>
        </FilesToSendContainer>

        <Button
          colorButton={'white'}
          type="submit"
          style={{ marginLeft: 'auto', marginTop: '0.5rem' }}
          disabled={isProcessing}
        >
          Enviar
          <PaperPlaneRight weight="bold" height={20} width={20} />
        </Button>
      </FilesToSend>
      <FilesToDownload>
        <div>
          <p>Scopus(.csv): </p>
          {downloadUrls.csvUrl ? (
            <a href={downloadUrls.csvUrl} download="all_in_one.csv">
              Baixar arquivo
            </a>
          ) : (
            <a aria-disabled>Arquivo indisponível.</a>
          )}
        </div>
        <div>
          <p>WoS(.txt): </p>
          {downloadUrls.txtUrl ? (
            <a href={downloadUrls.txtUrl} download="all_in_one.txt">
              Baixar arquivo
            </a>
          ) : (
            <a aria-disabled>Arquivo indisponível.</a>
          )}
        </div>
      </FilesToDownload>
      <MetricsView>
        <Link href="/graph" style={{ textDecoration: 'none' }}>
          <GraphCard>
            <h1>Visualização de Grafo</h1>
            <Image
              src="/GraphImage.png"
              width={500}
              height={300}
              style={{ borderRadius: '8px' }}
              alt=""
            />
          </GraphCard>
        </Link>

        <Link href="/charts" style={{ textDecoration: 'none' }}>
          <GraphCard>
            <h1>Visualização de gráfico de barras</h1>
            <Image
              src="/ChartImage.png"
              width={500}
              height={300}
              style={{ borderRadius: '8px' }}
              alt=""
            />
          </GraphCard>
        </Link>
      </MetricsView>
    </FilesContainer>
  )
}

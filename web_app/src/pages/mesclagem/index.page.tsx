import {
  FilesContainer,
  FilesToSend,
  FilesToSendContainer,
  FilesToSendContent,
  FilesToSendHeader,
  GeneratedFilesContainer,
} from './styles'
import { Button } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendFiles } from '@/src/api/send-files'
import { useState } from 'react'
import { z } from 'zod'
import JSZip from 'jszip'
import { FileInput } from '@/src/components/FileInput'
import { useMutation } from '@tanstack/react-query'
import { MainLayout } from '../layout'
import { Database } from '@phosphor-icons/react/dist/ssr'
import { GeneratedFile } from './components/GeneratedFile'

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
  csvFile: {
    csvUrl: string | null
    csvFileName: string | null
  }
  txtFile: {
    txtUrl: string | null
    txtFileName: string | null
  }
}

export default function SendDownloadView() {
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrlsTypes | null>(
    null,
  )

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
        csvFile: {
          csvFileName: null,
          csvUrl: null,
        },
        txtFile: {
          txtFileName: null,
          txtUrl: null,
        },
      }

      for (const fileName of Object.keys(zip.files)) {
        const file = zip.files[fileName]
        if (!file.dir) {
          const fileBlob = await file.async('blob')
          const url = URL.createObjectURL(fileBlob)
          if (fileName.endsWith('.csv')) {
            extractedFiles.csvFile.csvUrl = url
            extractedFiles.csvFile.csvFileName = fileName
          } else if (fileName.endsWith('.txt')) {
            extractedFiles.txtFile.txtUrl = url
            extractedFiles.txtFile.txtFileName = fileName
          }
        }
      }

      setDownloadUrls(extractedFiles)
    } catch {
      alert('Ocorreu um erro.')
    }
  }

  return (
    <MainLayout>
      <FilesContainer>
        <FilesToSend as="form" onSubmit={handleSubmit(handleSendFiles)}>
          <FilesToSendHeader>
            <header>
              <Database size={24} />
              <h1>Mesclagem de Bases de Dados</h1>
            </header>
            <footer>
              Faça upload dos arquivos do Scopus e Web of Science para gerar uma
              base unificada
            </footer>
          </FilesToSendHeader>
          <FilesToSendContainer>
            <FilesToSendContent>
              <div>
                <span>1</span>
                <p>Arquivo Scopus</p>
              </div>
              <FileInput
                idhtml="scopusFile"
                database="Scopus"
                accept=".csv"
                {...register('scopusFile')}
              />
              <span>
                {errors.scopusFile ? String(errors.scopusFile.message) : ''}
              </span>
            </FilesToSendContent>

            <FilesToSendContent>
              <div>
                <span>2</span>
                <p>Arquivo Web of Science</p>
              </div>
              <FileInput
                idhtml="wosFile"
                database="Web of Science"
                accept=".txt"
                {...register('wosFile')}
              />
              <span>
                {errors.wosFile ? String(errors.wosFile.message) : ''}
              </span>
            </FilesToSendContent>
          </FilesToSendContainer>
          <Button
            colorButton="black"
            type="submit"
            style={{ marginLeft: '40%', marginTop: '1.5rem' }}
            disabled={isProcessing}
          >
            <Database weight="bold" height={20} width={20} />
            Mesclar Bases de Dados
          </Button>
        </FilesToSend>
        {downloadUrls !== null && (
          <GeneratedFilesContainer>
            <h3>Arquivos Gerados</h3>
            <div>
              <GeneratedFile
                fileType="csv"
                downloadUrl={downloadUrls.csvFile.csvUrl!}
                fileName={downloadUrls.csvFile.csvFileName!}
              />
              <GeneratedFile
                fileType="txt"
                downloadUrl={downloadUrls.txtFile.txtUrl!}
                fileName={downloadUrls.txtFile.txtFileName!}
              />
            </div>
          </GeneratedFilesContainer>
        )}
      </FilesContainer>
    </MainLayout>
  )
}

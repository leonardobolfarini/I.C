import { GetGraphFormat } from '@/src/api/get-graph-format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FileToSend,
  FileToSendContainer,
  GraphContainer,
  PageContainer,
} from './styles'
import { FileInput } from '@/src/components/FileInput'
import { Button } from '@/src/components/Button'
import { PaperPlaneRight } from '@phosphor-icons/react/dist/ssr'
import { SigmaRender } from './components/SigmaRender'
import { MainLayout } from '../layout'

export interface GraphElementFormat {
  data: {
    id?: string
    label?: string
    source?: string
    target?: string
  }
}

export interface GraphNodesFormat {
  data: {
    id: string
    label: string
  }
}

export interface GraphEdgesFormat {
  data: {
    source: string
    target: string
  }
}

const getGraphFormatFile = z.object({
  graphFile: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length > 0 &&
        files[0].name.endsWith('.csv' || 'txt'),
      {
        message: 'Selecione um arquivo .csv para Scopus.',
      },
    )
    .transform((files) => files[0]),
})

type GetGraphFormatFile = z.infer<typeof getGraphFormatFile>

export default function Graph() {
  const [graphData, setGraphData] = useState<GraphElementFormat[] | null>(null)
  const [nodes, setNodes] = useState<GraphNodesFormat[] | null>(null)
  const [edges, setEdges] = useState<GraphEdgesFormat[] | null>(null)

  const { mutateAsync: GetGraphFormatFn } = useMutation({
    mutationFn: GetGraphFormat,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isProcessing },
  } = useForm<GetGraphFormatFile>({
    resolver: zodResolver(getGraphFormatFile),
  })

  async function handleSendGraphFileToFormat({
    graphFile,
  }: GetGraphFormatFile) {
    const response = await GetGraphFormatFn({
      graphFile,
    })

    setNodes(response.nodes)
    setEdges(response.edges)
    setGraphData([...response.nodes, ...response.edges])
  }

  return (
    <MainLayout>
      <PageContainer>
        {!graphData || !edges || !nodes ? (
          <FileToSend
            as="form"
            onSubmit={handleSubmit(handleSendGraphFileToFormat)}
          >
            <FileToSendContainer>
              <p>Arquivo: </p>
              <FileInput
                accept=".csv, .txt"
                idhtml="graphFile')}
          />"
                {...register('graphFile')}
              />
              <span>
                {errors.graphFile ? String(errors.graphFile.message) : ''}
              </span>
            </FileToSendContainer>

            <Button
              colorButton={'white'}
              type="submit"
              style={{ marginLeft: 'auto', marginTop: '0.5rem' }}
              disabled={isProcessing}
            >
              Enviar
              <PaperPlaneRight weight="bold" height={20} width={20} />
            </Button>
          </FileToSend>
        ) : (
          <GraphContainer>
            <SigmaRender graphEdges={edges} graphNodes={nodes} />
          </GraphContainer>
        )}
      </PageContainer>
    </MainLayout>
  )
}

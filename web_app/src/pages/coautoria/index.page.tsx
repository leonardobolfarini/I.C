'use client'

import { GetGraphFormat } from '@/src/api/get-graph-format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  GraphDisplay,
  GraphDisplayContainer,
  GraphDisplayHeader,
  GraphDisplayWithoutData,
  GraphViewContainer,
  GraphViewFileContainer,
  GraphViewForm,
  GraphViewHeader,
} from './styles'
import { FileInput } from '@/src/components/FileInput'
import { Button } from '@/src/components/Button'
import { PaperPlaneRight, Users } from '@phosphor-icons/react/dist/ssr'
import { SigmaRender } from './components/SigmaRender'
import { MainLayout } from '../layout'
import { colors } from '@/src/styles/colors'
import Head from 'next/head'

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
        (files[0].name.endsWith('.csv') || files[0].name.endsWith('.txt')),
      {
        message: 'Selecione um arquivo',
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
    watch,
    formState: { errors, isSubmitting: isProcessing },
  } = useForm<GetGraphFormatFile>({
    resolver: zodResolver(getGraphFormatFile),
  })

  const graphFileValue = watch('graphFile')

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
      <Head>
        <title>Coautoria</title>
        <meta
          name="description"
          content="Page where you can analyze co-authorship networks."
        />
      </Head>
      <GraphViewContainer>
        <GraphViewForm
          as="form"
          onSubmit={handleSubmit(handleSendGraphFileToFormat)}
        >
          <GraphViewHeader>
            <header>
              <Users size={24} />
              <h1>Análise de Rede de Coautoria</h1>
            </header>
            <footer>
              Visualize as colaborações entre autores através de grafos
              interativos.
            </footer>
          </GraphViewHeader>
          <GraphViewFileContainer>
            <FileInput
              idhtml="graphFile"
              database=""
              accept=".csv, .txt"
              value={graphFileValue}
              {...register('graphFile')}
            />
            <span>
              {errors.graphFile ? String(errors.graphFile.message) : ''}
            </span>
          </GraphViewFileContainer>

          <Button
            colorButton="black"
            style={{ marginTop: '1rem', marginLeft: 'auto' }}
            type="submit"
            disabled={isProcessing}
          >
            Analisar
            <PaperPlaneRight weight="bold" height={20} width={20} />
          </Button>
        </GraphViewForm>
        <GraphDisplayContainer>
          <GraphDisplayHeader>
            <h3>Grafo de Coautoria</h3>
            <span>Rede de colaborações entre pesquisadores</span>
          </GraphDisplayHeader>
          <GraphDisplay>
            {!graphData || !edges || !nodes ? (
              <GraphDisplayWithoutData>
                <Users size={50} color={colors.slate400} />
                <h2>Grafo será exibido aqui</h2>
                <span>Faça upload de um arquivo para gerar a visualização</span>
              </GraphDisplayWithoutData>
            ) : (
              <SigmaRender graphEdges={edges} graphNodes={nodes} />
            )}
          </GraphDisplay>
        </GraphDisplayContainer>
      </GraphViewContainer>
    </MainLayout>
  )
}

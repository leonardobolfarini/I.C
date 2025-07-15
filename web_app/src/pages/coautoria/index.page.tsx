import { GetGraphFormat } from '@/src/api/get-graph-format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  GraphContainer,
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
        files[0].name.endsWith('.csv' || '.txt'),
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
      <GraphViewContainer>
        {!graphData || !edges || !nodes ? (
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
                database="scopus ou web of science"
                accept=".csv, .txt"
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
        ) : (
          <GraphContainer>
            <SigmaRender graphEdges={edges} graphNodes={nodes} />
          </GraphContainer>
        )}
      </GraphViewContainer>
    </MainLayout>
  )
}

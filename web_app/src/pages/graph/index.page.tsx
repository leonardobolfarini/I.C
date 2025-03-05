import { GetGraphFormat } from '@/src/api/get-graph-format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
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

interface GraphElementFormat {
  data: {
    id?: string
    label?: string
    source?: string
    target?: string
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

    setGraphData([...response.nodes, ...response.edges])
  }
  return (
    <PageContainer>
      {!graphData ? (
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
          <CytoscapeComponent
            elements={graphData}
            style={{ width: '100%', height: '100vh' }}
            layout={{
              name: 'grid',
              fit: true,
              padding: 10,
              avoidOverlap: true,
              nodeDimensionsIncludeLabels: true,
            }}
            hideEdgesOnViewport={true}
            textureOnViewport={true}
            pixelRatio={1}
            styleEnabled={true}
            stylesheet={[
              {
                selector: 'node',
                style: {
                  backgroundColor: '#4d87f5',
                  width: 30,
                  height: 30,
                  label: 'data(label)',
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'text-outline-color': '#555',
                  'text-outline-width': '1px',
                  'overlay-padding': '3px',
                  'z-index': '10',
                },
              },
              {
                selector: 'edge',
                style: {
                  width: 2,
                  'line-color': '#AAD8FF',
                  'target-arrow-shape': 'none',
                  'curve-style': 'haystack',
                  opacity: 1,
                },
              },
            ]}
          />
        </GraphContainer>
      )}
    </PageContainer>
  )
}

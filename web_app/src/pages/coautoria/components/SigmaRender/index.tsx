import Graph from 'graphology'
import { GraphEdgesFormat, GraphNodesFormat } from '../../index.page'
import { useEffect, useRef } from 'react'
import { Sigma } from 'sigma'
import FA2Layout from 'graphology-layout-forceatlas2/worker'

interface SigmaRenderProps {
  graphNodes: GraphNodesFormat[]
  graphEdges: GraphEdgesFormat[]
}

export function SigmaRender({ graphEdges, graphNodes }: SigmaRenderProps) {
  const containerRef = useRef(null)
  const sigmaInstanceRef = useRef<Sigma | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initSigma = async () => {
      const { Sigma } = await import('sigma')
      const graph = new Graph()

      graphNodes.forEach((node) => {
        graph.addNode(node.data.id, {
          label: node.data.label,
          x: Math.random() * 10000,
          y: Math.random() * 10000,
          size: 5,
          color: '#999',
        })
      })

      graphEdges.forEach((edge) => {
        graph.addEdge(edge.data.source, edge.data.target, { color: '#ccc' })
      })

      const fa2Layout: FA2Layout = new FA2Layout(graph, {
        settings: {
          gravity: 100,
          scalingRatio: 10,
        },
      })
      fa2Layout.start()
      setTimeout(() => fa2Layout.stop(), 1000)

      if (containerRef.current && !sigmaInstanceRef.current) {
        const sigma = new Sigma(graph, containerRef.current)
        let hoveredNode: string | null = null

        sigma.on('enterNode', ({ node }) => {
          const neighbors = graph.neighbors(node)
          hoveredNode = node
          graph.forEachNode((node) => {
            const color =
              neighbors.includes(node) || node.match(hoveredNode!)
                ? '#E41A1C'
                : '#999'
            const size =
              neighbors.includes(node) || node.match(hoveredNode!) ? 8 : 5
            graph.setNodeAttribute(node, 'color', color)
            graph.setNodeAttribute(node, 'size', size)
          })

          graph.forEachEdge((edge) => {
            hoveredNode = null
            const color = graph.hasExtremity(edge, node) ? '#E41A1C' : '#ccc'
            graph.setEdgeAttribute(edge, 'color', color)
          })
        })

        sigma.on('leaveNode', () => {
          graph.forEachNode((node) => {
            graph.setNodeAttribute(node, 'color', '#999')
            graph.setNodeAttribute(node, 'size', 5)
          })
          graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, 'color', '#ccc')
          })
        })

        sigmaInstanceRef.current = sigma
      }
    }

    initSigma()

    return () => {
      if (sigmaInstanceRef.current) {
        sigmaInstanceRef.current.kill()
        sigmaInstanceRef.current = null
      }
    }
  }, [graphNodes, graphEdges])

  return (
    <div
      id="sigmaContainer"
      ref={containerRef}
      style={{ width: '100%', height: '400px' }}
    />
  )
}

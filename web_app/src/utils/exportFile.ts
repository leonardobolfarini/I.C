import {
  GraphEdgesFormat,
  GraphNodesFormat,
} from '../pages/coautoria/index.page'

export const exportToCSV = (data: any[], fileName: string, keyName: string) => {
  if (!data || data.length === 0) return

  const csvRows = [
    'sep=;',
    `${keyName};Quantidade`,
    ...data.map((item) => `"${String(item[keyName])}";${item.count}`),
  ]

  const csvContent = csvRows.join('\n')

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${fileName}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportToPajek = (
  graphData: { nodes: GraphNodesFormat[]; edges: GraphEdgesFormat[] },
  fileName: string,
) => {
  if (!graphData) return
  console.log(graphData.nodes)

  const nodeMap = new Map()
  let verticesText = `*Vertices ${graphData.nodes.length}\n`

  graphData.nodes.forEach((node, index) => {
    const id = index + 1
    const label = node.data.label
    nodeMap.set(label, id)
    verticesText += `${id} "${label}"\n`
  })

  let edgesText = `*Edges\n`
  graphData.edges.forEach((edge) => {
    const sourceId = nodeMap.get(edge.data.source)
    const targetId = nodeMap.get(edge.data.target)

    if (sourceId && targetId) {
      edgesText += `${sourceId} ${targetId} 1\n`
    }
  })

  const fullText = verticesText + edgesText

  const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${fileName}.net`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

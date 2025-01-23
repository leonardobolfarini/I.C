import React, { useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export default function Graph() {
  const [width, setWith] = useState('100%')
  const [height, setHeight] = useState('400px')
  const [graphData, setGraphData] = useState([
    // Node format
    { data: { id: '1', label: 'Node 1' } },
    { data: { id: '2', label: 'Node 2' } },
    { data: { id: '3', label: 'Node 3' } },
    { data: { id: '4', label: 'Node 4' } },
    { data: { id: '5', label: 'Node 5' } },
    { data: { id: '6', label: 'Node 6' } },
    { data: { id: '7', label: 'Node 7' } },
    { data: { id: '8', label: 'Node 8' } }, // Edge format
    { data: { source: '1', target: '2' } },
    { data: { source: '1', target: '3' } },
    { data: { source: '4', target: '5' } },
    { data: { source: '6', target: '8' } },
  ])
  return (
    <>
      <div>
        <h1>My Cytoscape example</h1>
        <div
          style={{
            border: '1px solid',
            backgroundColor: '#f5f6fe',
          }}
        >
          <CytoscapeComponent
            elements={graphData}
            style={{ width, height }}
            layout={{
              name: 'breadthfirst',
              fit: true,
              directed: true,
              padding: 50,
              animate: true,
              animationDuration: 1000,
              avoidOverlap: true,
              nodeDimensionsIncludeLabels: false,
            }}
          />
        </div>
      </div>
    </>
  )
}

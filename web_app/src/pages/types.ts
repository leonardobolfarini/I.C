export interface GraphNodesFormat {
  data: {
    id: string;
    label: string;
  };
}

export interface GraphEdgesFormat {
  data: {
    source: string;
    target: string;
    weight: number;
  };
}

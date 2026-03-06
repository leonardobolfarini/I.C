import { api } from "../lib/axios";

interface GetGraphFormatProps {
  graphFile: File;
  graphType: "coauthorship" | "keywords";
}

export async function GetGraphFormat({
  graphFile,
  graphType,
}: GetGraphFormatProps) {
  const formData = new FormData();
  formData.append("graphFile", graphFile);
  formData.append("graphType", graphType);

  const response = await api.post("/graph", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "json",
    validateStatus: (status) => {
      return status < 500;
    },
  });

  if (response.status == 404) {
    const graphTypeFormmated =
      graphType == "coauthorship" ? "coautoria" : "palavras-chave";
    alert(`Coluna de ${graphTypeFormmated} não encontrada no arquivo enviado.`);
  }

  return response.data;
}

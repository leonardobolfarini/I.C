"use client";

import { GetGraphFormat } from "@/src/api/get-graph-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  GraphDisplay,
  GraphDisplayContainer,
  GraphDisplayHeader,
  GraphDisplayWithoutData,
  GraphSelectionContainer,
  GraphViewContainer,
  GraphViewFileContainer,
  GraphViewForm,
  GraphViewHeader,
  RenderContainer,
} from "./styles";
import { Button } from "@/src/components/Button";
import {
  ArrowsOut,
  Download,
  Hash,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { SigmaRender } from "./components/SigmaRender";
import { MainLayout } from "../layout";
import { colors } from "@/src/styles/colors";
import Head from "next/head";
import { exportToPajek } from "@/src/utils/exportFile";
import { LoadingIcon } from "@/src/styles/global";
import { FileInputInRow } from "@/src/components/FileInputInRow";
import { GraphEdgesFormat, GraphNodesFormat } from "../types";
import { SelectionType } from "./components/SelectionType";

const getGraphFormatFile = z.object({
  graphType: z.enum(["coauthorship", "keywords"], {
    required_error: "Selecione o tipo de grafo",
  }),
  graphFile: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length > 0 &&
        (files[0].name.endsWith(".csv") || files[0].name.endsWith(".txt")),
      {
        message: "Selecione um arquivo",
      },
    )
    .transform((files) => files[0]),
});

type GetGraphFormatFile = z.infer<typeof getGraphFormatFile>;

export default function Graph() {
  const [nodes, setNodes] = useState<GraphNodesFormat[] | null>(null);
  const [edges, setEdges] = useState<GraphEdgesFormat[] | null>(null);
  const [isFullSize, setIsFullSize] = useState<boolean>(false);

  const { mutateAsync: GetGraphFormatFn } = useMutation({
    mutationFn: GetGraphFormat,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting: isProcessing, isValid },
  } = useForm<GetGraphFormatFile>({
    resolver: zodResolver(getGraphFormatFile),
    defaultValues: {
      graphType: "coauthorship",
    },
  });

  const graphFileValue = watch("graphFile");
  const graphType = watch("graphType");

  useEffect(() => {
    if (nodes && edges) {
      const graphContainer = document.getElementById("graphContainer");
      graphContainer?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [nodes, edges]);

  async function handleSendGraphFileToFormat({
    graphFile,
    graphType,
  }: GetGraphFormatFile) {
    const response = await GetGraphFormatFn({
      graphFile,
      graphType,
    });

    setNodes(response.nodes);
    setEdges(response.edges);
  }

  return (
    <MainLayout>
      <Head>
        <title>NBVIZ | Redes</title>
        <meta
          name="description"
          content="Page where you can analyze co-authorship and keywords networks."
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
              <h1>Análise de Redes</h1>
            </header>
            <footer>
              Visualize grafos de coautoria ou palavras-chave a partir dos seus
              dados
            </footer>
          </GraphViewHeader>
          <GraphViewFileContainer>
            <GraphSelectionContainer>
              <SelectionType
                isActive={graphType === "coauthorship"}
                icon={Users}
                onClick={() => setValue("graphType", "coauthorship")}
              >
                Coautoria
              </SelectionType>
              <SelectionType
                isActive={graphType === "keywords"}
                icon={Hash}
                onClick={() => setValue("graphType", "keywords")}
              >
                Palavras-chave
              </SelectionType>
            </GraphSelectionContainer>
            <span>{errors.graphType?.message}</span>
            <FileInputInRow
              idhtml="graphFile"
              database=""
              accept=".csv, .txt"
              value={graphFileValue}
              {...register("graphFile")}
            />
            <span>
              {errors.graphFile ? String(errors.graphFile.message) : ""}
            </span>
          </GraphViewFileContainer>

          <Button
            colorButton="black"
            style={{
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
              width: "25%",
            }}
            type="submit"
            disabled={isProcessing || !isValid}
          >
            {isProcessing ? (
              <LoadingIcon />
            ) : (
              <>
                {graphType == "coauthorship" ? (
                  <>
                    <Users weight="bold" height={20} width={20} />
                    <p>Gerar Grafo de Coautoria</p>
                  </>
                ) : (
                  <>
                    <Hash weight="bold" height={20} width={20} />
                    <p>Gerar Grafo de Palvras-chave</p>
                  </>
                )}
              </>
            )}
          </Button>
        </GraphViewForm>
        <GraphDisplayContainer>
          <GraphDisplayHeader>
            <header>
              {graphType == "coauthorship" ? (
                <>
                  <h3>Grafo de Coautoria</h3>
                  <span>Rede de colaborações entre pesquisadores</span>
                </>
              ) : (
                <>
                  <h3>Grafo de Palvras-chave</h3>
                  <span>Rede de co-ocorrencia de palvras-chave</span>
                </>
              )}
            </header>
            {edges && nodes && (
              <span>
                <Button
                  onClick={() =>
                    exportToPajek({ edges, nodes }, "rede_colaboracao")
                  }
                >
                  <Download size={20} />
                  Exportar Grafo (.net)
                </Button>
              </span>
            )}
          </GraphDisplayHeader>
          <GraphDisplay>
            {!edges || !nodes ? (
              <GraphDisplayWithoutData>
                {graphType == "coauthorship" ? (
                  <Users size={50} color={colors.slate400} />
                ) : (
                  <Hash size={50} color={colors.slate400} />
                )}
                <h2>Grafo será exibido aqui</h2>
                <span>Faça upload de um arquivo para gerar a visualização</span>
              </GraphDisplayWithoutData>
            ) : (
              <RenderContainer id="graphContainer">
                <span
                  onClick={() => {
                    setIsFullSize((ret) => !ret);
                  }}
                >
                  <ArrowsOut size={24} />
                </span>
                <SigmaRender
                  graphEdges={edges}
                  graphNodes={nodes}
                  isFullSize={isFullSize}
                />
              </RenderContainer>
            )}
          </GraphDisplay>
        </GraphDisplayContainer>
      </GraphViewContainer>
    </MainLayout>
  );
}

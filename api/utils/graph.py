import time
from itertools import combinations

import pandas as pd


def graph_formatter(
    graph_file_path, extension: str, graph_type: "coauthorship" or "keywords"
):
    start = time.perf_counter()
    if extension == ".txt":
        sep = "\t"
        col_authors = "AU"
        col_keywords = "DE"
    else:
        sep = ","
        col_authors = "Authors"
        col_keywords = "Author Keywords"

    files_to_keep = col_authors if graph_type == "coauthorship" else col_keywords

    try:
        file = pd.read_csv(
            graph_file_path, sep=sep, index_col=False, on_bad_lines="skip"
        )
    except:
        file = pd.read_csv(
            graph_file_path, sep=",", index_col=False, on_bad_lines="skip"
        )

    if files_to_keep not in file.columns:
        raise ValueError(
            f"Coluna '{files_to_keep}' não encontrada.\n"
            f"Colunas disponíveis: {list(file.columns)}"
        )

    file = file[[files_to_keep]]

    if col_authors in file.columns:
        file[col_authors] = file[col_authors].fillna("").astype(str)

    if col_keywords in file.columns:
        file[col_keywords] = file[col_keywords].fillna("").astype(str)

    edge_weights = {}
    nodes_set = set()

    for _, row in file.iterrows():
        if (graph_type == "coauthorship") and (col_authors in row and row[col_authors]):
            author_list = [a.strip() for a in row[col_authors].split(";") if a.strip()]

            for author in author_list:
                nodes_set.add(author)

            for author1, author2 in combinations(author_list, 2):
                edge_key = tuple(sorted((author1, author2)))
                edge_weights[edge_key] = edge_weights.get(edge_key, 0) + 1

        if (graph_type == "keywords") and (col_keywords in row and row[col_keywords]):
            keywords_list = [
                a.strip() for a in row[col_keywords].split("; ") if a.strip()
            ]

            for keyword in keywords_list:
                nodes_set.add(keyword)

            for keyword1, keyword2 in combinations(keywords_list, 2):
                edge_key = tuple(sorted((keyword1, keyword2)))
                edge_weights[edge_key] = edge_weights.get(edge_key, 0) + 1

    nodes = []
    edges = []

    nodes = [{"data": {"id": author, "label": author}} for author in nodes_set]

    for (source, target), weight in edge_weights.items():
        edges.append(
            {
                "data": {
                    "source": source,
                    "target": target,
                    "weight": weight,
                }
            }
        )
    end = time.perf_counter()

    print(f"Tempo de execução para a formatação dos grafos: {end - start}s")
    return {"nodes": nodes, "edges": edges}

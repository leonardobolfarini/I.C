import pandas as pd


def graph_formatter(graph_file_path, extension):
    if extension == ".txt":
        sep = "\t"
        col_authors = "AU"
        col_keywords = "DE"
        col_source = "SO"
    else:
        sep = ","
        col_authors = "Authors"
        col_keywords = "Author Keywords"
        col_source = "Source title"

    files_to_keep = [col_authors, col_keywords, col_source]

    try:
        file = pd.read_csv(graph_file_path, sep=sep, on_bad_lines="skip")
    except:
        file = pd.read_csv(graph_file_path, sep=",", on_bad_lines="skip")

    available_cols = [c for c in files_to_keep if c in file.columns]
    file = file[available_cols]

    if col_authors in file.columns:
        file[col_authors] = file[col_authors].fillna("").astype(str)

    if col_keywords in file.columns:
        file[col_keywords] = file[col_keywords].fillna("").astype(str)

    authors_dict = {}
    keywords_dict = {}

    for _, row in file.iterrows():
        if col_authors in row and row[col_authors]:
            author_list = row[col_authors].split(";")
            for author in author_list:
                author = author.strip()
                if not author:
                    continue

                if author not in authors_dict:
                    authors_dict[author] = set()

                coauthors = set(
                    a.strip() for a in author_list if a.strip() != author and a.strip()
                )
                authors_dict[author].update(coauthors)

        if col_keywords in row and row[col_keywords]:
            keyword_list = row[col_keywords].split(";")
            for keyword in keyword_list:
                keyword = keyword.strip()
                if not keyword:
                    continue

                if keyword not in keywords_dict:
                    keywords_dict[keyword] = set()

                related_keywords = set(
                    k.strip()
                    for k in keyword_list
                    if k.strip() != keyword and k.strip()
                )
                keywords_dict[keyword].update(related_keywords)

    authors_dict = {k: list(v) for k, v in authors_dict.items()}

    nodes = []
    edges = []
    processed_edges = set()

    for author in authors_dict:
        nodes.append({"data": {"id": author, "label": author}})

    for author, coauthors in authors_dict.items():
        for coauthor in coauthors:
            edge_key = tuple(sorted((author, coauthor)))
            if edge_key not in processed_edges:
                edges.append({"data": {"source": author, "target": coauthor}})
                processed_edges.add(edge_key)

    return {"nodes": nodes, "edges": edges}

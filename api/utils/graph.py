import pandas as pd
import csv
import utils.analysis_functions as analysis

def graph_formatter(graph_file_path):
    file = pd.read_csv(graph_file_path)
    
    files_to_keep = ["Authors", "Author Keywords", "Source title"]
    
    file = analysis.keep_columns(file, files_to_keep)
    file.to_csv(graph_file_path, sep=',', quotechar='"', quoting=csv.QUOTE_ALL, index=False)
    
    file_graph = pd.read_csv(graph_file_path, sep=",")
    authors_dict = {}
    keywords_dict = {}
    
    for _, row in file_graph.iterrows():
        author_list = str(row['Authors']).split(";")
        for author in author_list:
            author = author.strip()
            if author not in authors_dict:
                authors_dict[author] = set()
            coauthors = set(a.strip() for a in author_list if a.strip() != author)
            authors_dict[author].update(coauthors)
        
        keyword_list = str(row['Author Keywords']).split(";")
        for keyword in keyword_list:
            keyword = keyword.strip()
            if keyword not in keywords_dict:
                keywords_dict[keyword] = set()
            related_keywords = set(k.strip() for k in keyword_list if k.strip() != keyword)
            keywords_dict[keyword].update(related_keywords)
    
    authors_dict = {author: list(coauthors) for author, coauthors in authors_dict.items()}
    keywords_dict = {keyword: list(related_keywords) for keyword, related_keywords in keywords_dict.items()}
    
    nodes = []
    edges = []
    
    for author in authors_dict:
        nodes.append({
            "data": {
                "id": author,
                "label": author
            }
        })
    
    for author, coauthors in authors_dict.items():
        for coauthor in coauthors:
            edges.append({
                "data": {
                    "source": author,
                    "target": coauthor
                }
            })
    
    graph_data = {
        "nodes": nodes,
        "edges": edges
    }
    
    return graph_data
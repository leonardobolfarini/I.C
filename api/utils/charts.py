import pandas as pd
import csv
import utils.analysis_functions as analysis

def chart_bar_formatter(file_path): 
    file = pd.read_csv(file_path)
    
    tables_to_keep = ["Authors", "Author Keywords", "Source title", "Year"]
    
    file = analysis.keep_columns(file, tables_to_keep)
    file.to_csv(file_path, sep=',', quotechar='"', quoting=csv.QUOTE_ALL, index=False)
    
    file_without_tables = pd.read_csv(file_path, sep=",")
    authors_count = {}
    keywords_count = {}
    sources_count = {}
    years_count = {}
    
    for _, row in file_without_tables.iterrows():
        author_list = str(row['Authors']).split(";")
        for author in author_list:
            author = author.strip()
            if author not in authors_count:
                authors_count[author] = 1
            else:
                authors_count[author] += 1
        
        keyword_list = str(row['Author Keywords']).split(";")
        for keyword in keyword_list:
            keyword = keyword.strip()
            if keyword not in keywords_count:
                keywords_count[keyword] = 1
            else:
                keywords_count[keyword] += 1
                
        source_list = str(row['Source title']).split(";")
        for source in source_list:
            source = source.strip()
            if source not in sources_count:
                sources_count[source] = 1
            else:
                sources_count[source] += 1

        years_list = str(row['Year']).split(";")
        for year in years_list:
            year = year.strip()
            if year not in years_count:
                years_count[year] = 1
            else:
                years_count[year] += 1
        
    chart_authors_data = [
        {"author": author, "count": count}
        for author, count in authors_count.items()
        if author != "N/A" and author != "nan"
    ]
    chart_keywords_data = [
        {"keyword": keyword, "count": count}
        for keyword, count, in keywords_count.items()
        if keyword != "N/A" and keyword != "nan"
    ]
    chart_source_data = [
        {"source": source, "count": count}
        for source, count, in sources_count.items()
        if source != "N/A" and source != "nan"
    ]
    chart_years_data = [
        {"year": year, "count": count}
        for year, count, in years_count.items()
        if year != "N/A" and year != "nan"
    ]
    
    charts_data = [
        { "authors": chart_authors_data },
        { "keywords": chart_keywords_data },
        { "sources": chart_source_data },
        { "years": chart_years_data }
    ]
    
    return charts_data
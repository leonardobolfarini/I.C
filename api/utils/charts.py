import pandas as pd


def chart_bar_formatter(file_path, extension):
    if extension == ".txt":
        sep = "\t"
        col_map = {"authors": "AU", "keywords": "DE", "source": "SO", "year": "PY"}
    else:
        sep = ","
        col_map = {
            "authors": "Authors",
            "keywords": "Author Keywords",
            "source": "Source title",
            "year": "Year",
        }

    try:
        df = pd.read_csv(file_path, sep=sep, on_bad_lines="skip")
    except:
        df = pd.read_csv(file_path, sep=",", on_bad_lines="skip")

    def get_counts(column_name, output_key_name):
        if column_name not in df.columns:
            return []

        series = df[column_name].fillna("").astype(str)

        counts = series.str.split(";").explode().str.strip().value_counts()

        result_data = []
        for term, count in counts.items():
            if term and str(term).lower() not in ["nan", "n/a", ""]:
                result_data.append({output_key_name: term, "count": int(count)})
        return result_data

    chart_authors_data = get_counts(col_map["authors"], "label")
    chart_keywords_data = get_counts(col_map["keywords"], "label")
    chart_source_data = get_counts(col_map["source"], "label")

    chart_years_data = get_counts(col_map["year"], "label")

    charts_data = [
        {"authors": chart_authors_data},
        {"keywords": chart_keywords_data},
        {"sources": chart_source_data},
        {"years": chart_years_data},
    ]

    return charts_data

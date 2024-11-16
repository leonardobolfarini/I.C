import csv
import os
import zipfile
import pandas as pd
from unidecode import unidecode
from flask import Flask, make_response, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

header_csv = [
    "Authors", "Title", "Year", "Source title", "DOI", "Abstract", "Author Keywords"
]
header_txt = [
    "AU", "TI", "PY", "SO", "DI", "AB", "DE"
]
columns_to_replace_txt = [('AU', 0), ('TI', 1), ('PY', 2), ('SO', 3), ('DI', 4), ('AB', 5), ('DE', 6)]
columns_to_remove_txt = [
    'PT', 'BA', 'BE', 'GP', 'AF', 'BF', 'CA', 'SE', 'BS', 'LA', 'DT', 'CT', 'CY', 'CL',
    'SP', 'HO', 'ID', 'C1', 'C3', 'RP', 'EM', 'RI', 'OI', 'FU', 'FP', 'FX', 'CR', 'NR', 
    'TC', 'Z9', 'U1', 'U2', 'PU', 'PI', 'PA', 'SN', 'EI', 'BN', 'J9', 'JI', 'PD', 'VL', 
    'IS', 'PN', 'SU', 'SI', 'MA', 'BP', 'EP', 'AR', 'EA', 'PG', 'WC', 'WE', 'SC', 'GA', 
    'PM', 'OA', 'HC', 'HP', 'DA', 'UT', 'DL', 'D2'
]
columns_to_remove_csv = [
    "Author full names", "Author(s) ID", "Link", "Authors with affiliations", 
    "Molecular Sequence Numbers", "Volume", "Issue", "Art. No.", "Page start", 
    "Page end", "Page count", "Cited by", "Affiliations", "Index Keywords", 
    "References", "Chemicals/CAS", "Tradenames", "Correspondence Address", 
    "Editors", "Publisher", "Sponsors", "Conference name", "Manufacturers", 
    "CODEN", "Publication Stage", "Conference date", "Conference location", 
    "Conference code", "ISSN", "ISBN", "PubMed ID", "Language of Original Document", 
    "Abbreviated Source Title", "Document Type", "Open Access", "EID", "Source"
]

def remove_columns(df, columns):
    return df.drop(columns=columns).fillna("N/A")

def process_wos_data(df, wos_path_txt, wos_path_csv):
    for column, new_index in columns_to_replace_txt:
        replaced_column_data = df[column].fillna("N/A")
        df.pop(column)
        df.insert(new_index, column, replaced_column_data)
        
    df["AU"] = df["AU"].apply(lambda x: '; '.join(
        [' '.join(
            [f'{word[0]}.{word[1:]}' if len(word) == 2 and word.isupper() else word
            for word in name.split()]
        ) + '.' if ',' in name else name for name in x.split(';')]) if pd.notna(x) else x)
    
    df["AU"] = df["AU"].apply(lambda x: x.replace(",", ""))
    
    df.to_csv(wos_path_txt, sep='\t', index=False)

    data = []
    with open(wos_path_txt) as txt_wosFile:
        for i, row in enumerate(csv.reader(txt_wosFile, delimiter='\t', quotechar='"')):
            if i > 0:
                data.append(row)
    
    with open(wos_path_csv, 'w', newline='') as csv_wosFile:
        csv_writer = csv.writer(csv_wosFile, delimiter=',', quoting=csv.QUOTE_ALL)
        csv_writer.writerow(header_csv)
        csv_writer.writerows(data)

def process_scopus_data(scopus_path_csv, scopus_path_txt):
    data = []
    with open(scopus_path_csv) as csv_scopusFile:
        for i, row in enumerate(csv.reader(csv_scopusFile, delimiter=',')):
            if i > 0:
                data.append(row)
    with open(scopus_path_txt, 'w', newline='') as scopus_txt:
        csv_writer = csv.writer(scopus_txt, delimiter='\t')
        csv_writer.writerow(header_txt)
        csv_writer.writerows(data)

def merge_and_process_files_in_csv(scopus_path, wos_path, output_path):
    with open(scopus_path, 'r') as scopusbibly, open(wos_path, 'r') as wos_data, open(output_path, 'a') as output_file:
        output_file.truncate(0)
        for i, data in enumerate(scopusbibly):
            output_file.write(data)
        for i, data in enumerate(wos_data):
            if i == 0:
                continue
            output_file.write(data)
    
    df = pd.read_csv(output_path, on_bad_lines='skip')
    
    for column in df.columns:
        if df[column].dtype == 'object':
            if column == 'Abstract':
                df[column] = df[column].apply(lambda x: x.replace('[No abstract available]', 'N/A') if pd.notna(x) else x)
            df[column] = df[column].apply(lambda x: unidecode(x).replace('"', '').lower().strip() if pd.notna(x) else x)
    
    mask_duplicates = df.duplicated(subset=['DOI'])
    mask_na_values = df['DOI'].isna()
    mask_to_keep = ~mask_duplicates | mask_na_values
    df_without_duplicates = df[mask_to_keep]
    df_without_duplicates.to_csv(output_path, sep=',', quotechar='"', quoting=csv.QUOTE_ALL, index=False)

    df = pd.read_csv(output_path, on_bad_lines='skip')
    df_without_duplicates = df.drop_duplicates(subset=["Authors", "Title", "Source title"], keep='first')
    df_without_duplicates.to_csv(output_path, sep=',', quotechar='"', quoting=csv.QUOTE_ALL, index=False)

def merge_and_process_files_in_txt(scopus_path, wos_path, output_path):
    with open(scopus_path, 'r') as scopusbibly, open(wos_path, 'r') as wos_data, open(output_path, 'a') as output_file:
        output_file.truncate(0)
        for i, data in enumerate(wos_data):
            output_file.write(data)
        for i, data in enumerate(scopusbibly):
            if i == 0:
                continue
            output_file.write(data)
    
    df = pd.read_csv(output_path, sep='\t', on_bad_lines='skip')
    
    for column in df.columns:
        if df[column].dtype == 'object':
            if column == 'Abstract':
                df[column] = df[column].apply(lambda x: x.replace('[No abstract available]', 'N/A') if pd.notna(x) else x)
            df[column] = df[column].apply(lambda x: unidecode(x).replace('"', '').lower().strip() if pd.notna(x) else x)
    
    mask_duplicates = df.duplicated(subset=['DI'])
    mask_na_values = df['DI'].isna()
    mask_to_keep = ~mask_duplicates | mask_na_values
    df_without_duplicates = df[mask_to_keep]
    df_without_duplicates.to_csv(output_path, sep='\t', index=False)

    df = pd.read_csv(output_path, sep='\t', on_bad_lines='skip')
    df_without_duplicates = df.drop_duplicates(subset=["AU", "TI", "SO"], keep='first')
    df_without_duplicates.to_csv(output_path, sep='\t', index=False)
    
@app.route('/process', methods=['Options', 'Post'])
def process_files():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response
    
    if 'scopusFile' not in request.files or 'wosFile' not in request.files:
        return "Arquivos de entrada necessários.", 400

    scopusFile = request.files['scopusFile']
    wosFile = request.files['wosFile']

    scopus_path_csv = os.path.join(UPLOAD_FOLDER, 'scopusFile.csv')
    scopus_path_txt = os.path.join(UPLOAD_FOLDER, 'scopusFile.txt')
    wos_path_txt = os.path.join(UPLOAD_FOLDER, 'wosFile.txt')
    wos_path_csv = os.path.join(UPLOAD_FOLDER, 'wosFile.csv')
    output_csv_path = os.path.join(OUTPUT_FOLDER, 'all_in_one.csv')
    output_txt_path = os.path.join(OUTPUT_FOLDER, 'all_in_one.txt')

    scopusFile.save(scopus_path_csv)
    wosFile.save(wos_path_txt)

    wos_df = pd.read_csv(wos_path_txt, sep='\t')
    wos_df = remove_columns(wos_df, columns_to_remove_txt)
    wos_df.to_csv(wos_path_txt, sep='\t', index=False)
    wos_df = process_wos_data(wos_df, wos_path_txt, wos_path_csv)

    scopus_df = pd.read_csv(scopus_path_csv, sep=',')
    scopus_df = remove_columns(scopus_df, columns_to_remove_csv)
    scopus_df.to_csv(scopus_path_csv, sep=',', quotechar='"', quoting=csv.QUOTE_ALL, index=False)
    scopus_df = process_scopus_data(scopus_path_csv, scopus_path_txt)
    
    merge_and_process_files_in_csv(scopus_path_csv, wos_path_csv, output_csv_path)
    merge_and_process_files_in_txt(scopus_path_txt, wos_path_txt, output_txt_path)

    zip_path = os.path.join(OUTPUT_FOLDER, 'resultados.zip')
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        zipf.write(output_csv_path, arcname='all_in_one.csv')
        zipf.write(output_txt_path, arcname='all_in_one.txt')

    return send_file(zip_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
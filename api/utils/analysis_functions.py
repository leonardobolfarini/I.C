import csv
import pandas as pd
from unidecode import unidecode

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
    
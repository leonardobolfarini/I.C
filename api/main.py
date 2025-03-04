import os
import csv
import zipfile
import pandas as pd
import utils.analysis_functions as analysis
import utils.graph as graph
from flask import Flask, make_response, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


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
    wos_df = analysis.remove_columns(wos_df, analysis.columns_to_remove_txt)
    wos_df.to_csv(wos_path_txt, sep='\t', index=False)
    wos_df = analysis.process_wos_data(wos_df, wos_path_txt, wos_path_csv)

    scopus_df = pd.read_csv(scopus_path_csv, sep=',')
    scopus_df = analysis.remove_columns(scopus_df, analysis.columns_to_remove_csv)
    scopus_df.to_csv(scopus_path_csv, sep=',', quotechar='"', quoting=csv.QUOTE_ALL, index=False)
    scopus_df = analysis.process_scopus_data(scopus_path_csv, scopus_path_txt)
    
    analysis.merge_and_process_files_in_csv(scopus_path_csv, wos_path_csv, output_csv_path)
    analysis.merge_and_process_files_in_txt(scopus_path_txt, wos_path_txt, output_txt_path)

    zip_path = os.path.join(OUTPUT_FOLDER, 'resultados.zip')
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        zipf.write(output_csv_path, arcname='all_in_one.csv')
        zipf.write(output_txt_path, arcname='all_in_one.txt')

    return send_file(zip_path, as_attachment=True)

@app.route('/graph', methods=['Options', 'Post'])
def get_graph_format():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if 'graphFile' not in request.files:
        return "Arquivos de entrada necessários.", 400

    graphFile = request.files['graphFile']
    
    graph_file_path = os.path.join(UPLOAD_FOLDER, 'graphFile.csv')
    
    graphFile.save(graph_file_path)
    
    graph_data = graph.graph_formatter(graph_file_path)
    
    return graph_data

if __name__ == "__main__":
    app.run(debug=True)
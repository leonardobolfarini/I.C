import csv
import io
import os
import uuid
import zipfile

import pandas as pd
import utils.analysis_functions as analysis
import utils.charts as charts
import utils.graph as graph
from flask import Flask, make_response, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


@app.route("/process", methods=["Options", "Post"])
def process_files():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if "scopusFile" not in request.files or "wosFile" not in request.files:
        return "Arquivos de entrada necessários.", 400

    scopusFile = request.files["scopusFile"]
    wosFile = request.files["wosFile"]

    requisition_id = str(uuid.uuid4())

    scopus_path_csv = os.path.join(UPLOAD_FOLDER, f"scopusFile_{requisition_id}.csv")
    scopus_path_txt = os.path.join(UPLOAD_FOLDER, f"scopusFile_{requisition_id}.txt")
    wos_path_txt = os.path.join(UPLOAD_FOLDER, f"wosFile_{requisition_id}.txt")
    wos_path_csv = os.path.join(UPLOAD_FOLDER, f"wosFile_{requisition_id}.csv")
    output_csv_path = os.path.join(OUTPUT_FOLDER, f"all_in_one_{requisition_id}.csv")
    output_txt_path = os.path.join(OUTPUT_FOLDER, f"all_in_one_{requisition_id}.txt")
    zip_path = os.path.join(OUTPUT_FOLDER, f"resultados_{requisition_id}.zip")

    try:
        scopusFile.save(scopus_path_csv)
        wosFile.save(wos_path_txt)
        wos_df = pd.read_csv(wos_path_txt, sep="\t")
        scopus_df = pd.read_csv(scopus_path_csv, sep=",")

        wos_df = analysis.keep_columns(wos_df, analysis.header_txt)
        scopus_df = analysis.keep_columns(scopus_df, analysis.header_csv)

        wos_df.to_csv(wos_path_txt, sep="\t", index=False)
        wos_df = analysis.process_wos_data(wos_df, wos_path_txt, wos_path_csv)

        scopus_df.to_csv(
            scopus_path_csv, sep=",", quotechar='"', quoting=csv.QUOTE_ALL, index=False
        )
        scopus_df = analysis.process_scopus_data(scopus_path_csv, scopus_path_txt)

        analysis.merge_and_process_files_in_csv(
            scopus_path_csv, wos_path_csv, output_csv_path
        )
        analysis.merge_and_process_files_in_txt(
            scopus_path_txt, wos_path_txt, output_txt_path
        )

        with zipfile.ZipFile(zip_path, "w") as zipf:
            zipf.write(output_csv_path, arcname="all_in_one.csv")
            zipf.write(output_txt_path, arcname="all_in_one.txt")

        with open(zip_path, "rb") as f:
            data = io.BytesIO(f.read())

        os.remove(zip_path)

        return send_file(
            data,
            download_name=f"resultados_{uuid.uuid4()}.zip",
            as_attachment=True,
            mimetype="application/zip",
        )

    except Exception as e:
        return f"Erro ao unir arquivos: {str(e)}", 500

    finally:
        files_to_remove = [
            scopus_path_csv,
            scopus_path_txt,
            wos_path_txt,
            wos_path_csv,
            output_csv_path,
            output_txt_path,
        ]

        for f in files_to_remove:
            if os.path.exists(f):
                os.remove(f)


@app.route("/graph", methods=["Options", "Post"])
def get_graph_format():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if "graphFile" not in request.files:
        return "Arquivos de entrada necessários.", 400

    graphFile = request.files["graphFile"]

    filename = secure_filename(graphFile.filename or "")
    _, file_extension = os.path.splitext(filename)
    file_extension = file_extension.lower()

    unique_filename = f"{uuid.uuid4()}{file_extension}"
    graph_file_path = os.path.join(UPLOAD_FOLDER, unique_filename)

    try:
        graphFile.save(graph_file_path)
        graph_data = graph.graph_formatter(graph_file_path, file_extension)
        return graph_data
    except Exception as e:
        return f"Erro ao processar arquivo: {str(e)}", 500
    finally:
        if os.path.exists(graph_file_path):
            os.remove(graph_file_path)


@app.route("/chart_bar", methods=["Options", "Post"])
def get_chart_format():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    if "chartBarFile" not in request.files:
        return "Arquivos de entrada necessários.", 400

    chart_bar_file = request.files["chartBarFile"]

    filename = secure_filename(chart_bar_file.filename or "")
    _, file_extension = os.path.splitext(filename)
    file_extension = file_extension.lower()

    unique_filename = f"{uuid.uuid4()}{file_extension}"
    chart_bar_file_path = os.path.join(UPLOAD_FOLDER, unique_filename)

    try:
        chart_bar_file.save(chart_bar_file_path)
        chart_data = charts.chart_bar_formatter(chart_bar_file_path, file_extension)
        return chart_data
    except Exception as e:
        return f"Erro ao processar arquivo: {str(e)}", 500
    finally:
        if os.path.exists(chart_bar_file_path):
            os.remove(chart_bar_file_path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5009, debug=False)

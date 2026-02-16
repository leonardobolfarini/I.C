import pandas as pd
from unidecode import unidecode


def clean_text(text):
    if pd.isna(text):
        return text

    text = str(text).replace("[No abstract available]", "N/A")
    return unidecode(text).replace('"', "").lower().strip()


def merge_and_process_bibliometric_data_csv(
    scopus_df: pd.DataFrame, wos_df: pd.DataFrame
) -> pd.DataFrame:
    combined_df = pd.concat([scopus_df, wos_df], ignore_index=True)
    return combined_df


# def merge_and_process_files_in_csv(scopus_path, wos_path, output_path):
#     for column in df.columns:
#         if df[column].dtype == "object":
#             if column == "Abstract":
#                 df[column] = df[column].apply(
#                     lambda x: (
#                         x.replace("[No abstract available]", "N/A")
#                         if pd.notna(x)
#                         else x
#                     )
#                 )
#             df[column] = df[column].apply(
#                 lambda x: (
#                     unidecode(x).replace('"', "").lower().strip() if pd.notna(x) else x
#                 )
#             )

#     mask_duplicates = df.duplicated(subset=["DOI"])
#     mask_na_values = df["DOI"].isna()
#     mask_to_keep = ~mask_duplicates | mask_na_values
#     df_without_duplicates = df[mask_to_keep]
#     df_without_duplicates.to_csv(
#         output_path, sep=",", quotechar='"', quoting=csv.QUOTE_ALL, index=False
#     )

#     df = pd.read_csv(output_path, on_bad_lines="skip")
#     df_without_duplicates = df.drop_duplicates(
#         subset=["Authors", "Title", "Source title"], keep="first"
#     )
#     df_without_duplicates.to_csv(
#         output_path, sep=",", quotechar='"', quoting=csv.QUOTE_ALL, index=False
#     )

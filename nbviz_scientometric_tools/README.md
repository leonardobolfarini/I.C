# NBViz: Scientometric Tools 📊

Uma biblioteca Python especializada no tratamento, merge e análise de dados provenientes de bases bibliométricas (**Scopus** e **Web of Science**).

## ✨ Principais Funcionalidades

- **Data Cleaning:** Tratamento de valores nulos e normalização de nomes.
- **Term Explosion:** Processamento de colunas com múltiplos valores (autores e palavras-chave separados por `;`).
- **Formatting:** Conversão de DataFrames em estruturas prontas para gráficos de barras e redes de coautoria.
- **Multiformat:** Suporte a `.csv` e `.txt` (WoS Tab-separated).

## 📦 Instalação

```bash
pip install nbviz-scientometric-tools
```

## 🛠️ Exemplo Rápido

```bash
import pandas as pd
import scientometric_tools as st
```

# Carrega dataset do Scopus/WoS

```py
df = pd.read_csv("data.csv")
```

# Formata dados de autores para gráfico de barras

```py
result = st.chart_bar_formatter(df, col="Authors")
```

# Saída: {"data": [{"label": "Autor X", "count": 5}, ...]}

```py
print(result)
```

## 📝 Licença

Este projeto está sob a licença MIT.

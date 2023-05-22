import sys
import json
import joblib
import numpy as np

# Carrega o modelo treinado
model = joblib.load('models/modelo_treinado_random_forest.pkl')

# Recupera os argumentos de entrada da linha de comando
ano, mes, dia, hora, minuto, bme280_hum, bme280_pres, bme280_temp = map(float, sys.argv[1:])

# Cria um array numpy com as informações inseridas
dados_entrada = np.array([ano, mes, dia, hora, minuto, bme280_hum, bme280_pres, bme280_temp]).reshape(1,-1)

# Faz a previsão
previsao = model.predict(dados_entrada)

# Retorna a previsão como um objeto JSON
print(json.dumps({"previsao": int(previsao[0])}))

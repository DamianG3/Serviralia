# LIBRERIAS
from googletrans import Translator
import requests
from bs4 import BeautifulSoup
import sys
import json

def traducirPaginaWeb(url, dest_language='es'):
    try:
        # Busca el contenido de la página web
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extrae el texto del html (contenido en la etiqueta <p>)
        text = ' '.join([p.get_text() for p in soup.find_all('p')])
        
        # Traduce el texto obtenido del parseo
        translator = Translator()
        translated = translator.translate(text, dest=dest_language)
        
        return translated.text
    
    # En caso de error al traducir
    except Exception as e:
        return f"Error: {str(e)}"

# Ejecución desde el script de Node.js
if __name__ == "__main__":
    # Obtiene la URL desde los argumentos de la línea de comandos
    url = sys.argv[1]
    # Obtiene el idioma al que se va a traducir desde los argumentos de la línea de comandos
    target_lang = sys.argv[2] if len(sys.argv) > 2 else 'en'
    # Llama a la función de traducción y lo guarda
    result = traducirPaginaWeb(url, target_lang)
    # Imprime el resultado en formato JSON
    print(json.dumps({"translation": result}))

// IMPORTS
const { spawn } = require('child_process');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// Función para traducir la página de español a inglés
async function traducirPaginaWeb(url, targetLang = 'en') {

    // Ejecuta el script desde el programa de Python
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [
            'traduccionWeb.py',
            url,
            targetLang
        ]);

        // Recibe la salida del script de Python
        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        // En caso de error rechaza Promise y manda el error desde Pyhton a Node
        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            try {
                // Parsea el resultado en JSON de la traducción
                const parsed = JSON.parse(result.trim());
                // Devuelve el texto traducido
                resolve(parsed.translation);
            } catch (err) {
                reject("No se pudo parsear el texto de la url");
            }
        });
    });
}

//  Configuración de IBM Watson Natural Language Understanding
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
        apikey: '4cg_UDjYZut7vNi62tGRZ5jVZlWZbXALTfWp1FyKG58y',
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/c490e8ec-5a6c-4a2b-8267-f82e0f161d2c',
});


async function analizarResenas() {
    try {
        // Traducción de la página web del perfil de trabajador de Serviralia
        const translatedText = await traducirPaginaWeb('https://luzvelasco.github.io/perfiltrab.html', 'en')

        const analyzeParams = {
            'language': 'en',
            'text': `${translatedText}`,
            'features': {
                'emotion': {
                }
            }
        };

        naturalLanguageUnderstanding.analyze(analyzeParams)
            .then(analysisResults => {
                console.log(JSON.stringify(analysisResults, null, 2));
            })
            .catch(err => {
                console.log('error:', err);
            });

        // console.log(translatedText);

    } catch (err) {
        console.error("Error al hacer el analisis:", err);
    }
}

analizarResenas();

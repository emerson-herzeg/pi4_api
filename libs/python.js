const { spawn } = require('child_process');

function runPythonScript(input) {
    // Transforma o objeto de entrada em uma lista de argumentos
    const args = Object.values(input);

    return new Promise((resolve, reject) => {
        const python = spawn('/usr/bin/python3', ['python/main.py', ...args]);

        let outputData = '';
        let errorData = '';

        python.stdout.on('data', (data) => {
            outputData += data.toString();
        });

        python.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        python.on('error', (error) => {
            reject('Error: ' + error.message);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                reject('Process exited with code ' + code + ' and error: ' + errorData);
            } else {
                // Converte a string JSON de volta para um objeto JavaScript
                try {
                    const outputObj = JSON.parse(outputData);
                    resolve(outputObj);
                } catch (error) {
                    reject('Error parsing JSON: ' + error.message);
                }
            }
        });
    });
}

module.exports = runPythonScript;

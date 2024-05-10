const mysql = require('mysql');
var utils = require('../utils');

async function databaseConnection() {
    var connectionState = false;
    var retriesConnectionAttempt = 5;

    // Configurações do banco de dados
    if (!connectionState) {
        while (!connectionState && retriesConnectionAttempt > 0) {
            var conVar = mysql.createConnection({
                host: 'mysql',
                user: 'sync_user',
                password: 'Sync.1234',
                database: 'sync360_db'
            });
            conVar.connect(error => {
                if (error) {
                    console.log('Erro ao tentar Conectar! Tentativa '+retriesConnectionAttempt+'!');
                    console.error(error);
                    retriesConnectionAttempt = retriesConnectionAttempt - 1;
                } else {
                    connectionState = true;
                    console.log('Conectado ao MySQL!');
                }
            });
            await utils.sleep(2000)
        }
        if (!connectionState) {
            console.log('Erro ao tentar Conectar!');
        }
    }
    return conVar

}

exports.databaseConnection  =  databaseConnection

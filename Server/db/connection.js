// MONGOOSE: Bibliotoka do połączenia serwera MongoDB z Node.js

// =========== REQUIRE: Umożliwia użycie pakietu ================
const mongoose = require('mongoose');

// ============= IMPLEMENTATION ==============
mongoose.set('strictQuery', false);

const connect = mongoose
    .connect(process.env.CONNECTION_URL) /* Metoda połączenia z MongoDB */
    .then((res) => /* Jeżeli zakończy sie sukcesem */
    {
        console.log('*** Połączono z bazą danych ***');
    }) 
    .catch((err) => /* Jeżeli zakończy sie błędem */
    {
        console.log(`DATABASE CONNECTION - ERROR: ${err} `);
    });

module.exports = connect; // Eksport 'connect'



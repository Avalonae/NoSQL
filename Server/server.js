
// EXPRESS: Framework node.js dostarcza zestaw narzędzi i funkcji dla aplikacji webowych. Pozwala w łatwy sposób stworzyć API.
// DOTENV: Pakiet node.js pozwalający na automatyczne załadowanie zmiennych środowiskowych z pliku .env do process.env
// BODY-PARSER: Pakiet node.js umożliwia analizę danych w formacie JSON przesyłane za pomocą metod HTTP : Post. Ułatawia pracę modułu EXPRESS
// COOKIE-PARSER: Pakiet  umożliwia analizę plików cookie w nagłówkach żądań (request).
// CORS: Pakiet umożliwia mechanizm Cros-Origin-Resource-Sharing
// ./db/connection.js : Import 'connect' z 'connection.js', umożliwia połączenie z MongoDB


// =========== REQUIRE: Umożliwia użycie pakietu ================

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./router/userRouter");

// ============= IMPLEMENTATION CONNECTION ==============

dotenv.config({path:"./config.env"});
const connect = require("./db/connection"); /* -> Załadowanie zmiennych środowiskowych z '/config.env' do 'process.env' */

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors(
    {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
    ));

app.use("/api/user", userRouter);

const port = process.env.PORT || 8080; /* PORT: 5000 lub 8080 (Jeżeli 5000 Nie)*/

connect
    .then((res) => {
        app.listen(port, () => {
            console.log(`Server is running on PORT: ${port}`);
        });
    })
    .catch((err) => {
        console.log(`ERROR: ${err}`);
    });

// ================ METODY HTTP: POST ==================

// app.post("api/verify_account", (req, res, next) => 
// {

// });
// app.post("api/login", (req, res, next) => 
// {

// });
// app.post("api/register", (req, res, next) => 
// {

// });

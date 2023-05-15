const express = require('express');
const apiRoutes = require('./routes/api')
const PORT = 3000
const path = require('path')

const app = express();


//passando por Middleware as rotas para as requisições da api;
app.use("/api", apiRoutes);

app.use("/", express.static(path.join(__dirname, 'public'))); // conectar backend com a pasta Public com o HTML





app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))

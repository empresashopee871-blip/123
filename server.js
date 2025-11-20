const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/numero", (req, res) => {
    const dados = JSON.parse(fs.readFileSync("numeros.json", "utf8"));

    if (dados.length === 0) {
        return res.json({ numero: null });
    }

    const numero = dados[0];

    res.json({ numero });
});

app.post("/consumir", (req, res) => {
    const dados = JSON.parse(fs.readFileSync("numeros.json", "utf8"));

    if (dados.length === 0) return res.json({ sucesso: false });

    dados.shift();

    fs.writeFileSync("numeros.json", JSON.stringify(dados, null, 2));

    res.json({ sucesso: true });
});

app.listen(10000, () => console.log("Servidor rodando na porta 10000"));

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/versiculo', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.bibliaonline.com.br/vc');
    const $ = cheerio.load(data);
    const texto = $('.verse-text').first().text().trim();
    const referencia = $('.verse-reference').first().text().trim();
    res.json({ texto, referencia });
  } catch (err) {
    res.json({ texto: "Não foi possível carregar o versículo hoje. 🙏", referencia: "" });
  }
});

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});

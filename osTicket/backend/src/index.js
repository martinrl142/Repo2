const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
var cors = require('cors');
const app = express();

app.use(cors());

async function cryptopriceScraper() {
    let body = "";
    const ruta = "http://fvet1.fvet.edu.uy/osTicket_1.6.0sp/scp/tickets.php";
    await axios.get(ruta).then(urlResponse => {
        const $ = cheerio.load(urlResponse.data);
        body = $("body");
        console.log(body);
    });
    console.log(body);
    return body;
}

app.get("/api/crypto", async (req, res) => {
  try {
    const crypto = await cryptopriceScraper();
    console.log(crypto);
    return res.status(200).json({
      result: crypto
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

app.listen(PORT, () =>
  console.log(`The server is active and running on port ${PORT}`)
);
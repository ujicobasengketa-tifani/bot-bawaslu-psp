const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// INI AKAN DIISI NANTI DI VERCEL, JANGAN DIISI DISINI
const TOKEN = process.env.TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const databaseJawaban = JSON.parse(fs.readFileSync('jawaban.json', 'utf8'));

function cariJawaban(pesanUser) {
  const pesan = pesanUser.toLowerCase();
  for (let item of databaseJawaban) {
    if (item.id === 0) continue;
    for (let kw of item.keyword) {
      if (pesan.includes(kw.toLowerCase())) {
        return item.jawaban;
      }
    }
  }
  return databaseJawaban.find(x => x.id === 0).jawaban;
}

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (message) {
      const from = message.from;
      const text = message.text?.body || "";
      const jawabanBot = cariJawaban(text);
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        data: {
          messaging_product: 'whatsapp',
          to: from,
          text: { body: jawabanBot }
        }
      });
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(200);
  }
});

app.get('/', (req, res) => {
  res.send('Bot Bawaslu PSP Hidup!');
});

module.exports = app;

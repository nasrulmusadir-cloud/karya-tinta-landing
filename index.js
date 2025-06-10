const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Gantilah dengan Private Key Tripay kamu
const tripayPrivateKey = 'KIse8-XOB8v-mab0O-iUlwn-cae9x';

app.use(bodyParser.json());

app.post('/tripay-webhook', (req, res) => {
  const callbackSignature = req.headers['x-callback-signature'];
  const json = JSON.stringify(req.body);
  const signature = crypto.createHmac('sha256', tripayPrivateKey).update(json).digest('hex');

  if (callbackSignature !== signature) {
    return res.status(403).send('Invalid signature');
  }

  console.log('Webhook received:', req.body);

  // Di sini kamu bisa simpan data ke database atau update status pembayaran
  res.status(200).send('Webhook received successfully');
});

app.get('/', (req, res) => {
  res.send('Tripay Webhook Active');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

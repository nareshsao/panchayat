const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let heads = [
  { sn: '1', headName: 'Head 1', amount: '100' },
  { sn: '2', headName: 'Head 2', amount: '200' }
];

app.get('/api/heads', (req, res) => {
  res.status(200).send(heads);
});

app.post('/api/heads', (req, res) => {
  const head = req.body;
  heads.push(head);
  res.status(201).send(head);
});

app.put('/api/heads/:sn', (req, res) => {
  const sn = req.params.sn;
  const updatedHead = req.body;
  const index = heads.findIndex(h => h.sn === sn);
  if (index !== -1) {
    heads[index] = updatedHead;
    res.status(200).send(updatedHead);
  } else {
    res.status(404).send({ message: 'Head not found' });
  }
});

app.delete('/api/heads/:sn', (req, res) => {
  const sn = req.params.sn;
  heads = heads.filter(h => h.sn !== sn);
  res.status(200).send({ message: 'Head deleted' });
});

let accounts = [
  { sn: '1', accountNo: '123456', bankName: 'Bank A', financialYear: '2021-2022', openingBalance: '1000' },
  { sn: '2', accountNo: '654321', bankName: 'Bank B', financialYear: '2022-2023', openingBalance: '2000' }
];

app.get('/api/accounts', (req, res) => {
  res.status(200).send(accounts);
});

app.post('/api/accounts', (req, res) => {
  const account = req.body;
  accounts.push(account);
  res.status(201).send(account);
});

app.put('/api/accounts/:sn', (req, res) => {
  const sn = req.params.sn;
  const updatedAccount = req.body;
  const index = accounts.findIndex(a => a.sn === sn);
  if (index !== -1) {
    accounts[index] = updatedAccount;
    res.status(200).send(updatedAccount);
  } else {
    res.status(404).send({ message: 'Account not found' });
  }
});

app.delete('/api/accounts/:sn', (req, res) => {
  const sn = req.params.sn;
  accounts = accounts.filter(a => a.sn !== sn);
  res.status(200).send({ message: 'Account deleted' });
});

let workEntries = [];

app.get('/api/work-entries', (req, res) => {
  res.status(200).send(workEntries);
});

app.post('/api/work-entries', (req, res) => {
  const workEntry = req.body;
  workEntries.push(workEntry);
  res.status(201).send(workEntry);
});

app.put('/api/work-entries/:id', (req, res) => {
  const id = req.params.id;
  const updatedWorkEntry = req.body;
  const index = workEntries.findIndex(w => w.id === id);
  if (index !== -1) {
    workEntries[index] = updatedWorkEntry;
    res.status(200).send(updatedWorkEntry);
  } else {
    res.status(404).send({ message: 'Work entry not found' });
  }
});

app.delete('/api/work-entries/:id', (req, res) => {
  const id = req.params.id;
  workEntries = workEntries.filter(w => w.id !== id);
  res.status(200).send({ message: 'Work entry deleted' });
});

let payments = [];

app.get('/api/payments', (req, res) => {
  res.status(200).send(payments);
});

app.post('/api/payments', (req, res) => {
  const payment = req.body;
  payments.push(payment);
  res.status(201).send(payment);
});

app.put('/api/payments/:id', (req, res) => {
  const id = req.params.id;
  const updatedPayment = req.body;
  const index = payments.findIndex(p => p.id === id);
  if (index !== -1) {
    payments[index] = updatedPayment;
    res.status(200).send(updatedPayment);
  } else {
    res.status(404).send({ message: 'Payment not found' });
  }
});

app.delete('/api/payments/:id', (req, res) => {
  const id = req.params.id;
  payments = payments.filter(p => p.id !== id);
  res.status(200).send({ message: 'Payment deleted' });
});

let receives = [];

app.get('/api/receives', (req, res) => {
  res.status(200).send(receives);
});

app.post('/api/receives', (req, res) => {
  const receive = req.body;
  receives.push(receive);
  res.status(201).send(receive);
});

app.put('/api/receives/:id', (req, res) => {
  const id = req.params.id;
  const updatedReceive = req.body;
  const index = receives.findIndex(r => r.id === id);
  if (index !== -1) {
    receives[index] = updatedReceive;
    res.status(200).send(updatedReceive);
  } else {
    res.status(404).send({ message: 'Receive not found' });
  }
});

app.delete('/api/receives/:id', (req, res) => {
  const id = req.params.id;
  receives = receives.filter(r => r.id !== id);
  res.status(200).send({ message: 'Receive deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
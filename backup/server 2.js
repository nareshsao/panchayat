require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODB_URI); // Debugging
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = 'mongodb://localhost:27017/mydb'; // Hardcoded URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

// Define Schemas
const headSchema = new mongoose.Schema({
  sn: { type: String, required: true },
  headName: { type: String, required: true },
  directIndirect: { type: String, required: true }, // Ensure this field is included
  amount: { type: Number, required: true },
  accountNo: { type: String, required: true }, // Ensure this field is included
});

const accountSchema = new mongoose.Schema({
  sn: String,
  accountNo: String,
  bankName: String,
  financialYear: String,
  openingBalance: String
});

const workEntrySchema = new mongoose.Schema({
  id: String,
  workName: String, // Corrected
  sanctionAmount: Number, // Corrected
  head: String, // Corrected
  sanctionOrderNo: String, // Corrected
  sanctionOrderDate: Date,
  sanctionedBy: String // Corrected
});

// Define the schema for bill details
const billDetailSchema = new mongoose.Schema({
  sn: { type: String }, // Serial number
  name: { type: String }, // Item name
  rate: { type: Number }, // Rate of the item
  qty: { type: Number }, // Quantity
  total: { type: Number }, // Total amount (rate * qty)
});

// Define the main payment schema
const paymentSchema = new mongoose.Schema({
  voucherNo: { type: String, required: true }, // Voucher number
  date: { type: Date, required: true }, // Date of payment
  cashCheck: { type: String, required: true }, // Cash or check
  bank: { type: String}, // Bank name
  checkNo: { type: String }, // Check number
  amount: { type: Number, required: true }, // Total amount
  forWork: { type: String }, // Work description
  head: { type: String, required: true }, // Head/account
  whome: { type: String }, // Payee name
  billNo: { type: String }, // Bill number
  billDate: { type: Date }, // Bill date
  prastawNoDate: { type: String }, // Prastaw number and date
  remark: { type: String }, // Remarks
  billDetails: [billDetailSchema], // Array of bill details
});

// Define the receive schema
const receiveSchema = new mongoose.Schema({
  sn: { type: String, required: true }, // Serial number
  date: { type: Date, required: true }, // Date of receipt
  receiveDetail: { type: String, required: true }, // Details of the receipt
  cashBank: { type: String, required: true }, // Cash or Bank
  accountNo: { type: String, required: true }, // Account number
  budgetLekha: { type: String, required: true }, // Budget ledger
  head: { type: String, required: true }, // Head/account
  workList: { type: String, required: true }, // Work list
  check_direct: { type: String, required: true }, // Check or Direct Payment
  amount: { type: Number, required: true }, // Amount received
  receiveRemark: { type: String, required: true }, // Remarks
});

// Create Models
const Head = mongoose.model('Head', headSchema);
const Account = mongoose.model('Account', accountSchema);
const WorkEntry = mongoose.model('WorkEntry', workEntrySchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Receive = mongoose.model('Receive', receiveSchema);

// Routes for Heads
app.get('/api/heads', async (req, res) => {
  const heads = await Head.find();
  res.status(200).send(heads);
});

app.post('/api/heads', async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  try {
    const head = new Head(req.body);
    await head.save();
    console.log('Saved Head:', head); // Log the saved document
    res.status(201).send(head);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/heads/:sn', async (req, res) => {
  const sn = req.params.sn;
  const updatedHead = req.body;
  const head = await Head.findOneAndUpdate({ sn }, updatedHead, { new: true });
  if (head) {
    res.status(200).send(head);
  } else {
    res.status(404).send({ message: 'Head not found' });
  }
});

app.delete('/api/heads/:sn', async (req, res) => {
  const sn = req.params.sn;
  const result = await Head.deleteOne({ sn });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: 'Head deleted' });
  } else {
    res.status(404).send({ message: 'Head not found' });
  }
});

// Routes for Accounts
app.get('/api/accounts', async (req, res) => {
  const accounts = await Account.find();
  res.status(200).send(accounts);
});

app.post('/api/accounts', async (req, res) => {
  const account = new Account(req.body);
  await account.save();
  res.status(201).send(account);
});

app.put('/api/accounts/:sn', async (req, res) => {
  const sn = req.params.sn;
  const updatedAccount = req.body;
  const account = await Account.findOneAndUpdate({ sn }, updatedAccount, { new: true });
  if (account) {
    res.status(200).send(account);
  } else {
    res.status(404).send({ message: 'Account not found' });
  }
});

app.delete('/api/accounts/:sn', async (req, res) => {
  const sn = req.params.sn;
  const result = await Account.deleteOne({ sn });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: 'Account deleted' });
  } else {
    res.status(404).send({ message: 'Account not found' });
  }
});

// Routes for Work Entries
app.get('/api/work-entries', async (req, res) => {
  const workEntries = await WorkEntry.find();
  res.status(200).send(workEntries);
});

app.post('/api/work-entries', async (req, res) => {
  const workEntry = new WorkEntry(req.body);
  await workEntry.save();
  res.status(201).send(workEntry);
});

app.put('/api/work-entries/:id', async (req, res) => {
  const id = req.params.id;
  const updatedWorkEntry = req.body;
  const workEntry = await WorkEntry.findOneAndUpdate({ id }, updatedWorkEntry, { new: true });
  if (workEntry) {
    res.status(200).send(workEntry);
  } else {
    res.status(404).send({ message: 'Work entry not found' });
  }
});

app.delete('/api/work-entries/:id', async (req, res) => {
  const id = req.params.id;
  const result = await WorkEntry.deleteOne({ id });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: 'Work entry deleted' });
  } else {
    res.status(404).send({ message: 'Work entry not found' });
  }
});

// Routes for Payments
app.get('/api/payments', async (req, res) => {
  const payments = await Payment.find();
  res.status(200).send(payments);
});

app.post('/api/payments', async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).send(payment);
});

app.put('/api/payments/:id', async (req, res) => {
  const id = req.params.id;
  const updatedPayment = req.body;
  const payment = await Payment.findOneAndUpdate({ id }, updatedPayment, { new: true });
  if (payment) {
    res.status(200).send(payment);
  } else {
    res.status(404).send({ message: 'Payment not found' });
  }
});

app.delete('/api/payments/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Payment.deleteOne({ id });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: 'Payment deleted' });
  } else {
    res.status(404).send({ message: 'Payment not found' });
  }
});

// Routes for Receives
app.get('/api/receives', async (req, res) => {
  const receives = await Receive.find();
  res.status(200).send(receives);
});

app.post('/api/receives', async (req, res) => {
  const receive = new Receive(req.body);
  await receive.save();
  res.status(201).send(receive);
});

app.put('/api/receives/:id', async (req, res) => {
  const id = req.params.id;
  const updatedReceive = req.body;
  const receive = await Receive.findOneAndUpdate({ id }, updatedReceive, { new: true });
  if (receive) {
    res.status(200).send(receive);
  } else {
    res.status(404).send({ message: 'Receive not found' });
  }
});

app.delete('/api/receives/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Receive.deleteOne({ id });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: 'Receive deleted' });
  } else {
    res.status(404).send({ message: 'Receive not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



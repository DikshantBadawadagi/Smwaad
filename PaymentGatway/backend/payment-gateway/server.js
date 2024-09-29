// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Load transactions from JSON file
const loadTransactions = () => {
    if (fs.existsSync('transactions.json')) {
        return JSON.parse(fs.readFileSync('transactions.json'));
    }
    return [];
};

// Save transactions to JSON file
const saveTransactions = (transactions) => {
    fs.writeFileSync('transactions.json', JSON.stringify(transactions, null, 2));
};

// Endpoint to create a new transaction
app.post('/api/transactions', (req, res) => {
    const { id, amount, plan, status } = req.body;

    if (!id || !amount || !plan) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const transactions = loadTransactions();
    transactions.push({ id, amount, plan, status });
    saveTransactions(transactions);

    return res.status(201).json({ message: 'Transaction created', id });
});

// Endpoint to get all transactions
app.get('/api/transactions', (req, res) => {
    const transactions = loadTransactions();
    res.json(transactions);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

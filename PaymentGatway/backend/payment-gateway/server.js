const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const razorpayInstance = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_SECRET', // Replace with your Razorpay Secret Key
});

// Create an order for payment
app.post('/api/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const order = await razorpayInstance.orders.create({
            amount: amount * 100, // Razorpay expects the amount in paise
            currency: currency,
            receipt: receipt,
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify payment signature
app.post('/api/verify-signature', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', 'YOUR_RAZORPAY_SECRET')
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.json({ status: 'Payment Successful' });
    } else {
        res.status(400).json({ status: 'Payment Failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

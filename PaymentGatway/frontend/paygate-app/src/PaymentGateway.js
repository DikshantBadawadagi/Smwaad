import { useState } from 'react';
import Button from './components/ui/button';
import Input from './components/ui/input';
import Label from './components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/ui/card';
import { CheckIcon, HandIcon } from 'lucide-react';

export default function PaymentGateway() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [upiId, setUpiId] = useState(''); // State for UPI ID
  const [userName, setUserName] = useState(''); // State for User Name

  const plans = [
    { id: 'basic', name: 'Basic', price: 999, color: 'bg-blue-100', features: ['100 signs', 'Basic tutorials', 'Community forum'] },
    { id: 'pro', name: 'Pro', price: 1999, color: 'bg-purple-100', features: ['500 signs', 'Advanced tutorials', 'Live chat support', 'Practice exercises'] },
    { id: 'premium', name: 'Premium', price: 2999, color: 'bg-pink-100', features: ['Unlimited signs', 'Expert tutorials', '24/7 video support', 'Personalized learning path'] },
  ];

  // Generate the UPI payment link dynamically based on the selected plan
  const generateUPILink = async () => {
    const selected = plans.find(plan => plan.id === selectedPlan);

    // Validate input fields
    // if (!userName || !upiId) {
    //   alert('Please enter your name and UPI ID.');
    //   return;
    // }

    // Create a transaction object
    const transaction = {
      id: `TX${Date.now()}`, // Unique transaction ID
      amount: selected.price,
      plan: selected.name,
      status: 'Pending', // Initial status
      user: userName // Include user name
    };

    try {
      // Store transaction details in backend
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Failed to store transaction');
      }

      // Generate UPI link
      const upiLink = `upi://pay?pa=${upiId}&pn=AyushHirenKarani&am=${selected.price / 100}&cu=INR&tid=${transaction.id}&tn=${selected.name}%20Plan%20Subscription`;
      window.location.href = upiLink;
    } catch (error) {
      console.error('Error storing transaction:', error);
      alert('There was an error processing your payment. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-12">
        <HandIcon className="inline-block w-16 h-16 text-blue-500 mb-4" />
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Choose Your Sign Language Learning Plan</h1>
        <p className="text-lg text-blue-600">Unlock a world of communication with our interactive courses</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`${plan.color} border-2 transition-all duration-300 ${selectedPlan === plan.id ? 'border-blue-500 shadow-lg scale-105' : 'border-transparent'}`}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800">{plan.name}</CardTitle>
              <CardDescription className="text-xl font-semibold text-blue-600">₹{plan.price / 100}/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-blue-700">
                    <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => setSelectedPlan(plan.id)}
                variant={selectedPlan === plan.id ? 'default' : 'outline'}
                className={`w-full text-lg ${selectedPlan === plan.id ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white text-blue-500 hover:bg-blue-50'}`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
        <CardHeader className="bg-blue-500 text-white">
          <CardTitle className="text-2xl">Payment Details</CardTitle>
          <CardDescription className="text-blue-100">Enter your payment information securely</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-blue-700">Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="border-blue-300 focus:border-blue-500" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)} // Update state on change
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="upi-id" className="text-blue-700">UPI ID</Label>
                <Input 
                  id="upi-id" 
                  placeholder="example@upi" 
                  className="border-blue-300 focus:border-blue-500" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)} // Update state on change
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-lg" onClick={generateUPILink}>Pay via UPI</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-blue-600">
          Need help? Contact our support team using video chat for sign language assistance.
        </p>
      </div>
    </div>
  );
}

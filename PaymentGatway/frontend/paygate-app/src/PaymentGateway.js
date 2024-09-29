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
  const [userName, setUserName] = useState(''); // User's Name
  const plans = [
    { id: 'basic', name: 'Basic', price: 999, color: 'bg-blue-100', features: ['100 signs', 'Basic tutorials', 'Community forum'] },
    { id: 'pro', name: 'Pro', price: 1999, color: 'bg-purple-100', features: ['500 signs', 'Advanced tutorials', 'Live chat support', 'Practice exercises'] },
    { id: 'premium', name: 'Premium', price: 2999, color: 'bg-pink-100', features: ['Unlimited signs', 'Expert tutorials', '24/7 video support', 'Personalized learning path'] },
  ];

  const selected = plans.find((plan) => plan.id === selectedPlan);

  // Razorpay Payment Integration
  const handlePayment = () => {
    console.log('User Name:', userName); // Debugging: check what the value is

    if (!userName.trim()) {
      alert("Please enter your name before proceeding.");
      return;
    }

    const options = {
      key: 'rzp_test_tGBLVAVKSiCDkL', // Replace with your Razorpay Key ID
      amount: selected.price, // Amount is in paise (i.e., 100 = ₹1)
      currency: 'INR',
      name: 'Sign Language Learning',
      description: `${selected.name} Plan Subscription`,
      image: 'https://example.com/logo.png', // Add your logo here
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // You can handle post-payment actions here, like saving the transaction to the database
      },
      prefill: {
        name: userName,
        email: 'user@example.com', // Add user email if needed
        contact: '9999999999', // Add user contact if needed
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
          <CardDescription className="text-blue-100">Enter your name to proceed with payment</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-blue-700">Name</Label>
                <input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="name"
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-lg"
            onClick={handlePayment}
          >
            Pay ₹{selected.price / 100} via Razorpay
          </Button>
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

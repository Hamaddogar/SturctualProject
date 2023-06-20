
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = 'ACcd9de0a43d678f45dea9d091017eb722';
const authToken = '71049d3ba9aad8edb11008c48cbf2134';
const client = require('twilio')(accountSid, authToken);

router.post('/', async (req, res) => {
    try {
      // Generate the OTP code
      const otp = generateOTP();
  
      // Send WhatsApp message with the OTP code
      await client.messages.create({
        from: 'whatsapp:+14155238886',
          to: 'whatsapp:+923060647571',
        body: `Your OTP code is: ${otp}`,
      });
  
      res.json({ otp });
    } catch (error) {
      console.log('Error generating OTP:', error);
      res.status(500).json({ error: 'Error generating OTP' });
    }
  });
  
  // Function to generate OTP code
  function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
   module.exports=router
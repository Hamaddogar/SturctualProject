

app.post('/generate-otp', async (req, res) => {
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
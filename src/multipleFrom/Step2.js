import React, { useState } from 'react';
import axios from 'axios';
import { generateOTP } from './utiltlies/genrateOTP';
import {
  Button,
  Typography,
  TextField,
  Container,
  Box,
} from '@mui/material';

export default function OTPGenerator() {
  const [otpCode, setOTPCode] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleGenerateOTP = async () => {
    const generatedOTP = await generateOTP();
    if (generatedOTP) {
      setOTPCode(generatedOTP);
      setIsConfirmed(false);
    }
  };

  const handleConfirmOTP = () => {
    if (confirmationCode === otpCode) {
      setIsConfirmed(true);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      {isConfirmed ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h5">OTP Confirmed!</Typography>
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <Button variant="contained" onClick={handleGenerateOTP}>
            Generate OTP
          </Button>
          {otpCode && (
            <Box mt={2}>
              <Typography variant="body1">
              
              </Typography>
              <TextField
                type="text"
                placeholder="Enter OTP"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <br/>
              <Button
                variant="contained"
                onClick={handleConfirmOTP}
                disabled={!confirmationCode}
              >
                Confirm OTP
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}

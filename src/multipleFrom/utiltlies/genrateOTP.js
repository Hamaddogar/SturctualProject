import axios from 'axios';

export const generateOTP = async () => {
  try {
    const response = await axios.post('http://localhost:8080/generate-otp');
    return response.data.otp;
  } catch (error) {
    console.log('Error generating OTP:', error);
    return null;
  }
};

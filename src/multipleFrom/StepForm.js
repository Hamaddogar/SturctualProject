import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
 import Step1From from '../multipleFrom/Step1From'
 import Step2 from '../multipleFrom/Step2'

const steps = ['Step 1: Select campaign settings', 'Step 2: Create an ad group', 'Step 3: Create an ad'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setUserId('');
    setOtp('');
    setPaymentMethod('');
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
           <Step1From/>
        );
      case 1:
        return (
            <Step2/>
        );
      case 2:
        return (
          <TextField
            label="Payment Method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            fullWidth
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" sx={{ mb: 2 }}>
              All steps completed - you're finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {isStepOptional(activeStep) && (
                <Button onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

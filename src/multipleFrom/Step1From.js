import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { TextField, Button ,CircularProgress} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { saveFormDataRequest, saveFormDataSuccess, saveFormDataFailure } from '../RTK/Reducers/formSlice';
import { saveFormData } from './utiltlies/apiServices';
import { useDispatch, useSelector } from 'react-redux';
const MyForm = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage,formData2 ,loading} = useSelector((state) => state.form);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    passportNumber: '',
    age: '',
    address: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(saveFormDataRequest());
     console.log(formData)

    try {
      const response = await saveFormData(formData);

      dispatch(saveFormDataSuccess(response));
      setFormData({
        name: '',
        fatherName: '',
        passportNumber: '',
        age: '',
        address: '',
        dateOfBirth: '',
      });
    } catch (error) {
      dispatch(saveFormDataFailure(error.message));
    }
  };

  return (
     <div>


    <form   onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="fatherName"
        label="Father's Name"
        value={formData.fatherName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="passportNumber"
        label="Passport Number"
        value={formData.passportNumber}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="age"
        label="Age"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="dateOfBirth"
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>

    {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {successMessage && (
            <h2>
              Success: {formData2.name}, {formData2.fatherName}, {formData2.passportNumber}, {formData2.age}, {formData2.address}, {formData2.dateOfBirth}
            </h2>
          )}
          {errorMessage && <h2>Error: {errorMessage}</h2>}
        </div>
      )}

 
    </div>
  );
};

export default MyForm;

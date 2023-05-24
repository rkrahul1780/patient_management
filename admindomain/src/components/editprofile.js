import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { editProfile } from '../actions';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    phoneNumber: '',
    dob: '',
    state: '',
    country: '',
    height: '',
    weight: '',
    aadharNo: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.height.trim()) {
      newErrors.height = 'Height is required';
    } else if (!/^\d+$/.test(formData.height)) {
      newErrors.height = 'Invalid height';
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (!/^\d+$/.test(formData.weight)) {
      newErrors.weight = 'Invalid weight';
    }

    if (formData.aadharNo.trim() === '') {
      newErrors.aadharNo = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar number should be 12 digits';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d+$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form or dispatch an action
      dispatch(editProfile(formData,navigate));
      console.log('Form submitted');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          isInvalid={!!errors.phoneNumber}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phoneNumber}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="dob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          isInvalid={!!errors.dob}
        />
        <Form.Control.Feedback type="invalid">
          {errors.dob}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          isInvalid={!!errors.state}
        />
        <Form.Control.Feedback type="invalid">
          {errors.state}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          isInvalid={!!errors.country}
        />
        <Form.Control.Feedback type="invalid">
          {errors.country}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="height">
        <Form.Label>Height (CM)</Form.Label>
        <Form.Control
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          isInvalid={!!errors.height}
        />
        <Form.Control.Feedback type="invalid">
          {errors.height}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="weight">
        <Form.Label>Weight (KG)</Form.Label>
        <Form.Control
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          isInvalid={!!errors.weight}
        />
        <Form.Control.Feedback type="invalid">
          {errors.weight}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="aadharNo">
        <Form.Label>Aadhar Number</Form.Label>
        <Form.Control
          type="text"
          name="aadharNo"
          value={formData.aadharNo}
          onChange={handleChange}
          isInvalid={!!errors.aadharNo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.aadharNo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="pincode">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          isInvalid={!!errors.pincode}
        />
        <Form.Control.Feedback type="invalid">
          {errors.pincode}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ProfileForm;

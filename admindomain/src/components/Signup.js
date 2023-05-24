import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignupForm.css'; // Import the CSS file
import { useDispatch } from 'react-redux';
import { signup } from '../actions';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    aadharNo: '',
    dob: '',
    address: '',
    pinCode: '',
    country: '',
    state: '',
    blood: '',
    height: '',
    weight: '',
    gender: '',
  });
  const [formErrors, setFormErrors] = useState({
    nameError: '',
    emailError: '',
    phoneNumberError: '',
    passwordError: '',
    aadharNoError: '',
    dobError: '',
    addressError: '',
    pinCodeError: '',
    countryError: '',
    stateError: '',
    bloodError: '',
    heightError: '',
    weightError: '',
    genderError: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    let isValid = true;
    const errors = {
      nameError: '',
      emailError: '',
      phoneNumberError: '',
      passwordError: '',
      aadharNoError: '',
      dobError: '',
      addressError: '',
      pinCodeError: '',
      countryError: '',
      stateError: '',
      bloodError: '',
      heightError: '',
      weightError: '',
      genderError: '',
    };

    if (formData.name.trim() === '') {
      errors.nameError = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.nameError = 'Name should only contain alphabets';
      isValid = false;
    }

    if (formData.email.trim() === '') {
      errors.emailError = 'Email is required';
      isValid = false;
    }

    if (formData.phoneNumber.trim() === '') {
      errors.phoneNumberError = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumberError = 'Phone number should be 10 digits';
      isValid = false;
    }

    if (formData.password.trim() === '') {
      errors.passwordError = 'Password is required';
      isValid = false;
    }
    if (formData.aadharNo.trim() === '') {
      errors.aadharNoError = 'Aadhar number is required';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      errors.aadharNoError = 'Aadhar number should be 12 digits';
      isValid = false;
    }

    if (formData.dob.trim() === '') {
      errors.dobError = 'Date of Birth is required';
      isValid = false;
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(formData.dob);
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      if (age < 1) {
        errors.dobError = 'You must be at least 1 years old';
        isValid = false;
      }
    }

    if (formData.address.trim() === '') {
      errors.addressError = 'Address is required';
      isValid = false;
    }

    if (formData.pinCode.trim() === '') {
      errors.pinCodeError = 'PIN code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      errors.pinCodeError = 'PIN code should be 6 digits';
      isValid = false;
    }

    if (formData.country.trim() === '') {
      errors.countryError = 'Country is required';
      isValid = false;
    }

    if (formData.state.trim() === '') {
      errors.stateError = 'State is required';
      isValid = false;
    }

    if (formData.height.trim() === '') {
      errors.heightError = 'Height is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.height)) {
      errors.heightError = 'Height should be a number';
      isValid = false;
    }

    if (formData.weight.trim() === '') {
      errors.weightError = 'Weight is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.weight)) {
      errors.weightError = 'Weight should be a number';
      isValid = false;
    }

    if (formData.gender.trim() === '') {
      errors.genderError = 'Gender is required';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    // Validation passed, proceed with form submission or data handling logic here
    setIsSubmitting(true);
    dispatch(signup(formData));
    console.log(formData);

    // Simulating async request with setTimeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset the form
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        aadharNo: '',
        dob: '',
        address: '',
        pinCode: '',
        country: '',
        state: '',
        blood: '',
        height: '',
        weight: '',
        gender: '',
      });
      setFormErrors({
        nameError: '',
        emailError: '',
        phoneNumberError: '',
        passwordError: '',
        aadharNoError: '',
        dobError: '',
        addressError: '',
        pinCodeError: '',
        countryError: '',
        stateError: '',
        bloodError: '',
        heightError: '',
        weightError: '',
        genderError: '',
      });
    }, 2000);
  };

  return (
    <div className="containerssss">
      <h1 className="mt-4">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.nameError && (
            <div className="error-message">{formErrors.nameError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.emailError && (
            <div className="error-message">{formErrors.emailError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {formErrors.phoneNumberError && (
            <div className="text-danger">{formErrors.phoneNumberError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.passwordError && (
            <div className="text-danger">{formErrors.passwordError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="aadharNo" className="form-label">
            Aadhar Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            required
          />
          {formErrors.aadharNoError && (
            <div className="text-danger">{formErrors.aadharNoError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {formErrors.dobError && (
            <div className="text-danger">{formErrors.dobError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.addressError && (
            <div className="text-danger">{formErrors.addressError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="pinCode" className="form-label">
            PIN Code:
          </label>
          <input
            type="text"
            className="form-control"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
          {formErrors.pinCodeError && (
            <div className="text-danger">{formErrors.pinCodeError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country:
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          {formErrors.countryError && (
            <div className="text-danger">{formErrors.countryError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State:
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          {formErrors.stateError && (
            <div className="text-danger">{formErrors.stateError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Height(cm):
          </label>
          <input
            type="text"
            className="form-control"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
          {formErrors.heightError && (
            <div className="text-danger">{formErrors.heightError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Weight(kg):
          </label>
          <input
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          {formErrors.weightError && (
            <div className="text-danger">{formErrors.weightError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="blood" className="form-label">
            Blood Group:
          </label>
          <select
            className="form-select"
            id="blood"
            name="blood"
            value={formData.blood}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+ve">A+ve</option>
            <option value="A-ve">A-ve</option>
            <option value="B+ve">B+ve</option>
            <option value="B-ve">B-ve</option>
            <option value="AB-ve">AB-ve</option>
            <option value="AB+ve">AB+ve</option>
            <option value="O+ve">O+ve</option>
            <option value="O-ve">O-ve</option>
          </select>
          {formErrors.bloodError && (
            <div className="text-danger">{formErrors.bloodError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.genderError && (
            <div className="text-danger">{formErrors.genderError}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !formData.email || !formData.password}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

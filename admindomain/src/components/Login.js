import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { login } from '../actions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    emailError: '',
    passwordError: '',
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
      emailError: '',
      passwordError: '',
    };

    if (formData.email.trim() === '') {
      errors.emailError = 'Email is required';
      isValid = false;
    }

    if (formData.password.trim() === '') {
      errors.passwordError = 'Password is required';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    // Validation passed, proceed with form submission or data handling logic here
    setIsSubmitting(true);
    console.log(formData);
    dispatch(login(formData, navigate));
    // Simulating async request with setTimeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset the form
      setFormData({
        email: '',
        password: '',
      });
      setFormErrors({
        emailError: '',
        passwordError: '',
      });
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Login</h1>
      <form onSubmit={handleSubmit}>
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
            <div className="text-danger">{formErrors.emailError}</div>
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
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !formData.email || !formData.password}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

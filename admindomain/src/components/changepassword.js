import React, { useState } from 'react';
import { changepassword } from '../actions';
import { useDispatch } from 'react-redux';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const errors = {};
    if (!formData.oldPassword) {
      errors.oldPassword = 'Please enter your old password';
    }
    if (!formData.newPassword) {
      errors.newPassword = 'Please enter a new password';
    }
    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword =
        'New password and confirm password do not match';
    }
    setFormErrors(errors);

    // If there are no errors, handle form submission
    if (Object.keys(errors).length === 0) {
      // Process form data
      dispatch(changepassword(formData));
      console.log('Form submitted:', formData);
      // Reset the form
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label style={{ marginBottom: '0.5rem' }}>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            style={{ marginBottom: '0.5rem', padding: '0.3rem' }}
          />
          {formErrors.oldPassword && (
            <span style={{ color: 'red' }}>{formErrors.oldPassword}</span>
          )}
        </div>
        <div>
          <label style={{ marginBottom: '0.5rem' }}>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            style={{ marginBottom: '0.5rem', padding: '0.3rem' }}
          />
          {formErrors.newPassword && (
            <span style={{ color: 'red' }}>{formErrors.newPassword}</span>
          )}
        </div>
        <div>
          <label style={{ marginBottom: '0.5rem' }}>
            Confirm New Password:
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleInputChange}
            style={{ marginBottom: '0.5rem', padding: '0.3rem' }}
          />
          {formErrors.confirmNewPassword && (
            <span style={{ color: 'red' }}>
              {formErrors.confirmNewPassword}
            </span>
          )}
        </div>
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;

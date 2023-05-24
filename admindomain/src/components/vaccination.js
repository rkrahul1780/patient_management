import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVaccination, getAllHospital, getAllVaccine } from '../actions';
import { useNavigate } from 'react-router-dom';
import './VaccineForm.css'; // Import CSS file
import Web3 from 'web3';

const VaccineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vaccine_details, hospital_details } = useSelector(
    (state) => state.Reducer
  );
  useEffect(() => {
    dispatch(getAllVaccine());
    dispatch(getAllHospital());
  }, []);

  const [formData, setFormData] = useState({
    vaccine: '',
    datetime: '',
    hospital: '',
    payment: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const hospitalData = hospital_details?.map((data, index) => {
    return (
      <option value={data.hospitalName} key={index}>
        {data.hospitalName}
      </option>
    );
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    const errors = {};
    if (!formData.vaccine) {
      errors.vaccine = 'Please select a vaccine';
    }
    if (!formData.datetime) {
      errors.datetime = 'Please select a date and time';
    }
    setFormErrors(errors);

    // If there are no errors, handle form submission
    if (Object.keys(errors).length === 0) {
      // Process form data
      console.log('Form submitted:', formData);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      const tokenAddress = '0x72d46adf628719E83c67D1a3b91743f382355308';

      const toWei = async (web3, amount, decimals) => {
        return await web3.utils.toWei(
          parseFloat(amount).toFixed(decimals).toString(),
          'ether'
        );
      };

      const getGasPrice = async (web3) => {
        const gasPrice = await web3.eth.getGasPrice();
        return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
      };

      const AmountInWei = await toWei(web3, 0.001, 18);
      console.log('AmountInWei', AmountInWei);
      const GetGasPricesss = await getGasPrice(web3);
      const result = await web3.eth.sendTransaction({
        from: accounts[0],
        to: tokenAddress,
        value: AmountInWei,
        GetGasPricesss,
      });
      console.log('result', result);
      if (result) {
        formData.payment = result;
        dispatch(createVaccination(formData, navigate));
      } else {
        console.log('error');
      }
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
    <div className="vaccine-form-container">
      <h1>Vaccine Appointment Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Select Vaccine:</label>
          <select
            name="vaccine"
            value={formData.vaccine}
            onChange={handleInputChange}
          >
            <option value="">Select a vaccine</option>
            {vaccine_details.map((vaccine) => (
              <option key={vaccine._id} value={vaccine.name}>
                {vaccine.name}
              </option>
            ))}
          </select>
          {formErrors.vaccine && (
            <span className="error">{formErrors.vaccine}</span>
          )}
        </div>
        <div>
          <label>Choose Hospital:</label>
          <select
            name="hospital"
            value={formData.hospital}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Hospital</option>
            {hospitalData}
          </select>
        </div>
        <div>
          <label>Select Date and Time:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleInputChange}
            // min="1000-01-01T09:00"
            // max="9000-01-01T17:00"
          />
          {formErrors.datetime && (
            <span className="error">{formErrors.datetime}</span>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VaccineForm;

import React, { useState, useEffect } from 'react';
import {
  createConsultation,
  getAllDepartment,
  getAllDoctor,
  getAllHospital,
  getConsultation,
} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './Consultation.css'; // Import CSS file
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Consultation = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    hospital_details,
    doctor_details,
    department_details,
    get_consultation_details,
  } = useSelector((state) => state.Reducer);
  console.log('consultation_details', get_consultation_details);

  useEffect(() => {
    dispatch(getAllHospital());
    dispatch(getAllDepartment());
    dispatch(getAllDoctor());
    dispatch(getConsultation());
  }, []);

  useEffect(() => {
    if (selectedDepartment && selectedHospital) {
      const doctors = doctor_details.filter(
        (doctor) =>
          doctor.department_details[0].departmentName === selectedDepartment &&
          doctor.hospital_details[0].hospitalName === selectedHospital
      );
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDepartment, selectedHospital, doctor_details]);

  const hospitalData = hospital_details?.map((data, index) => (
    <option value={data.hospitalName} key={index}>
      {data.hospitalName}
    </option>
  ));

  const departmentData = department_details?.map((data, index) => (
    <option value={data.departmentName} key={index}>
      {data.departmentName}
    </option>
  ));

  const doctorData = filteredDoctors?.map((data, index) => (
    <option value={data.doctorName} key={index}>
      {data.doctorName}
    </option>
  ));

  const [formData, setFormData] = useState({
    date: '',
    hospital: '',
    department: '',
    doctor: '',
    time: '',
    payment: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (
      !formData.date ||
      !formData.hospital ||
      !formData.department ||
      !formData.doctor ||
      !formData.time
    ) {
      alert('Please fill in all the fields');
      return;
    }
    const existingAppointment = get_consultation_details?.find((doctor) => {
      console.log('old date', formData.date);
      const date = new Date(doctor.date).toISOString().split('T')[0];
      console.log('doctor', date);
      return (
        doctor.doctor_details[0].doctorName === formData.doctor &&
        date === formData.date &&
        doctor.time === formData.time
      );
    });
    console.log('first', existingAppointment);

    if (existingAppointment) {
      alert('Doctor already has an appointment at the selected date and time');
      return;
    } else {
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
        dispatch(createConsultation(formData, navigate));
      } else {
        console.log('error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setSelectedDepartment(value);
    } else if (name === 'hospital') {
      setSelectedHospital(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="consultation-container">
      <h1>Doctor's Appointment Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Choose Hospital:</label>
          <select
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
          >
            <option value="">Select Hospital</option>
            {hospitalData}
          </select>
        </div>
        <div>
          <label>Choose Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departmentData}
          </select>
        </div>
        <div>
          <label>Choose Doctor:</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctorData}
          </select>
        </div>
        <div>
          <label>Time:</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select Time</option>
            <option value="9:00am-10:00am">9:00am - 10:00am</option>
            <option value="10:00am-11:00am">10:00am - 11:00am</option>
            <option value="11:00am-12:00pm">11:00am - 12:00pm</option>
            <option value="12:00pm-1:00pm">12:00pm - 1:00pm</option>
            <option value="2:00pm-3:00pm">2:00pm - 3:00pm</option>
            <option value="3:00pm-4:00pm">3:00pm - 4:00pm</option>
            <option value="4:00pm-5:00pm">4:00pm - 5:00pm</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <div>
        <Link
          type="button"
          className="btn btn-info back-btn"
          to={'/consultation'}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default Consultation;

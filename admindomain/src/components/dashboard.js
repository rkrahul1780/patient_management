import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  getAllConsultation,
  getAllVaccination,
  getConsultation,
  getVaccination,
} from '../actions';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const Role = localStorage.getItem('Role');
  useEffect(() => {
    if (Role === 'Admin') {
      dispatch(getConsultation());
      dispatch(getVaccination());
    } else {
      dispatch(getAllConsultation());
      dispatch(getAllVaccination());
    }
  }, [Role, dispatch]);

  const { consultation_details, vaccination_details } = useSelector(
    (state) => state.Reducer
  );
  const numberOfConsultations = consultation_details.length;
  const totalPayment = consultation_details.length + vaccination_details.length;
  const vaccinationsTaken = vaccination_details.length;

  // Line chart data
  const chartData = {
    labels: ['Consultations', 'Payments', 'Vaccinations'],
    datasets: [
      {
        label: 'Metrics',
        data: [numberOfConsultations, totalPayment, vaccinationsTaken],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Line chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Metrics',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      {/* <Line data={chartData} options={chartOptions} /> */}
      <div className="dashboard-metric">
        <h2 className="dashboard-metric-title">Number of Consultations</h2>
        <h2 className="dashboard-metric-value">{numberOfConsultations}</h2>
      </div>
      <div className="dashboard-metric">
        <h2 className="dashboard-metric-title">Total Payment</h2>
        <h2 className="dashboard-metric-value">{totalPayment}</h2>
      </div>
      <div className="dashboard-metric">
        <h2 className="dashboard-metric-title">Vaccinations Taken</h2>
        <h2 className="dashboard-metric-value">{vaccinationsTaken}</h2>
      </div>
    </div>
  );
};

export default Dashboard;

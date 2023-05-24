import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyconsultationcertificate } from '../actions';

const ConsultationCertificateForm = () => {
  const dispatch = useDispatch();
  const [certificateNumber, setCertificateNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('first', certificateNumber);
    dispatch(verifyconsultationcertificate(certificateNumber));
  };

  return (
    <div>
      <h2>Verify Consultation Certificate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter certificate number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConsultationCertificateForm;

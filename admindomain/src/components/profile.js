import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDisease, getProfile } from '../actions';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const { profile_details } = useSelector((state) => state.Reducer);

  const formatDate = (value) => {
    if (!value) return '';
    try {
      return new Date(value).toISOString().split('T')[0];
    } catch (error) {
      console.error('Invalid date:', error);
      return '';
    }
  };

  const dateOfBirth = formatDate(profile_details?.profiledata?.dob);

  const [diseaseName, setDiseaseName] = useState('');
  const [startedDate, setStartedDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  const handleAddDisease = () => {
    if (!diseaseName || !startedDate || !remarks) {
      setError('Please fill in all required fields.');
      return;
    }

    const newDisease = {
      diseaseName: diseaseName,
      startedDate: startedDate,
      remarks: remarks,
    };

    dispatch(createDisease(newDisease));
    setDiseaseName('');
    setStartedDate('');
    setRemarks('');
    setError('');
    window.location.reload();
  };

  const renderDiseases = () => {
    if (
      !profile_details?.diseasedata ||
      profile_details?.diseasedata.length === 0
    ) {
      return (
        <Card.Text className="medical-card-text">
          No diseases recorded.
        </Card.Text>
      );
    }
    return (
      <div>
        {profile_details.diseasedata.map((disease, index) => (
          <div key={index} className="disease-item">
            <Card.Title className="disease-name">
              Disease Name: {disease.diseaseName}
            </Card.Title>
            <Card.Text className="disease-info">
              Started Date: {formatDate(disease.startedDate)}
            </Card.Text>
            <Card.Text className="disease-info">
              Remarks: {disease.remarks}
            </Card.Text>
          </div>
        ))}
      </div>
    );
  };

  // const handleEditProfile = () => {
  //   // Implement your edit profile functionality here
  //   // This function will be called when the Edit button is clicked
  //   console.log('Edit profile clicked');
  // };

  return (
    <div className="container">
      <div className="profile-container">
        <div>
          <Link type="button" className="btn btn-info" to={'/profile/edit'}>
            Edit
          </Link>
        </div>
        <Card className="profile-card">
          <Card.Body>
            <Card.Title className="medical-card-title">
              BASIC INFORMATION
            </Card.Title>
            <Card.Text className="profile-card-text">
              Name: {profile_details?.profiledata?.name}
            </Card.Text>
            <Card.Text className="profile-card-text">
              Address: {profile_details?.profiledata?.address}
            </Card.Text>
            <Card.Text className="profile-card-text">
              Phone Number: {profile_details?.profiledata?.phoneNumber}
            </Card.Text>
            <Card.Text className="profile-card-text">
              Date of Birth: {dateOfBirth}
            </Card.Text>
            <Card.Text className="profile-card-text">
              State: {profile_details?.profiledata?.state}
            </Card.Text>
            <Card.Text className="profile-card-text">
              Country: {profile_details?.profiledata?.country}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="medical-card">
          <Card.Body>
            <Card.Title className="medical-card-title">
              MEDICAL INFORMATION
            </Card.Title>
            <Card.Text className="medical-card-text">
              BLOOD GROUP: {profile_details?.medicalDetailsdata?.blood}
            </Card.Text>
            <Card.Text className="medical-card-text">
              Height (CM): {profile_details?.medicalDetailsdata?.height}
            </Card.Text>
            <Card.Text className="medical-card-text">
              Weight (KG): {profile_details?.medicalDetailsdata?.weight}
            </Card.Text>
            <Card.Text className="medical-card-text">
              GENDER: {profile_details?.medicalDetailsdata?.gender}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="medical-card">
          <Card.Body>
            <Card.Title className="medical-card-title">DISEASES</Card.Title>
            {renderDiseases()}
            <hr />
            <Card.Title className="medical-card-title">Add Disease</Card.Title>
            <Card.Text className="medical-card-text">
              <label htmlFor="diseaseName">Disease Name:</label>
              <input
                type="text"
                id="diseaseName"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
              />
            </Card.Text>
            <Card.Text className="medical-card-text">
              <label htmlFor="startedDate">Started Date:</label>
              <input
                type="date"
                id="startedDate"
                value={startedDate}
                onChange={(e) => setStartedDate(e.target.value)}
              />
            </Card.Text>
            <Card.Text className="medical-card-text">
              <label htmlFor="remarks">Remarks:</label>
              <textarea
                id="remarks"
                rows="3"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </Card.Text>
            {error && <p className="error-message">{error}</p>}
            <Button variant="primary" onClick={handleAddDisease}>
              Add Disease
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

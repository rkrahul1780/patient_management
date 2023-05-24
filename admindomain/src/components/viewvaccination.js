import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewvaccination } from '../actions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './viewconsultation.css'; // Import CSS file

const Vacccinationinfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewvaccination(id));
  }, [dispatch, id]);

  const { view_vaccination_details } = useSelector((state) => state.Reducer);
  console.log('view_vaccination_details', view_vaccination_details.data1);

  const viewbyid = () => {
    return (
      <div className="data-info">
        <div className="row">
          <label>Date:</label>
          <span>{view_vaccination_details?.data1?.date}</span>
        </div>
        <div className="row">
          <label>Vaccine Name:</label>
          <span>{view_vaccination_details?.vaccinedata?.name}</span>
        </div>
        <div className="row">
          <label>Hospital Name:</label>
          <span>{view_vaccination_details?.hospitaldata?.hospitalName}</span>
        </div>
        <div>
          <Link type="button" className="btn btn-info" to={'/vaccination'}>
            Back
          </Link>
        </div>
      </div>
    );
  };

  return <div>{viewbyid()}</div>;
};

export default Vacccinationinfo;

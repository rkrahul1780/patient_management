import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewconsultation } from '../actions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './viewconsultation.css'; // Import CSS file

const Consultationinfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewconsultation(id));
  }, [dispatch, id]);

  const { view_consultation_details } = useSelector((state) => state.Reducer);
  console.log('view_consultation_details', view_consultation_details.data1);

  const viewbyid = () => {
    return (
      <div className="data-info">
        <div className="row">
          <label>Date:</label>
          <span>{view_consultation_details?.data1?.date}</span>
        </div>
        <div className="row">
          <label>Time:</label>
          <span>{view_consultation_details?.data1?.time}</span>
        </div>
        <div className="row">
          <label>Doctor Name:</label>
          <span>{view_consultation_details?.doctordata?.doctorName}</span>
        </div>
        <div className="row">
          <label>Department Name:</label>
          <span>
            {view_consultation_details?.departmentdata?.departmentName}
          </span>
        </div>
        <div className="row">
          <label>Hospital Name:</label>
          <span>{view_consultation_details?.hospitaldata?.hospitalName}</span>
        </div>
        <div>
          <Link type="button" className="btn btn-info" to={'/consultation'}>
            Back
          </Link>
        </div>
      </div>
    );
  };

  return <div>{viewbyid()}</div>;
};

export default Consultationinfo;

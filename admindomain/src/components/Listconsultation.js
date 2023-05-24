import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConsultation,
  getConsultation,
  getPatientByID,
  setconsultationCertificate,
  viewconsultation,
} from '../actions';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import './listconsultation.css';
import { IconButton } from '@material-ui/core';
import { Visibility, Description } from '@material-ui/icons';
import Web3 from 'web3';
import wrappedTokenDeposit from './blockChain/consultationCertificate';

const customStyles = {
  rows: {
    style: {
      minHeight: '48px',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#f5f5f5',
      fontSize: '15px',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
    },
  },
};

const Listconsultation = () => {
  const dispatch = useDispatch();
  const Role = localStorage.getItem('Role');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    {
      Role === 'Admin'
        ? dispatch(getConsultation())
        : dispatch(getAllConsultation());
    }
  }, []);

  const { consultation_details, consultationsById, success } = useSelector(
    (state) => state.Reducer
  );
  console.log('consultation_details######', consultation_details);

  const columns = [
    {
      name: 'Date',
      selector: (row) => row.formattedDate,
      sortable: true,
    },
    {
      name: 'Doctor',
      selector: (row) => row.doctorname,
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row) => row.departmentname,
      sortable: true,
    },
    {
      name: 'Hospital',
      selector: (row) => row.hospitalname,
      sortable: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div className="action-container">
          <div>
            <div>
              <Link
                type="button"
                className="btn btn-info"
                to={`/consultation/${row.id}`}
                onClick={() => dispatch(viewconsultation(row.id))}
              >
                <IconButton>
                  <Visibility />
                </IconButton>
              </Link>
              {Role === 'Admin' && (
                <Link
                  type="button"
                  className="btn btn-info"
                  // to={`/consultation/${row.id}/certificate`}
                  onClick={() => handleAction(row.id)}
                >
                  <IconButton>
                    <Description />
                  </IconButton>
                </Link>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultation_details.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const data = currentItems.map((data) => ({
    id: data._id,
    loginid: data.loginId,
    formattedDate: new Date(data.date).toISOString().split('T')[0],
    time: data.time,
    hospitalname: data.hospital_details[0].hospitalName,
    departmentname: data.department_details[0].departmentName,
    doctorname: data.doctor_details[0].doctorName,
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter((item) => {
    if (
      item.doctorname &&
      item.departmentname &&
      item.hospitalname &&
      item.time &&
      item.formattedDate
    ) {
      return (
        item.doctorname.toLowerCase().includes(searchText.toLowerCase()) ||
        item.departmentname.toLowerCase().includes(searchText.toLowerCase()) ||
        item.hospitalname.toLowerCase().includes(searchText.toLowerCase()) ||
        item.time.toLowerCase().includes(searchText.toLowerCase()) ||
        item.formattedDate.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return false;
  });
  const handleAction = async (row) => {
    // Perform action for the selected row
    console.log('Selected Row:', row);
    dispatch(getPatientByID(row));
    if (success) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const certificationValues = {
        patientName: consultationsById?.SignUp?.name,
        patientUUID: JSON.stringify(consultationsById?.SignUp?.aadharNo),
        patientRegId: consultationsById?.SignUp?.loginId,
        doctorName:
          consultationsById?.consultationById[0]?.doctor_details[0]?.doctorName,
        consultationTime: consultationsById?.consultationById[0]?.time,
        departmentName:
          consultationsById?.consultationById[0]?.department_details[0]
            ?.departmentName,
        hospitalName:
          consultationsById?.consultationById[0]?.hospital_details[0]
            ?.hospitalName,
        issuerName:
          consultationsById?.consultationById[0]?.hospital_details[0]
            ?.hospitalName,
        issuerId:
          consultationsById?.consultationById[0]?.hospital_details[0]
            ?.hospitalId,
        issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
      };
      console.log('certificationValuesMainPage', certificationValues);
      const wrapper = await wrappedTokenDeposit({
        web3,
        address: accounts[0],
        netVer,
        certificationValues,
      });
      console.log('wrapper', wrapper);
      dispatch(setconsultationCertificate(wrapper));
    }
  };

  return (
    <div className="container">
      {Role === 'Patient' && (
        <Link to="/consultation/add" className="add-btn">
          ADD CONSULTATION
        </Link>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ color: 'red', fontWeight: 'bold', margin: '2% 0% 0% 0%' }}>
          Consulation List
        </h4>
        <div>
          <input
            type="text"
            placeholder="Search by Any Field"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        noHeader
        pagination
        paginationPerPage={itemsPerPage}
        paginationTotalRows={consultation_details.length}
        paginationDefaultPage={currentPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default Listconsultation;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllVaccination,
  getVaccination,
  getvaccinatedPatientByID,
  setvaccinationCertificate,
  viewvaccination,
} from '../actions';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Visibility, Description } from '@material-ui/icons';
import Web3 from 'web3';
import wrappedTokenWithdraw from './blockChain/vaccinationCertificate';
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

const ListVaccination = () => {
  const dispatch = useDispatch();
  const Role = localStorage.getItem('Role');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    {
      Role === 'Admin'
        ? dispatch(getVaccination())
        : dispatch(getAllVaccination());
    }
  }, []);
  const { vaccination_details, vacinationsById, success } = useSelector(
    (state) => state.Reducer
  );
  console.log('vacinationsById%%', vacinationsById);

  const columns = [
    {
      name: 'Date',
      selector: (row) => row.formattedDate,
    },
    {
      name: 'Time',
      selector: (row) => row.formattedTime,
    },
    {
      name: 'Vaccine Name',
      selector: (row) => row.Vaccinename,
    },
    {
      name: 'Hospital Name',
      selector: (row) => row.hospitalname,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <Link
              type="button"
              className="btn btn-info"
              to={`/vaccination/${row.id}`}
              onClick={() => dispatch(viewvaccination(row.id))}
            >
              <IconButton>
                <Visibility />
              </IconButton>
            </Link>
            {/* {Role === 'Admin' && ( */}
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
            {/* )} */}
          </div>
        </div>
      ),
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vaccination_details.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const data = currentItems.map((data) => ({
    id: data._id,
    loginId: data.loginId,
    formattedDate: data.date.substring(0, 10),
    formattedTime: data.date.substring(11),
    hospitalname: data.hospital_details[0].hospitalName,
    Vaccinename: data.vaccine_details[0].name,
  }));
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter((item) => {
    if (
      item.Vaccinename &&
      item.hospitalname &&
      item.formattedTime &&
      item.formattedDate
    ) {
      return (
        item.Vaccinename.toLowerCase().includes(searchText.toLowerCase()) ||
        item.hospitalname.toLowerCase().includes(searchText.toLowerCase()) ||
        item.formattedTime.toLowerCase().includes(searchText.toLowerCase()) ||
        item.formattedDate.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return false;
  });
  const handleAction = async (row) => {
    // Perform action for the selected row
    console.log('Selected Row:', row);
    dispatch(getvaccinatedPatientByID(row));
    if (success) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const certificationValues = {
        patientName: vacinationsById?.SignUp?.name,
        patientUUID: JSON.stringify(vacinationsById?.SignUp?.aadharNo),
        patientRegId: vacinationsById?.SignUp?.loginId,
        vaccineName:
          vacinationsById?.vacinationById[0]?.vaccine_details[0]?.name,
        vaccineTakenDatetime:
          vacinationsById?.vacinationById[0]?.date.substring(11),
        disease:
          vacinationsById?.vacinationById[0]?.vaccine_details[0]?.disease,
        antigen:
          vacinationsById?.vacinationById[0]?.vaccine_details[0]?.antigen,
        issuerName:
          vacinationsById?.vacinationById[0]?.hospital_details[0]?.hospitalName,
        issuerId:
          vacinationsById?.vacinationById[0]?.hospital_details[0]?.hospitalId,
        issuedDateTime: vacinationsById?.vacinationById[0]?.date.substring(11),
      };
      console.log('certificationValuesMainPage', certificationValues);
      const wrapper = await wrappedTokenWithdraw({
        web3,
        address: accounts[0],
        netVer,
        certificationValues,
      });
      dispatch(setvaccinationCertificate(wrapper));
      console.log('wrapperVaccine', wrapper);
    }
  };

  return (
    <div>
      {Role === 'Patient' && (
        <Link to="/vaccination/add" className="add-btn">
          ADD VACCINATION
        </Link>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ color: 'red', fontWeight: 'bold', margin: '2% 0% 0% 0%' }}>
          Vaccination List
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
        paginationTotalRows={vaccination_details.length}
        paginationDefaultPage={currentPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default ListVaccination;

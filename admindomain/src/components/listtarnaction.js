import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllVaccination,
  getVaccination,
  gettranaction,
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

const Listtransaction = () => {
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
      dispatch(gettranaction());
    }
  }, []);
  const { tranaction_details } = useSelector((state) => state.Reducer);
  console.log('tranaction_details%%', tranaction_details);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
    },
    {
      name: 'Type',
      selector: (row) => row.appointmentType,
    },
    {
      name: 'Payment Status',
      selector: (row) => row.status,
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tranaction_details.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const data = currentItems.map((data) => ({
    id: data._id,
    appointmentType: data.appointmentType,
    status: data.status,
    name: data.user_details.name,
    address: data.user_details.address,
  }));
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter((item) => {
    if (item.appointmentType && item.status && item.name && item.address) {
      return (
        item.appointmentType.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase()) ||
        item.address.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ color: 'red', fontWeight: 'bold', margin: '2% 0% 0% 0%' }}>
          Transaction List
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
        paginationTotalRows={tranaction_details.length}
        paginationDefaultPage={currentPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default Listtransaction;

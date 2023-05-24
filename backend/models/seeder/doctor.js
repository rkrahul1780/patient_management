const hospital = require('../hospital');
const department = require('../department');
const doctor = require('../doctor');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);

connect(
  'mongodb+srv://rahul2255:rahul2255@cluster0.rownijg.mongodb.net/Patient_Management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    const hospitalData = [
      {
        hospitalId: '1',
        hospitalName: 'KIMS Hospital (Kerala Institute of Medical Sciences)',
        place: 'Kumarapuram',
      },
      {
        hospitalId: '2',
        hospitalName: 'Ananthapuri Hospitals and Research Institute',
        place: 'Chacka',
      },
    ];

    const departmenData = [
      {
        departmentId: '1',
        departmentName: 'Cardiology',
      },
      {
        departmentId: '2',
        departmentName: 'Psychology',
      },
      {
        departmentId: '3',
        departmentName: 'Orthology',
      },
      {
        departmentId: '4',
        departmentName: 'Pediatrics',
      },
      {
        departmentId: '5',
        departmentName: 'Gynaecology',
      },
    ];

    const doctorData = [
      {
        doctorName: 'Dr. Alexander Patel',
        hospitalId: '1',
        departmentId: '1',
      },
      {
        doctorName: 'Dr. Daniel Foster',
        hospitalId: '1',
        departmentId: '1',
      },
      {
        doctorName: 'Dr. Samuel Rivera',
        hospitalId: '1',
        departmentId: '2',
      },
      {
        doctorName: 'Dr. Victoria Phillips',
        hospitalId: '1',
        departmentId: '2',
      },
      {
        doctorName: 'Dr. James Jenkins',
        hospitalId: '1',
        departmentId: '3',
      },
      {
        doctorName: 'Dr. Mia Cooper',
        hospitalId: '1',
        departmentId: '3',
      },
      {
        doctorName: 'Dr. Charlotte Hughes',
        hospitalId: '1',
        departmentId: '4',
      },
      {
        doctorName: 'Dr. Sophia Hughes',
        hospitalId: '1',
        departmentId: '4',
      },
      {
        doctorName: 'Dr. Olivia Mitchell',
        hospitalId: '1',
        departmentId: '5',
      },
      {
        doctorName: 'Dr. Jacob Turner',
        hospitalId: '1',
        departmentId: '5',
      },
      {
        doctorName: 'Dr. Benjamin Lee',
        hospitalId: '2',
        departmentId: '1',
      },
      {
        doctorName: 'Dr. Emily Martinez',
        hospitalId: '2',
        departmentId: '1',
      },
      {
        doctorName: 'Dr. Ethan Wilson',
        hospitalId: '2',
        departmentId: '2',
      },
      {
        doctorName: 'Dr. Alexander Adams',
        hospitalId: '2',
        departmentId: '2',
      },
      {
        doctorName: 'Dr. Mia Campbell',
        hospitalId: '2',
        departmentId: '3',
      },
      {
        doctorName: 'Dr. Isabella Walker',
        hospitalId: '2',
        departmentId: '3',
      },
      {
        doctorName: 'Dr. Harper Hall',
        hospitalId: '2',
        departmentId: '4',
      },
      {
        doctorName: 'Dr. Matthew Wright',
        hospitalId: '2',
        departmentId: '4',
      },
      {
        doctorName: 'Dr. Emily Reynolds',
        hospitalId: '2',
        departmentId: '5',
      },
      {
        doctorName: 'Dr. Emily Reynolds',
        hospitalId: '3',
        departmentId: '5',
      },
    ];

    const existingDoc = await hospital.find();
    if (existingDoc >= 0) {
      await hospital.insertMany(hospitalData);
      await department.insertMany(departmenData);
      await doctor.insertMany(doctorData);
      console.log(`Data created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

createSeedData();

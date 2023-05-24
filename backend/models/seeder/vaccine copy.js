const vaccine = require('../vaccine');
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
    const vaccines = [
      {
        name: 'Sinovac COVID-19 Vaccine',
        disease: 'COVID-19',
        antigen: 'Inactivated SARS-CoV-2 virus',
      },
      {
        name: 'Mumps Vaccine',
        disease: 'Mumps',
        antigen: 'Mumps antigen',
      },
      {
        name: 'Measles-Mumps-Rubella (MMR) Vaccine',
        disease: 'Measles, Mumps, Rubella',
        antigen: 'Measles, Mumps, Rubella antigens',
      },
      {
        name: 'Hepatitis B Vaccine',
        disease: 'Hepatitis B',
        antigen: 'Hepatitis B surface antigen',
      },
      {
        name: 'Polio Vaccine',
        disease: 'Polio',
        antigen: 'Poliovirus antigens',
      },
      {
        name: 'Tetanus Vaccine',
        disease: 'Tetanus',
        antigen: 'Tetanus toxoid',
      },
    ];
    const existingDoc = await vaccine.find();
    if (existingDoc >= 0) {
      await vaccine.insertMany(vaccines);
      console.log(`Vaccine created successfully`);
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

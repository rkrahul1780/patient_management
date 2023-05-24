const login = require('../login');
const signup = require('../signup');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);
const { passwordHash } = require('../../helpers/hashPassword');

connect(
  'mongodb+srv://rahul2255:rahul2255@cluster0.rownijg.mongodb.net/Patient_Management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    let { salt, password } = await passwordHash('Admin@123');
    const adminSeed = {
      name: 'Admin123',
      email: 'admin123@gmail.com',
      password: password,
      role: 'Admin',
      phoneNumber: '9645757485',
      salt,
    };
    const existingDoc = await login.findOne({ email: adminSeed.email });
    if (!existingDoc) {
      const loginData = await login.create({
        email: adminSeed.email,
        password: adminSeed.password,
        salt: adminSeed.salt,
      });
      console.log('lodin', loginData);

      const signupData = await signup.create({
        name: adminSeed.name,
        role: adminSeed.role,
        phoneNumber: adminSeed.phoneNumber,
        loginId: loginData.id,
      });

      console.log(`Admin created successfully`);
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

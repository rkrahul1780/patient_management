const profile = require('../../models/signup');
const medicalDetails = require('../../models/medicalDetails');
const disease = require('../../models/disease');
const jwt = require('jsonwebtoken');
const login = require('../../models/login');

exports.listProfile = async (req, res) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const profiledata = await profile.findOne({
      loginId: loginData._id,
    });
    const medicalDetailsdata = await medicalDetails.findOne({
      loginId: loginData._id,
    });
    const diseasedata = await disease.find({
      loginId: loginData._id,
    });
    const data = { profiledata, medicalDetailsdata, diseasedata };
    console.log('data', data);
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

exports.Profile = async (req, res) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('req.body', req.body);
    console.log('loginData', loginData);
    const data = await disease.create({
      loginId: loginData._id,
      diseaseName: req.body.diseaseName,
      startedDate: req.body.startedDate,
      remarks: req.body.remarks,
    });
    // let data = { profiledata, medicalDetailsdata };
    console.log('data', data);
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('req.body', req.body);
    console.log('loginData', loginData);

    // Find and update the document in profile collection
    const profileDocument = await profile.findOne({ loginId: loginData._id });
    if (profileDocument) {
      // Modify specific parts of the document
      profileDocument.phoneNumber = req.body.phoneNumber;
      profileDocument.address = req.body.address;
      profileDocument.aadharNo = req.body.aadharNo;
      profileDocument.dob = req.body.dob;
      profileDocument.pinCode = req.body.pincode;
      profileDocument.state = req.body.state;
      profileDocument.country = req.body.country;

      // Save the changes
      await profileDocument.save();
      console.log('Profile document updated successfully!');
    } else {
      console.error('Profile document not found');
    }

    // Find and update the document in medicalDetails collection
    const medicalDocument = await medicalDetails.findOne({
      loginId: loginData._id,
    });
    if (medicalDocument) {
      // Modify specific parts of the document
      medicalDocument.height = req.body.height;
      medicalDocument.weight = req.body.weight;

      // Save the changes
      await medicalDocument.save();
      console.log('MedicalDetails document updated successfully!');
    } else {
      console.error('MedicalDetails document not found');
    }

    res.json({
      success: true,
      message: 'Profile updated successfully!',
    });
  } catch (e) {
    console.error(e);
    res.send({ success: false, msg: e.message });
  }
};

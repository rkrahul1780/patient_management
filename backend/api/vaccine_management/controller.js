const vaccine = require('../../models/vaccine');
const hospital = require('../../models/hospital');
const vaccination = require('../../models/vaccination');
const jwt = require('jsonwebtoken');
const login = require('../../models/login');
const transaction = require('../../models/transaction');
const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const signup = require('../../models/signup');
exports.listVaccine = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let id = req.params.id;
    let query = id ? vaccine.findById(id) : vaccine.find({});

    query = query.skip(skip).limit(limit);

    const data = await query.exec();

    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

exports.addVaccine = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const hospitaldata = await hospital.findOne({
      hospitalName: req.body.hospital,
    });
    const vacccinedata = await vaccine.findOne({
      name: req.body.name,
    });
    console.log('va', vacccinedata);
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const formattedDateTime = DateTime.fromISO(req.body.datetime).toFormat(
      'yyyy-MM-dd HH:mm'
    );
    console.log('formattedDateTime', formattedDateTime);

    const data = await vaccination.create({
      date: formattedDateTime,
      vaccineId: vacccinedata._id,
      hospitalId: hospitaldata._id,
      loginId: loginData._id,
      payment: req.body.payment.transactionHash,
    });
    let transactionDetails = new transaction({
      amount: '0.001',
      status: req.body.payment.status,
      appointmentType: 'vaccination',
      transactionHash: req.body.payment.transactionHash,
      loginId: loginData._id,
      dataId: data._id,
    });
    const trans = await transaction.create(transactionDetails);
    console.log('data', data);
    res.json({
      success: true,
      data,
    });
    // await consultation.create(contactDetails);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};
exports.getALLVaccine = async (req, res) => {
  try {
    

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Get the limit (items per page) from the query parameters, default to 10 if not provided

    const skip = (page - 1) * limit; // Calculate the number of items to skip

   
    const data1 = await vaccination.aggregate([
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $skip: skip, // Skip the specified number of items
      },
      {
        $limit: limit, // Limit the number of items to the specified limit
      },
    ]);

    console.log('data1', data1);

    res.json({
      success: true,
      data1,
      pagination: {
        page,
        limit,
      },
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};
exports.getVaccine = async (req, res) => {
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

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Get the limit (items per page) from the query parameters, default to 10 if not provided

    const skip = (page - 1) * limit; // Calculate the number of items to skip

    const totalCount = await vaccination.countDocuments({
      loginId: loginData._id,
    }); // Get the total count of items matching the criteria

    const data1 = await vaccination.aggregate([
      {
        $match: { loginId: loginData._id },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $skip: skip, // Skip the specified number of items
      },
      {
        $limit: limit, // Limit the number of items to the specified limit
      },
    ]);

    console.log('data1', data1);

    res.json({
      success: true,
      data1,
      pagination: {
        page,
        limit,
        totalCount,
      },
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};

exports.getVaccinebyID = async (req, res) => {
  try {
    let id = req.params.id;
    let data1;
    data1 = await vaccination.findById(id);
    const hospitaldata = await hospital.findOne({
      _id: data1.hospitalId,
    });
    const vaccinedata = await vaccine.findOne({ _id: data1.vaccineId });
    console.log('data1', data1);
    let data = { data1, hospitaldata, vaccinedata };
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};
exports.getVaccinePatientsDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const vacinationById = await vaccination.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
    ]);
    // console.log('first', first);
    const Login = await login.findOne({ _id: vacinationById[0].loginId });

    const SignUp = await signup.findOne({ loginId: vacinationById[0].loginId });
    console.log('idfdssdfsdf', id);

    console.log('id', {
      Login: Login,
      SignUp: SignUp,
      vacinationById: vacinationById,
    });
    res.json({
      success: true,
      data: { Login, SignUp, vacinationById },
    });
  } catch (e) {
    res.json({
      success: false,
      msg: e.message,
    });
  }
};
exports.vaccinationCertificate = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { patientRegId, vaccineName, vaccineTakenDatetime } = req.body;

    const existingCertificate = await VaccinationCertificate.findOne({
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
    });

    if (existingCertificate) {
      return res.json({
        success: false,
        msg: 'Certificate already generated for this patient and issuer',
      });
    }
    const data = await VaccinationCertificate.create(req.body);
    res.json({
      success: true,
      msg: 'Certificate Generated Successfully',
    });
    generatePDF(req.body);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

async function generatePDF(data) {
  // Load the background image
  const backgroundImage = await fs.promises.readFile(
    path.join(__dirname, '../../images/images.jpeg')
  );

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the background image
  const image = await pdfDoc.embedJpg(backgroundImage);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    opacity: 0.5, // Adjust the opacity of the background image
    rotate: degrees(0), // Adjust the rotation of the background image if needed
  });

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(12);

  // Set the content on the page
  const x = 50;
  let y = page.getHeight() - 50;

  const drawText = (text, color = rgb(0, 0, 0), spacing = 20) => {
    page.drawText(text, { x, y, color });
    y -= spacing;
  };

  drawText(`Certificate Number: ${data.certificateNumber}`, rgb(0.2, 0.4, 0.6));
  drawText(`Patient Name: ${data.patientName}`);
  drawText(`Patient UUID: ${data.patientUUID}`);
  drawText(`Patient Registration ID: ${data.patientRegId}`);
  drawText(`Vaccine Name: ${data.vaccineName}`);
  drawText(`Vaccine Taken Datetime: ${data.vaccineTakenDatetime}`);
  drawText(`Disease: ${data.disease}`);
  drawText(`Antigen: ${data.antigen}`);
  drawText(`Issuer Name: ${data.issuerName}`, rgb(0.8, 0.2, 0.2));
  drawText(`Issuer ID: ${data.issuerId}`);
  drawText(`Issued Datetime: ${data.issuedDateTime}`);

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'midhun@spericorn.com',
      pass: 'Midhun@2000',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'midhun@spericorn.com',
    to: 'bincy@spericorn.com',
    subject: 'Certificate',
    html: `
  <h1>Certificate of Consultation</h1>
  <p>Please find the certificate attached.</p>
  `,
    attachments: [
      {
        filename: 'output.pdf',
        content: pdfBytes,
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  console.log('Email sent successfully.');
}

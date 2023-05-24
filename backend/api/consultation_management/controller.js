const consultation = require('../../models/consultation');
const doctor = require('../../models/doctor');
const department = require('../../models/department');
const hospital = require('../../models/hospital');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const transaction = require('../../models/transaction');
const login = require('../../models/login');
const signup = require('../../models/signup');
const consultationCertificate = require('../../models/ConsultationCertificate');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const { initiateTask, startTask } = require('../../Cronjob/cronJob');
const nodemailer = require('nodemailer');

exports.addconsultation = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { date, time } = req.body;
    const doctordata = await doctor.findOne({ doctorName: req.body.doctor });
    const existingConsultation = await consultation.findOne({
      date,
      time,
      doctorId: doctordata._id,
    });
    console.log('existingConsultation', existingConsultation);
    if (existingConsultation) {
      return res.json({
        success: false,
        msg: 'Consultation already scheduled at the same date and time for this doctor.',
      });
    }
    console.log('doctordata', doctordata);
    const departmentdata = await department.findOne({
      departmentName: req.body.department,
    });
    const hospitaldata = await hospital.findOne({
      hospitalName: req.body.hospital,
    });
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    if (req.body.payment) {
      const data = await consultation.create({
        date: req.body.date,
        doctorId: doctordata._id,
        hospitalId: hospitaldata._id,
        departmentId: departmentdata._id,
        time: req.body.time,
        loginId: loginData._id,
        Status: 'Occupied',
        payment: req.body.payment.transactionHash,
      });
      let transactionDetails = new transaction({
        amount: '0.001',
        status: req.body.payment.status,
        appointmentType: 'consultation',
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
    } else {
      return res.json({
        success: false,
        msg: 'Payment is Unsuccessful',
      });
    }

    // await consultation.create(contactDetails);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};

exports.getconsultation = async (req, res) => {
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    console.log('req.body', req.body);
    const data1 = await consultation.aggregate([
      {
        $match: { loginId: loginData._id },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
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
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    console.log('data1', data1);

    res.json({
      success: true,
      data1,
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};

exports.getconsultationbyID = async (req, res) => {
  try {
    let id = req.params.id;
    let data1;
    data1 = await consultation.findById(id);
    const departmentdata = await department.findOne({
      _id: data1.departmentId,
    });
    console.log('first', departmentdata);
    const hospitaldata = await hospital.findOne({
      _id: data1.hospitalId,
    });
    const doctordata = await doctor.findOne({ _id: data1.doctorId });
    console.log('data1', data1);
    let data = { data1, departmentdata, doctordata, hospitaldata };
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
exports.getallconsultation = async (req, res) => {
  try {
    const data = await consultation.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
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
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
        },
      },
    ]);
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};
exports.getPatientsDataById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const consultationById = await consultation.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
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
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
        },
      },
    ]);
    const Login = await login.findOne({ _id: consultationById[0].loginId });
    const SignUp = await signup.findOne({
      loginId: consultationById[0].loginId,
    });
    console.log('id', { Login, SignUp, consultationById });
    res.json({
      success: true,
      data: { Login, SignUp, consultationById },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
exports.consultationCertificate = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { patientRegId, doctorName, patientName, consultationTime } =
      req.body;

    const existingCertificate = await consultationCertificate.findOne({
      patientRegId,
      doctorName,
      consultationTime,
    });

    const signdata = await signup.findOne({
      name: patientName,
    });
    const logindata = await login.findOne({ _id: signdata.loginId });

    if (existingCertificate) {
      return res.json({
        success: false,
        msg: 'Certificate already generated for this patient and doctor',
      });
    }
    const data = await consultationCertificate.create(req.body);
    res.json({
      success: true,
      msg: 'Certificate Generated Successfully',
    });
    generatePDF(req.body, logindata.email);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};
const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  try {
    const allConsultations = await consultation.find({
      Status: 'pending',
      date: { $lte: new Date() }, // Filter consultations where the date is less than or equal to the current date
    });
    console.log('allConsultations', allConsultations);
    const currentTime = new Date();

    for (const consultations of allConsultations) {
      const endTime = calculateEndTime(consultations.time);

      if (currentTime >= endTime) {
        await consultation.updateOne(
          { _id: consultations._id },
          { Status: 'completed' }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

function calculateEndTime(startTime) {
  const [hour, minute, meridiem] = startTime
    .match(/^(\d+).(\d+)(\w+)/)
    .slice(1);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const endTime = new Date();
  endTime.setHours(hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}

// async function generatePDF(data, email) {
//   // Create a new PDF document
//   try {
//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();

//     // Add a new page
//     const page = pdfDoc.addPage();

//     // Set the font and font size
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     page.setFont(font);
//     page.setFontSize(20);

//     // Set the content on the page
//     page.drawText(`Certificate Number: ${data.certificateNumber}`, {
//       x: 50,
//       y: 50,
//     });
//     page.drawText(`Patient Name: ${data.patientName}`, {
//       x: 50,
//       y: 70,
//     });
//     page.drawText(`Patient UUID: ${data.patientUUID}`, {
//       x: 50,
//       y: 90,
//     });
//     page.drawText(`Patient Registration ID: ${data.patientRegId}`, {
//       x: 50,
//       y: 110,
//     });
//     page.drawText(`Doctor Name: ${data.doctorName}`, {
//       x: 50,
//       y: 130,
//     });
//     page.drawText(`Consultation Time: ${data.consultationTime}`, {
//       x: 50,
//       y: 150,
//     });
//     page.drawText(`Department Name: ${data.departmentName}`, {
//       x: 50,
//       y: 170,
//     });
//     page.drawText(`Hospital Name: ${data.hospitalName}`, {
//       x: 50,
//       y: 190,
//     });
//     page.drawText(`Issuer Name: ${data.issuerName}`, {
//       x: 50,
//       y: 210,
//     });
//     page.drawText(`Issuer ID: ${data.issuerId}`, {
//       x: 50,
//       y: 230,
//     });
//     page.drawText(`Issued Date Time: ${data.issuedDateTime}`, {
//       x: 50,
//       y: 250,
//     });

//     // Save the PDF to a buffer
//     const pdfBytes = await pdfDoc.save();

//     // Create a Nodemailer transporter

//     // Define email options
//     const mailOptions = {
//       from: 'rahul.kumar@spericorn.com',
//       to: email,
//       subject: 'Certificate',
//       text: 'Please find the certificate attached.',
//       attachments: [
//         {
//           filename: 'certificate.pdf',
//           content: pdfBytes,
//         },
//       ],
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     console.log('Email sent successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }
async function generatePDF(data, email) {
  try {
    const pdfDoc = await PDFDocument.create();

    // Add a new page
    const page = pdfDoc.addPage();

    // Set the font and font size
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    page.setFont(font);
    page.setFontSize(24);

    // Set the content on the page
    page.drawText('Certificate of Consultation', {
      x: 50,
      y: page.getHeight() - 50,
    });

    const textStartY = page.getHeight() - 120;
    const lineHeight = 30;

    const fields = [
      `Certificate Number: ${data.certificateNumber}`,
      `Patient Name: ${data.patientName}`,
      `Patient UUID: ${data.patientUUID}`,
      `Patient Registration ID: ${data.patientRegId}`,
      `Doctor Name: ${data.doctorName}`,
      `Consultation Time: ${data.consultationTime}`,
      `Department Name: ${data.departmentName}`,
      `Hospital Name: ${data.hospitalName}`,
      `Issuer Name: ${data.issuerName}`,
      `Issuer ID: ${data.issuerId}`,
      `Issued Date Time: ${data.issuedDateTime}`,
    ];

    fields.forEach((field, index) => {
      page.drawText(field, {
        x: 50,
        y: textStartY - index * lineHeight,
      });
    });

    // Save the PDF to a buffer
    const pdfBytes = await pdfDoc.save();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rahul.kumar@spericorn.com',
        pass: 'rahul2255@',
      },
    });

    // Define email options
    const mailOptions = {
      from: 'rahul.kumar@spericorn.com',
      to: email,
      subject: 'Certificate',
      html: `
    <h1>Certificate of Consultation</h1>
    <p>Please find the certificate attached.</p>
  `,
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBytes,
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

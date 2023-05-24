const nodemailer = require('nodemailer');

exports.sendMail = async (filter, res) => {
  console.log('first');
  const { user, username, password } = filter;
  console.log('user', user);
  try {
    const content = `Hi ${user},
       Your  username and password are given below:
            username: ${username}
            password: ${password}
      Regards,
      RK Hospital support team.`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rahul.kumar@spericorn.com',
        pass: 'rahul2255@',
      },
    });

    const mailOptions = {
      from: 'rahul.kumar@spericorn.com',
      to: username,
      subject: 'Welcome to the RK Hospital Patient Management System',
      text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        // res.json({
        //   success: false,
        //   msg: 'Error sending email',
        // });
      } else {
        console.log('Email sent:', info.response);
        res.json({
          success: true,
          msg: 'Email sent to: ' + username,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

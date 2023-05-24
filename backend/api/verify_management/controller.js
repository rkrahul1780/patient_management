const ConsultationCertificate = require('../../models/ConsultationCertificate');

exports.verifyconsultation = async (req, res) => {
  try {
    const CertificateData = await ConsultationCertificate.findOne({
      ConsultationCertificate: req.body.certificateNumber,
    });
    if (!CertificateData) {
      return res.json({
        success: false,
        msg: 'Certificate Number Does not Exist',
      });
    }
    res.json({
      success: true,
      data: { CertificateData },
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

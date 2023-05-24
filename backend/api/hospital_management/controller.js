const hospital = require('../../models/hospital');

exports.listHospital = async (req, res) => {
  try {
    let id = req.params.id;
    const data = id ? await hospital.findById(id) : await hospital.find({});
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

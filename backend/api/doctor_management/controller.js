const doctor = require('../../models/doctor');
const department = require('../../models/department');

exports.listDoctor = async (req, res) => {
  try {
    let id = req.params.id;
    let data1;

    if (id) {
      data1 = await doctor.findById(id);
    } else {
      data1 = await doctor.aggregate([
        {
          $lookup: {
            from: 'departments',
            localField: 'departmentId',
            foreignField: 'departmentId',
            as: 'department_details',
          },
        },
        {
          $lookup: {
            from: 'hospitals',
            localField: 'hospitalId',
            foreignField: 'hospitalId',
            as: 'hospital_details',
          },
        },
      ]);
    }

    console.log('data1', data1);
    res.json({
      success: true,
      data1,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

const department = require('../../models/department');

exports.listDepartment = async (req, res) => {
  try {
    let id = req.params.id;
    const data = id ? await department.findById(id) : await department.find({});
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.send({ success: false, msg: e.message });
  }
};

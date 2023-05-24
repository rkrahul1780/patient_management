const contact = require('../../models/contact');

exports.postContact = async (req, res) => {
  try {
    console.log('req.body', req.body);
    await contact.create(contactDetails);
  } catch (e) {
    return await errorMessage(res, e);
  }
};

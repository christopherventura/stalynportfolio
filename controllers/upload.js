let fs = require('fs');

module.exports.postUpload = (req, res) => {
      res.send(req.body.file)
}

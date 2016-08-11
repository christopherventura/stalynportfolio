const nodemailer = require('nodemailer')

module.exports.postEmail = (req, res, next) => {
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'venturachristopher98@gmail.com',
            pass: 'Titi20101998'
        }
    })
	const mailOptions = {
		from: req.body.email,
		to: req.body.to,
		subject: `${req.body.name} : ${req.body.subject}`,
		text: req.body.body
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if(err){
			return res.json({
				err: err.response
			})
		} else {
			return res.json(info)
		}
	})
}

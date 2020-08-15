var express = require('express');
var nodemailer = require('nodemailer');
var cors = require('cors');

var app = express();
app.use('/static', express.static('./static'));
var port = 3000;
app.use(cors);
app.use(express.json());
app.listen(port, () => {
	console.log('Listenening on:', port);
});

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: './' });
});

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'teampanchamukhiwelfaresociety@gmail.com',
		pass: 'team@987', // naturally, replace both with your real credentials or an application-specific password
	},
});

// verify connection configuration
transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take our messages');
	}
});

app.post('/send', (req, res) => {
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	var mailOptions = {
		from: email,
		to: 'teampanchamukhiwelfaresociety@gmail.com',
		subject: subject,
		text: `Hello myself ${name}, ${message}`,
	};
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			res.json({
				status: 'fail',
			});
		} else {
			res.json({
				status: 'success',
				data: data,
			});
		}
	});
});

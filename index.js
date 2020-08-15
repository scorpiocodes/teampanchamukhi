var express = require('express');
var nodemailer = require('nodemailer');
var cors = require('cors');

var app = express();
app.use(express.static(__dirname + '/'));
var port = 3000;
app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello');
});

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'teampanchamukhiwelfaresociety@gmail.com',
		pass: 'team@987', // naturally, replace both with your real credentials or an application-specific password
	},
})

app.post('/send', (req, res) => {
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
    console.log(req.body);
    
	// Specify what the email will look like
	const mailOpts = {
		from: email, // This is ignored by Gmail
		to: 'teampanchamukhiwelfaresociety@gmail.com',
		subject: subject,
		text: `${name} (${email}) says: ${message}`,
	};
	transporter.sendMail(mailOpts, (err, data) => {
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

app.listen(port, () => {
	console.log('Listenening on:', port);
});

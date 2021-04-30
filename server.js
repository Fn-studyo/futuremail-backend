const express = require('express')
const nodemailer = require('nodemailer')
var schedule = require('node-schedule')
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = 3000

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
})

transporter.verify((err, success) => {
    if(err){
        return err
    }
    else{
        return console.log(success)
    }
})

app.post('/send', function (req, res) {

    const mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.email}`,
        subject: `${req.body.subject}`,
        text: `${req.body.message}`
    }

    schedule.scheduleJob(new Date(`${year}, ${month}, ${day}, ${hour}, ${mins}, 0`), function () {

        transporter.sendMail(mailOptions, function(err, info){
            if (err) {
                res.json({
                    status: 'Server Error/No Internet Connection'
                })
            } else {
                res.json({
                    status: "Your Email Has Been Sent!"
                })
            }
        })

    })
})
  

app.get('/', (req, res) => res.send('Api Is Working!'))

app.listen(port, () => console.log(`App Working on port https://localhost:${port}`))
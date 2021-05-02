const express = require('express')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const ejs = require('ejs')
const app = express()
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 9000

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
  

app.get('/', (req, res) => res.sendFile(__dirname +'/public/index.html'))

app.post('/reminder', function (req, res) {

    let context = {
        receiver_name : `${req.receiver_name}`,
        message: `${req.message}`,
        sender_name: `${req.sender_name}`
    };

    ejs.renderFile(process.cwd() + '/templates/temp-three.ejs', context, (err, info) => {

        const mailOptions = {
            from: {
                name: 'FutureMail',
                address: process.env.EMAIL
            },
            to: `${req.body.email}`,
            subject: `${req.body.subject}`,
            html: info
        }

        if (err) {
          console.log(err)
        } else{
            schedule.scheduleJob(new Date(`${req.year}, ${req.month}, ${req.day}, ${req.hour}, ${req.mins}, 0`), function () {

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
        }
    })
})

app.post('/future', function (req, res) {

    let context = {
        receiver_name : `${req.receiver_name}`,
        message: `${req.message}`,
        sender_name: `${req.sender_name}`
    };

    ejs.renderFile(process.cwd() + '/templates/temp-one.ejs', context, (err, info) => {

        const mailOptions = {
            from: {
                name: 'FutureMail',
                address: process.env.EMAIL
            },
            to: `${req.body.email}`,
            subject: `${req.body.subject}`,
            html: info
        }

        if (err) {
          console.log(err)
        } else{
            schedule.scheduleJob(new Date(`${req.year}, ${req.month}, ${req.day}, ${req.hour}, ${req.mins}, 0`), function () {

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
        }
    })
})

app.post('/task', function (req, res) {

    let context = {
        receiver_name : `${req.receiver_name}`,
        task: `${req.task}`,
        message: `${req.message}`,
        sender_name: `${req.sender_name}`
    };

    ejs.renderFile(process.cwd() + '/templates/temp-two.ejs', context, (err, info) => {

        const mailOptions = {
            from: {
                name: 'FutureMail',
                address: process.env.EMAIL
            },
            to: `${req.body.email}`,
            subject: `${req.body.subject}`,
            html: info
        }

        if (err) {
          console.log(err)
        } else{
            schedule.scheduleJob(new Date(`${req.year}, ${req.month}, ${req.day}, ${req.hour}, ${req.mins}, 0`), function () {

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
        }
    })
})

app.listen(port, () => console.log(`App Working on port https://localhost:${port}`))
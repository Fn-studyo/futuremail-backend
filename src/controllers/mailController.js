const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const ejs = require('ejs')
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: process.env.EMAIL_PORT,
    // secure: true, //ssl
    // auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    // },
    
    // tls: {
    //     rejectUnauthorized: false
    // }
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

exports.reminder = (req, res) => {

    let context = {
        receiver_name : `${req.body.receiver_name}`,
        message: `${req.body.message}`,
        sender_name: `${req.body.sender_name}`
    };

    ejs.renderFile(process.cwd() + '/src/templates/temp-three.ejs', context, (err, info) => {

        const mailOptions = {
            from: process.env.EMAIL,
            to: `${req.body.email}`,
            subject: `${req.body.subject}`,
            html: info
        }

        if (err) {
          console.log(err)
        } else{
            schedule.scheduleJob(new Date(`${req.body.year}, ${req.body.month}, ${req.body.day}, ${req.body.hour}, ${req.body.mins}, 0`), function () {

                transporter.sendMail(mailOptions, function(err, info){
                    if (err) {
                        return console.log(err)
                        // return res.json({
                        //     status: 'Server Error/No Internet Connection'
                        // })
                    } else {
                        return res.json({
                            status: "Your Email Has Been Sent!"
                        })
                    }
                })
            })
        }
    })
}

exports.future = (req, res) => {

    let context = {
        receiver_name : `${req.body.receiver_name}`,
        message: `${req.body.message}`,
        sender_name: `${req.body.sender_name}`
    };

    ejs.renderFile(process.cwd() + '/src/templates/temp-one.ejs', context, (err, info) => {

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
            schedule.scheduleJob(new Date(`${req.body.year}, ${req.body.month}, ${req.body.day}, ${req.body.hour}, ${req.body.mins}, 0`), function () {

                transporter.sendMail(mailOptions, function(err, info){
                    if (err) {
                        return res.json({
                            status: 'Server Error/No Internet Connection'
                        })
                    } else {
                        return res.json({
                            status: "Your Email Has Been Sent!"
                        })
                    }
                })
            })
        }
    })
}

exports.task = (req, res) => {

    let context = {
        receiver_name : `${req.receiver_name}`,
        task: `${req.body.task}`,
        message: `${req.body.message}`,
        sender_name: `${req.body.sender_name}`
    };

    ejs.renderFile(process.cwd() + '/src/templates/temp-two.ejs', context, (err, info) => {

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
            schedule.scheduleJob(new Date(`${req.body.year}, ${req.body.month}, ${req.body.day}, ${req.body.hour}, ${req.body.mins}, 0`), function () {

                transporter.sendMail(mailOptions, function(err, info){
                    if (err) {
                        return res.json({
                            status: 'Server Error/No Internet Connection'
                        })
                    } else {
                        return res.json({
                            status: "Your Email Has Been Sent!"
                        })
                    }
                })
            })
        }
    })
}
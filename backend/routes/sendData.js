const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()


router.get('/teste', (req, res) => {
    res.render('teste')
})

router.post('/sendEmail', (req, res) => {
    const email = req.body.email

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth:{
    //         user: process.env.USER_EMAIL,
    //         pass: 'yaxmyspmrxsaatzk',
    //     }
    // })

    // transporter.sendMail({
    //     from: process.env.USER_EMAIL,
    //     to: `samuelmarcos335@gmail.com`,
    //     subject: `Credenciais de acesso à partida!`,
    //     text: `Teste`,
    // })
    console.log(email)
})


module.exports = router
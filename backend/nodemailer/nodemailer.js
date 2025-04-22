import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  }
})

export const sendEmail = (to, subject, text) => {
  const mailOption = {
    from: {
      name: "Safety Pinpoint",
      address: process.env.NODEMAILER_EMAIL
    },
    to: to,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOption, function(error, info){
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent to ${to}: ${info.response}`);
    }
  })
}

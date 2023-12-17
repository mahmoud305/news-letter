const nodemailer = require("nodemailer");


async function sendEmail(recivers, content) {
let info;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // true for 465, false for other ports
        auth: {
            user: "lenovo520pad@gmail.com", // generated ethereal user
            pass: "qjlyvqdcgthtrvpp", // generated ethereal password
        },
    });
  //  console.log(recivers.join(","));
    // send mail with defined transport object
    try {
         info = await transporter.sendMail({
            from: ` <lenovo520pad@gmail.com>`, // sender address
            to: recivers.join(","), // list of receivers
            subject: "EMAIL VERFICATION ✔", // Subject line
            html: content
        });
    } catch (error) {
        console.log("erorrrrrrrr ", error);
    }
   
    return info;
}
module.exports = sendEmail;
import nodemailer from 'nodemailer';

async function sendmail(email, otp) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    });

    let mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your email using this OTP",
        html: `<p>Use this OTP to verify your email and continue:</p><b>${otp}</b>`,
    };

    await transporter.sendMail(mailOptions);
}

export default sendmail;

// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  // secure: false, // true for port 465
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});



const sendVerificationEmail = async (email, token) => {
  // const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  const verifyLink = `https://api.jobkityaari.com/api/auth/verify-email?token=${token}`;
   console.log(email)
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Welcome Aboard - Thank You For Signing Up",
   html: `
  <div style="max-width:600px; margin:0 auto; font-family:Arial, sans-serif; background:#f9f9f9; border:1px solid #ddd; border-radius:8px; padding:20px;">
    <div style="text-align:center; padding:10px 0; border-bottom:1px solid #eee;">
      <h1 style="color:#2c3e50; margin:0;">JobKityaari</h1>
      <p style="color:#777; margin:5px 0;">Your trusted career partner</p>
    </div>

    <div style="padding:20px; text-align:left;">
      <h2 style="color:#333;">Hi,</h2>
      <p style="color:#555; font-size:15px; line-height:1.6;">
        Welcome to <strong>JobKityaari</strong>—your trusted partner in building a successful career! 🚀  
        Whether you’re aiming for a <strong>government post</strong>, preparing for <strong>banking exams</strong>, 
        exploring <strong>PSU roles</strong>, or seeking <strong>private opportunities</strong>—we bring everything together in one place.  
      </p>

      <p style="color:#555; font-size:15px; line-height:1.6;">
        Start exploring today’s <strong>latest job updates</strong> with us.  
      </p>
       

      <h4 style="color:#333;">Please click link below to confirm your Email</h2>
      <div style="text-align:center; margin:30px 0;">
        <a href="${verifyLink}" style="padding:12px 24px; background-color:#27ae60; color:#fff; text-decoration:none; font-weight:bold; border-radius:5px; display:inline-block;">
          ✅ Confirm My Email
        </a>
      </div>

      <p style="color:#555; font-size:14px; line-height:1.6;">
        Thank you for choosing <strong>JobKityaari</strong>.  
        Wishing you the very best in your job search!
      </p>

      <p style="margin-top:20px; color:#333; font-weight:bold;">Best regards,<br>Team JobKityaari</p>
    </div>

    <div style="text-align:center; padding:15px; border-top:1px solid #eee; font-size:12px; color:#999;">
      © ${new Date().getFullYear()} JobKityaari. All rights reserved.
    </div>
  </div>
`

  };

 

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Verification email sent:", info.messageId);
      }
    });
  } catch (error) {
    console.log("Send mail failed:", error);
  }
};

export default sendVerificationEmail;

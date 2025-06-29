// utils/email.js
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendVerificationEmail(userEmail, otpCode) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?otpToken=${otpCode}&email=${encodeURIComponent(userEmail)}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: 'Confirm Your Nike Store Account 🏆',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <h2 style="text-align: center; color: #111;">Welcome to <span style="color: #FF7F50;">Nike Store</span> 👟</h2>
                    <p style="font-size: 16px; color: #333;">Hey there!</p>
                    <p style="font-size: 16px; color: #333;">
                        Your verification code is:
                        <br />
                        <span style="display: inline-block; margin: 15px 0; padding: 10px 20px; background: #FF7F50; color: white; font-size: 24px; border-radius: 5px;">
                            ${otpCode}
                        </span>
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Or you can verify your account by clicking the button below:
                    </p>
                    <div style="text-align: center; margin: 20px;">
                        <a href="${verificationUrl}" style="padding: 12px 25px; background: #FF7F50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Now</a>
                    </div>
                    <p style="font-size: 14px; color: #777;">⚡ This code will expire in 5 minutes.</p>
                </div>
            </div>
        `,
    });
}

async function sendPasswordResetEmail(userEmail, otpCode) {
    console.log('send password reset email log');

    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password?otpToken=${otpCode}&email=${encodeURIComponent(userEmail)}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: 'Reset Your Nike Store Password 🔑',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <h2 style="text-align: center; color: #111;">Reset Your <span style="color: #FF7F50;">Nike Store</span> Password</h2>
                    <p style="font-size: 16px; color: #333;">Hey there!</p>
                    <p style="font-size: 16px; color: #333;">
                        You requested to reset your password.<br/>
                        Your reset code is:
                        <br />
                        <span style="display: inline-block; margin: 15px 0; padding: 10px 20px; background: #FF7F50; color: white; font-size: 24px; border-radius: 5px;">
                            ${otpCode}
                        </span>
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Or you can reset your password by clicking the button below:
                    </p>
                    <div style="text-align: center; margin: 20px;">
                        <a href="${resetUrl}" style="padding: 12px 25px; background: #FF7F50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                    </div>
                    <p style="font-size: 14px; color: #777;">⚡ This code will expire in 5 minutes.</p>
                </div>
            </div>
        `,
    });
}

async function sendEmailChangeVerification(userEmail, otpCode) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: userEmail,
        subject: 'Verify Email Change Request 🔐',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <h2 style="text-align: center; color: #111;">Email Change Verification <span style="color: #FF7F50;">Nike Store</span></h2>
                    <p style="font-size: 16px; color: #333;">Hey there!</p>
                    <p style="font-size: 16px; color: #333;">
                        You requested to change your email address.<br/>
                        To confirm this change, please enter this verification code:
                        <br />
                        <span style="display: inline-block; margin: 15px 0; padding: 10px 20px; background: #FF7F50; color: white; font-size: 24px; border-radius: 5px;">
                            ${otpCode}
                        </span>
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        If you didn't request this change, please ignore this email and contact support immediately.
                    </p>
                    <p style="font-size: 14px; color: #777;">⚡ This code will expire in 10 minutes.</p>
                </div>
            </div>
        `,
    });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail, sendEmailChangeVerification };

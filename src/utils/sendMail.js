import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SEND_MAIL_USER, // Your email
        pass: process.env.SEND_MAIL_PASS, // App Password
    },
    tls: {
        rejectUnauthorized: false, // Fix for self-signed certificate error
    },
});

export const sendMailLink = async (email, link) => {
    try {
        const mailOptions = {
            from: 'narolajeel29@gmail.com',
            to: email,
            subject: "Your RJ GYM & Fitness Add Member",
            html: `
        <div style="
  font-family: Arial, sans-serif; 
  color: #333; 
  padding: 20px; 
  max-width: 600px; 
  margin: auto; 
  border: 1px solid #e0e0e0; 
  border-radius: 10px;
  background: #f7f9fc;
">
  <h2 style="color: #2e6da4; text-align: center;">👋 Welcome to RJ GYM & Fitness!</h2>
  <p>Dear Member, Jeel Narola</p>

  <p>
    Congratulations! You’re now part of the RJ GYM family. Please use the link below to add your member details and start managing your account.
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <a href="${link}"
      style="
        display: inline-block; 
        padding: 12px 24px; 
        background-color: #2e6da4; 
        color: white; 
        font-size: 16px; 
        text-decoration: none; 
        border-radius: 5px;
        box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
        transition: background 0.3s ease;
      "
      onmouseover="this.style.backgroundColor='#1d4e89';"
      onmouseout="this.style.backgroundColor='#2e6da4';"
    >
      ➕ Click Here to Add Member
    </a>
  </div>

  <p style="color: red; font-weight: bold;">⚠️ Important Reminder:</p>
  <ul>
    <li>Your access link is temporary and must be used to complete setup.</li>
    <li>Do <strong>not share</strong> this link or your credentials with anyone.</li>
    <li>If you did not request this email, please report it to our admin team.</li>
  </ul>

  <p style="font-size: 14px; color: #666; margin-top: 20px; text-align: center;">
    Regards,<br><strong>RJ GYM Management Team</strong>
  </p>
</div>

      `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("❌ Error sending email:", err);
            } else {
                console.log("📧 Email successfully sent:", info.response);
            }
        });
    } catch (error) {
        console.error("⚠️ Error during Send Mail:", error);
    }
};



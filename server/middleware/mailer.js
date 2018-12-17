import nodemailer from 'nodemailer';
import secrets from './ENVdevelopment.json';

const sendMail = (userEmail, parcelId, subject, action) => {
  const transporter = nodemailer.createTransport({
    service: secrets.emailServiceProvider,
    auth: {
      user: secrets.emailUserName,
      pass: secrets.emailUserPassword
    }
  });

  const mailOptions = {
    from: secrets.emailUserName,
    to: userEmail,
    subject,
    html: `<h3>${subject}</h3>
          <p> Hi there, <br>
            please be informed that there has been a ${subject} 
            with respect to <em>parcel id: ${parcelId}</em> to ${action}. 
            
            Thank you for delivering with us. </p>`
  };

  transporter.sendMail(mailOptions, (e, info) => {
    if (e) return console.log(e);
    return console.log(`Email sent: ${info.response}`);
  });
};

export default sendMail;

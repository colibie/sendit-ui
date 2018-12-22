import nodemailer from 'nodemailer';

const sendMail = (userEmail, parcelId, subject, action) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAILSERVICEPROVIDER,
    auth: {
      user: process.env.EMAILUSERNAME,
      pass: process.env.EMAILUSERPASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAILUSERNAME,
    to: userEmail,
    subject,
    html: `<h3>${subject}</h3>
          <p> Hi there, <br>
            please be informed that there has been a ${subject} 
            with respect to <b>parcel id: ${parcelId}</b> to '${action}'. 
            
            Thank you for delivering with us. </p><br>
            <i>If you're not satisfied with this action, please report by replying</i>`
  };

  transporter.sendMail(mailOptions, (e, info) => {
    if (e) return console.log(e);
    return console.log(`Email sent: ${info.response}`);
  });
};

export default sendMail;

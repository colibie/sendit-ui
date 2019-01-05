'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _ENV = require('./ENV');

var _ENV2 = _interopRequireDefault(_ENV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMail = function sendMail(userEmail, parcelId, subject, action) {
  var transporter = _nodemailer2.default.createTransport({
    service: _ENV2.default.emailServiceProvider,
    auth: {
      user: _ENV2.default.emailUserName,
      pass: _ENV2.default.emailUserPassword
    }
  });

  var mailOptions = {
    from: _ENV2.default.emailUserName,
    to: userEmail,
    subject: subject,
    html: '<h3>' + subject + '</h3>\n          <p> Hi there, <br>\n            please be informed that there has been a ' + subject + ' \n            with respect to <b>parcel id: ' + parcelId + '</b> to \'' + action + '\'. \n            \n            Thank you for delivering with us. </p><br>\n            <i>If you\'re not satisfied with this action, please report by replying</i>'
  };

  transporter.sendMail(mailOptions, function (e, info) {
    if (e) return console.log(e);
    return console.log('Email sent: ' + info.response);
  });
};

exports.default = sendMail;
//# sourceMappingURL=mailer.js.map
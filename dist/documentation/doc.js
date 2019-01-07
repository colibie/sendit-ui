'use strict';

var aglio = require('aglio');

var options = {
  themeVariables: 'default'
};

// eslint-disable-next-line func-names, consistent-return, prefer-arrow-callback
aglio.renderFile('./apiary.apib', './server/documentation/doc.html', options, function (err, warnings) {
  if (err) return console.log(err);
  if (warnings) console.log(warnings);
});
//# sourceMappingURL=doc.js.map
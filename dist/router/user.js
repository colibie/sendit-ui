'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _accessToken = require('../middleware/accessToken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/auth/signup', _user2.default.create);
router.get('/', (0, _accessToken.authorize)(['admin']), _user2.default.getAll);
router.post('/auth/login', _user2.default.login);
router.get('/:placedby/parcels', (0, _accessToken.authorize)(['admin', 'user']), _user2.default.getUserparcels);

exports.default = router;
//# sourceMappingURL=user.js.map
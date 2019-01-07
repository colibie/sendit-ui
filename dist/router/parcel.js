'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _parcel = require('../controller/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _accessToken = require('../middleware/accessToken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var admin = 'admin';
var user = 'user';

router.post('/', (0, _accessToken.authorize)([admin, user]), _parcel2.default.create);

router.get('/', (0, _accessToken.authorize)([admin]), _parcel2.default.getAll);

router.get('/:parcelId', (0, _accessToken.authorize)([admin, user]), _parcel2.default.getById);

router.patch('/:parcelId/destination', (0, _accessToken.authorize)([admin, user]), _parcel2.default.changeDestination);

router.patch('/:parcelId/cancel', (0, _accessToken.authorize)([admin, user]), _parcel2.default.cancel);

router.patch('/:parcelId/status', _parcel2.default.changeStatus);

router.patch('/:parcelId/currentlocation', (0, _accessToken.authorize)([admin]), _parcel2.default.changeLocation);

exports.default = router;
//# sourceMappingURL=parcel.js.map
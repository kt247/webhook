var express = require('express');
var router = express.Router();
var websocket = require('../websocket');

router.get('/', function (req, res, next) {
  res.status(200).send('Webhook');
});

router.post('/', function (req, res, next) {
  // const { type, result, message, data } = req.body;
  // const isValidEvent = Object.keys(websocket.events).some(
  //   (key) => websocket.events[key] === type
  // );
  // if (isValidEvent) {
  websocket.send({
    event: websocket.events.ALIPAY,
    payload: {
      type: websocket.events.ALIPAY,
      result: 200,
      message: 'OK',
      data: {
        Headers: req.headers,
        Body: req.body,
      },
    },
  });
  return res.status(201).json({
    result: 201,
    message: 'Success',
    data: req.body,
  });
  // }
  // res.status(400).json({
  //   result: 400,
  //   message: 'Invalid event',
  // });
});

module.exports = router;

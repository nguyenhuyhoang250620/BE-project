const express =  require('express');
const router = express.Router();
const controller = require('./menu.controller');
const auth = require('../auth/auth.middleware');
console.log(controller);
router.get('/me',auth.authGuard,controller.getMyMenu);

module.exports = router;
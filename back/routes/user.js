const express = require('express');

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const userVerifUser = require('../middlewares/userVerifUser');

const router = express.Router();

router.get('/:id', auth, userCtrl.getOne);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userVerifUser, userCtrl.update);
router.delete('/:id', auth, userVerifUser, userCtrl.delete)

module.exports = router;

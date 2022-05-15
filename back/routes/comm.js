const express = require('express');

const commCtrl = require('../controllers/comm');
const auth = require('../middlewares/auth');
const userVerifComm = require('../middlewares/userVerifComm');

const router = express.Router();


router.post('/:id/likeComm', auth, commCtrl.likeComm);
router.put('/:id', auth, userVerifComm, commCtrl.updateComm);
router.delete('/:id', auth, userVerifComm, commCtrl.deleteComm);


module.exports = router;
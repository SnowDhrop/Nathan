const express = require('express');

const postCtrl = require('../controllers/post');

const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const userVerifPost = require('../middlewares/userVerifPost');

const router = express.Router();


router.post('/', auth, multer, postCtrl.createPost);
router.post('/:id', auth, postCtrl.createComm);
router.post('/:id/likePost', auth, postCtrl.likePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/user/:id', auth, postCtrl.getAllPostsUser)
router.put('/:id', auth, userVerifPost, multer, postCtrl.updatePost);
router.delete('/:id', auth, userVerifPost, postCtrl.deletePost);
// router.get('/:id', auth, postCtrl.getAllPostsUser);

module.exports = router;
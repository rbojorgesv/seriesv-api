const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { updateChapter } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const chapterServices = require('./chapters.http')


router.route('/') //* /api/v1/users/
    .get(chapterServices.getAll)


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,chapterServices.editMyChapter)
    .get(passport.authenticate('jwt', {session: false}), chapterServices.getMyChapter)
    .delete(passport.authenticate('jwt', {session: false}), chapterServices.removeMyChapter)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), updateChapter().single('chapter-video'), chapterServices.postProfileImg)
    //.get()

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),chapterServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, chapterServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,chapterServices.edit)


exports.router = router
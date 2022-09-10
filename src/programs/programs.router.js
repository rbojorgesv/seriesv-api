const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { updateChapter } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const programServices = require('./programs.http')


router.route('/') 
    .get(programServices.getAll)


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,programsServices.editMyProgram)
    .get(passport.authenticate('jwt', {session: false}), programs.getMyProgram)
    .delete(passport.authenticate('jwt', {session: false}), programs.removeMyProgram)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), updateChapter().single('chapter-video'), programsServices.postProfileImg)
   

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),programs.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, programs.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,programs.edit)


exports.router = router
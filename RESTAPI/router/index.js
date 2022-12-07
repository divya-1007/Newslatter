const express = require('express');
const router = express.Router()
const controller = require('../controller/controllerIndex')
router.get('/artical',controller.getArtical )
router.post('/create-artical',controller.createArtical )
router.delete('/delete-artical', controller.deleteArtical)




module.exports = router
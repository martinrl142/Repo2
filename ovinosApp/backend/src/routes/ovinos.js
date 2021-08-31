const { Router } = require('express');
const router = Router();

const { getOvinos, createOvino, getOvino, deleteOvino, updateOvino, getOvinosEstable } = require('../controllers/ovinos.controller');

router.route('/')
    .get(getOvinos)
    .post(createOvino);

router.route('/:id')
    .get(getOvino)
    .delete(deleteOvino)
    .put(updateOvino);

router.route('/:ovinoId')
    .get(getOvinosEstable)

module.exports = router;



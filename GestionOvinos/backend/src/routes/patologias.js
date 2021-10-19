const { Router } = require('express');
const router = Router();

const { getEstables, createEstable, getEstable, deleteEstable, updateEstable } = require('../controllers/establecimientos.controller');

router.route('/')
    .get(getEstables)
    .post(createEstable);

router.route('/:id')
    .get(getEstable)
    .delete(deleteEstable)
    .put(updateEstable);

module.exports = router;



const { Router } = require('express');

const router = Router();
const recipes = require('./recipes');
const types = require('./types');
const recipe = require('./recipe');

router.use('/recipes', recipes)
router.use('/recipe', recipe)
router.use('/types', types)

module.exports = router;
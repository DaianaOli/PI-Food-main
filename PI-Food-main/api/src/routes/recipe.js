const { Router } = require('express');
const{Recipe,TypeDiet} = require('../db')
const router = Router();

router.post('/', async (req,res,next) => {
    let {
        title,
        summary,
        healthScore,
        analyzedInstructions,
        createdInDb,
        typeDiets
    } = req.body;
    if(!title || !summary) {
        return res.status(400).send('Please, insert a title and a summary to continue!');
    }
    else{
    try{let createRecipe = await Recipe.create({   
            title,
            summary,
            healthScore,
            analyzedInstructions,
            createdInDb
    })
    let dietTypeDb = await TypeDiet.findAll({ where:{ name:typeDiets } })
        createRecipe.addTypeDiet(dietTypeDb)
        res.status(200).send('recipe created')   

    }catch(e){
        next(e)
    }
}});

// router.delete('/:id',async (req,res) =>{
//     const {id} = req.params
//     try {
//         let recipe = await Recipe.findByPk(id)
//         await recipe.destroy()
//         res.status(200).send('Recipe deleted')
//     } catch (err) {
//         res.status(400).send('Recipe not found')
//     }
// })


// router.put('/:id', async (req,res,next) => {
//     const {id} = req.params
//     let {
//         title,
//         summary,
//         healthScore,
//         analyzedInstructions,
//         createdInDb,
//         typeDiets
//     } = req.body;
//     if(!title || !summary) {
//         return res.status(400).send('Please, insert a title and a summary to continue!');
//     }
//     else{
//     try{
//         let recipe = await Recipe.findByPk(id)
//         await recipe.update({
//             title,
//             summary,
//             healthScore,
//             analyzedInstructions,
//             createdInDb
//         })
//         let dietTypeDb = await TypeDiet.findAll({ where:{ name:typeDiets } })
//         recipe.addTypeDiet(dietTypeDb)
//         res.status(200).send('recipe updated')   

//     }catch(e){
//         next(e)
//     }
// }
// });
module.exports= router;
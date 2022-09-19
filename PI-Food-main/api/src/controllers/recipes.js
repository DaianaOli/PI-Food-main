// es este archivo voy a obtener todas las recetas, tanto de la API como de la DB
require('dotenv').config();
const axios= require('axios');
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY } = process.env;

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

     const apiInfo = await apiUrl.data.results.map(e =>{
         return {
             id: e.id, 
             title: e.title,
             img: e.image,
             typeDiets: e.diets.map((d)=> {return{name:d}}), // un array con los tipos de dieta de esa receta
             dishTypes: e.dishTypes.map((d)=> {return{name:d}}), 
             summary: e.summary,            
             healthScore: e.healthScore,    
             analyzedInstructions: e.analyzedInstructions
            }
            
     })

    return apiInfo
}


const getDBInfo = async () => {
    return await Recipe.findAll({
        include : {
            model : TypeDiet,
            attributes : ['name'],
            through: {
                attributes:[]
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDBInfo()
    const allRecipes = [...apiInfo,...dbInfo]

    return allRecipes

}


async function getAallRecipes(req, res) {
    const { name } = req.query;                         
    if (!name) {                                       
      try {
        const recipeApiInfo = await getApiInfo()       
        const recipeBD = await Recipe.findAll({         
          include: {
            model: TypeDiet,                             
            attributes: ["name"],                      
            through: {
              attributes: [],
            },
          },
        });
        return res.send(await Promise.all([...recipeApiInfo,...recipeBD])); 
       
      } catch(err) {
        res.json({err})
        console.error(err);
    }
    } else {                                     
      const query = name.toLowerCase();       
      try {
        const recipeApiInfo = await getApiInfo()
        const recipeApi = recipeApiInfo.filter((r) =>{
          if(r.title.toLowerCase().includes(query)){     
            return r                                   
          }
         } 
        );
  
        const recipeBD = await Recipe.findAll({      
          where: {
            title:{[Sequelize.Op.like]:`%${query}%`}  
          },                  
          include : {
            model : TypeDiet,
            attributes : ['name'],               
            through: {
                attributes:[]
            }
        },
        });
  
        const respuesta = await Promise.all(recipeBD.concat(recipeApi))
        if(respuesta.length===0) res.send(await getAllRecipes())
        return res.send(respuesta)                             
      } catch(err) {
        res.json({err})
        console.error(err)
    }
    }
  }



// 
module.exports= {
    getAllRecipes,
    getDBInfo,
    getApiInfo,
     getAallRecipes
}
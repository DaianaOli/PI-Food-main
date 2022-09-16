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
             dishTypes: e.dishTypes.map((d)=> {return{name:d}}), // tipo de plato
             summary: e.summary,            // un resumen del plato
             healthScore: e.healthScore,    // que tan saludable es
             analyzedInstructions: e.analyzedInstructions// el paso a paso de como se hace 
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
    const { name } = req.query;                         // pido el name por query
    if (!name) {                                        // si no viene ningun nombre entra al if
      try {
        const recipeApiInfo = await getApiInfo()        // pido todas las recetas que tengo en la api
        const recipeBD = await Recipe.findAll({         // pido todas las recetas que tengo en la base de datos
          include: {
            model: TypeDiet,                             // le pido que incluya el modelo Typediet
            attributes: ["name"],                        // con la propiedad name
            through: {
              attributes: [],
            },
          },
        });
        return res.send(await Promise.all([...recipeApiInfo,...recipeBD])); // una vez que terminan todas la promesas, le pido que concatene todas la recetas
       
      } catch(err) {
        res.json({err})
        console.error(err);
    }
    } else {                                     // si viene un nombre por params, va a entrar a este else
      const query = name.toLowerCase();          // hago que el nombre lo pase todo a minuscula , asi no tengo problemas mas adelante para filtrar
      try {
        const recipeApiInfo = await getApiInfo()
        const recipeApi = recipeApiInfo.filter((r) =>{
          if(r.title.toLowerCase().includes(query)){     // si el titulo de la receta que traigo desde la api , incluye el nombre que me pasaron por params 
            return r                                     // va a retornarlo dentro del array del filter
          }
         } 
        );
  
        const recipeBD = await Recipe.findAll({       // los mismo que lo anterior, pero ahora desde la DB
          where: {
            title:{[Sequelize.Op.like]:`%${query}%`}  // op(funcion de sql) --> va a filtrar si encuentra algun titulo parecido al nombre que me pasan por query 
          },                                          // %${query}% --> el % va en los dos lados para decir que lo contenga   
          include : {
            model : TypeDiet,
            attributes : ['name'],                   // hago que en la respuesta , tambien me traiga el tiop de dieta
            through: {
                attributes:[]
            }
        },
        });
  
        const respuesta = await Promise.all(recipeBD.concat(recipeApi)) // una vez que terminan todas la promesas , concateno las dos informaciones
        if(respuesta.length===0) res.send(await getAllRecipes()) // si no matcheo ninguna de las dos, es decir que no existe el nombre que me pasaron lor query
        return res.send(respuesta)                              // le pido que me devuelva todas las recetas
  
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
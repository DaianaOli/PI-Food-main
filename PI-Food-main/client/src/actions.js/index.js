import axios from 'axios';
const GET_RECIPES = 'GET_RECIPES';
const FILTER_BY_TYPEDIET = 'FILTER_BY_TYPEDIET';
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_PUNTUATION = 'ORDER_BY_PUNTUATION';
const GET_BY_NAME = 'GET_BY_NAME';
const GET_BY_ID = 'GET_BY_ID';
const  GET_TYPE_DIETS = 'GET_TYPE_DIETS';
const DELETE_RECIPE = 'DELETE_RECIPE';


export function getRecipes(){
     return async function(dispatch){
         var json = await axios.get(`http://localhost:3001/recipes`);
         return dispatch({
             type : GET_RECIPES,
             payload: json.data
         })
     }
}



export function filterRecipesByTypeDiet (payload){
    return {
        type : FILTER_BY_TYPEDIET,
        payload
    }
}

export function orderByName (payload){
    return {
        type : ORDER_BY_NAME,
        payload
    }
}

export function orderByPuntuation (payload){
    return {
        type : ORDER_BY_PUNTUATION,
        payload
    }
}

export function getRecipesByName (name){
    return async function(dispatch){
        await axios.get(`http://localhost:3001/recipes?name=${name}`)
        .then((response) =>{
            return dispatch({type: GET_BY_NAME, payload: response.data})
            }).catch((error) =>{
            alert("Recipe not found")
            })
    } 
}

export function getRecipesById (id){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch( {
        type : GET_BY_ID,
        payload: json.data
    })
}
}

export function getTypeDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/types`);
        return dispatch( {
            type : GET_TYPE_DIETS,
            payload: json.data
        })

    }
}

export function postRecipes (payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipe`,payload);
        return json
    }
}

export function deleteRecipes (id){
    return async function(dispatch){
        var json = await axios.delete(`http://localhost:3001/recipe/${id}`);
        return dispatch({
            type : DELETE_RECIPE,
            payload: json.data
        })
    }
    
}

// export function putRecipes (id, payload){
//     return async function(dispatch){
//         var json = await axios.put(`http://localhost:3001/recipe/${id}`,payload);
//         return json
//     }
// }
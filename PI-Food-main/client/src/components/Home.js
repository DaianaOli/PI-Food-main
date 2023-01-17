import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes , filterRecipesByTypeDiet , orderByName , orderByPuntuation,getRecipesByName, deleteRecipes} from "../actions.js/index.js";
import Card from "./Card";
import Paginado from "./Paginado";
import './Home.css'

export default function Home () {
const dispatch = useDispatch();
const allRecipes = useSelector((state) => state.recipes ) 

useEffect(() => {
    dispatch(getRecipes())   
},[dispatch]);

const[search,setSearch] =useState('')             // este es para el searchBar  
// eslint-disable-next-line                                  
const[orden,setOrden] =useState('')
// eslint-disable-next-line
const[order,setOrder] =useState('')
const[currentPage,setCurrentPage] =useState(1)     
   // eslint-disable-next-line
const[recipesPerPage,setrecipesPerPage]=useState(9)
const indexLastRecipe = currentPage * recipesPerPage                            // | --> esto es para el paginado
const indexFirstRecipe = indexLastRecipe - recipesPerPage                       // |
const currentRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe)       // |
//  console.log(allRecipes)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

function handleOnClick(e){
e.preventDefault();
dispatch(getRecipes())   // con este handle, hago que me traiga devuelta todas las recetas,sin ningun filtro
}

function handleFilterTypeDiet (e) {
    dispatch(filterRecipesByTypeDiet(e.target.value))
}
function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`)

}
function handlePuntuation (e) {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value))
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`)
}

function handleSubmit (e){
        e.preventDefault(e)
        dispatch(getRecipesByName(search))
        setSearch('')
} 
function handleInputName (e){
        setSearch(e.target.value)
}

// function capGluten(e){
//     if(e.target.value === 'gluten free'){
//     dispatch(filterRecipesByTypeDiet(e.target.value))
//     }
//     else {
//         console.log ('error')
//     }
//     console.log(e.target.value)
// }

return (
    <div className='bkg'>
    <div className="botones">
    <Link to='/'>
    <button className="button"> Landing Page</button>
    </Link>
    <Link to = '/recipe'> 
    <button className='button'>Create Recipe </button>
    </Link>
    </div>
    <div className='search'>
     <form onSubmit={(e) => {handleSubmit(e)}}> {/* este es para hacer enter y que funcione */}

    <input  type='text' placeholder='search by name...' value={search} onChange={(e) => {handleInputName(e)}} className='input'></input>
    <button  type='submit' className='btnsearch'>search</button>
    </form>
    
    </div>
    <div className='filterC'>
        <button onClick = {e => handleOnClick(e)} className='refresh'> Refresh Recipes</button>                
                <div className='filt'>

                <select onChange={e => handleSort(e)} className='select'>
                    <option value="asc">ascendent(A-Z)</option>
                    <option value="des">descendent(Z-A)</option>
                </select>
                </div>
                {/* <button onClick= {e=> capGluten(e)} value='gluten free'>Gluten Freen</button> */}
                <div>
                <select  onChange={e => handlePuntuation(e)} className='select'>
                    <option value="">Order for healthScore</option>
                    <option value="menormayor">lowest to highest score</option>
                    <option value="mayormenor">highest to lowest score</option>
                    <option value='mayorcincuenta'>over 50</option>
                    <option value='menorcincuenta'>less than 50</option>
                    
                </select>
                
                </div>
                <div>
                <select onChange={e => handleFilterTypeDiet(e)} className='select'>
                    <option value="All">All recipes</option>
                    <option value="createdInDb">Data Base</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                </div>
    </div>

    <div className='paginado'> 
            <Paginado
            key='paginado'
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            paginado= {paginado}
            />
            </div>     

        <div className='cards'>
            {currentRecipes? currentRecipes.map(e => {
                return (
                    <div key={e.id}>
                    <Link to={'/recipes/' + e.id}>
                    <Card 
                    title={e.title} 
                    img={e.img}  
                    typeDiets={e.typeDiets} 
                    />
                   
                    </Link>{e.createdInDb ?  <button onClick={() => dispatch(deleteRecipes(e.id))}>Delete</button> : null}
                       
                    </div>
                    )  
                })      
                : <h1>There are no recipes</h1>
            }
            </div> 
    </div>
)
}
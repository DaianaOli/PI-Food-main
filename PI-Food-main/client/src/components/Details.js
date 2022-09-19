import React from "react";
import {getRecipesById} from '../actions.js/index.js';
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './Details.css'

export default function Detail (props){
  const   {id} = useParams()
  const dispatch = useDispatch() 
  useEffect (() => {
    if(id){
       dispatch(getRecipesById(id))
       }
    return () => {
      dispatch({type: 'GET_BY_ID', payload: {}})
    }
    }, [dispatch,id])
 const detailsstate = useSelector((state) => state.details)
 
  return (
      <div className="cont">
       
     { 
       detailsstate.length > 0 ? 
       
       <div className='dt'> 
           <Link to='/home'><button className='btn'>Back to Home </button> </Link>
           <h1 className='title'> {detailsstate[0].title} </h1>
           <img className='imga' src={detailsstate[0].img ? detailsstate[0].img :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
           <div className='resumen'>
           <h5 className='type'>Summary: {detailsstate[0].summary.replace(/(<([^>]+)>)/gi, "")}</h5>
           <h3 className='type' >Type Diet: {detailsstate[0].typeDiets.map(t =>(
            <li>{t.name}</li>
           ))
            } </h3>
            <h5 className='type'>Steps:
           <ol>{ Array.isArray(detailsstate[0].analyzedInstructions) ? detailsstate[0].analyzedInstructions.map(e => e.steps.map(f => (
           <li>{f.step}</li>))) : detailsstate[0].analyzedInstructions }</ol></h5>
           <h4 className='type'>Dish Type: {detailsstate[0].dishTypes ? detailsstate[0].dishTypes.map(d => d.name) :'dish type not found'  }</h4>
           
           <h5 className='type'>HealthScore: {detailsstate[0].healthScore}</h5>
           
       </div> 
       </div>: 
       <div className="carg">
       
       <div className="spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
       </div>
       </div>
    }
        </div>
    )
}
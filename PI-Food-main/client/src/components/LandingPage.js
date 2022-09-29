import React from "react";
import { Link } from "react-router-dom";
import  './LandingPage.css';

export default function LandingPage(){
    return (
        <div className= 'landing'>
            <h1 className='wlc'>Foods PI Henry</h1>
            <p className="description" >Gastronomy is the art of preparing dishes in the most perfect way
possible, both in its flavoring and in its presentation is the art and science
of good eating and as an art requires the interaction of the five senses</p>
            <Link to= '/home'> 
            <button className='button'>Go to the main page</button>
            </Link>
            <div className="my">
            This page was created by <a href="https://www.linkedin.com/in/luz-daiana-olivares-/" target="_blanck">Luz Daiana Olivares</a> 
            </div> 
        </div> 
    ) 
}
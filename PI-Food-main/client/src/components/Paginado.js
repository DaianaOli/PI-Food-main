import React from "react";
import './Paginado.css'

export default function Paginado ({recipesPerPage ,  allRecipes , paginado}) {
const pageNumbers = []
    for (let i = 0 ; i < Math.ceil(allRecipes/recipesPerPage) ; i++){
   pageNumbers.push(i+1)
}
return (
          
    <nav  >
        <ul className='ul' >
            {
                pageNumbers && pageNumbers.map(n => (
                    <li key={n}  >
                    <p className='container' onClick= {() => paginado(n)} >{n}</p>
                    </li>
                ))
            }
        </ul>
    </nav>
            
)
}
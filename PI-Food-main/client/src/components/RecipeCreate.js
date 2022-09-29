import React, {useEffect , useState} from "react";
import { Link } from "react-router-dom";
import {getTypeDiets , postRecipes} from '../actions.js/index.js';
import { useDispatch, useSelector } from "react-redux";
import  './RecipeCreate.css'

function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.title) errors.title= 'please put the title of the recipe'
    if(!input.summary) errors.summary= 'please put the summary of the recipe'
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore='put a healthScore between 0-100'
    if(!input.typeDiets) errors.typeDiets='please put the typeDiets of the recipe'
    return errors
}


export default function CreateRecipe() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.typediets )
    const [errors,setErrors]=useState({})      // este estado local es para, las validaciones(del formulario controlado)
    const [step, setStep] = useState(1)        
    const [listSteps, setListSteps] = useState([])  
    const [stepDescription, setStepDescription] = useState('')
    const [input,setInput] = useState({
        title :'',
        summary:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[],
    })
    // console.log(input);
    useEffect(() => {
        dispatch(getTypeDiets())
        },[dispatch])

    useEffect(() => {
        const stepsString = listSteps.join('|')
        setInput({
            ...input,
            analyzedInstructions :stepsString,
        }) // eslint-disable-next-line
    },[listSteps,]) 

    
 function handleChange(e){
        setInput({
            ...input,
    [e.target.name] : e.target.value
})
        setErrors(controlForm({
            ...input,
            [e.target.name] : e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                               // no cumpla con las validaciones, se va a poner un texto advirtiendo
}

function handleSelect(e){
    setInput({
        ...input,
        typeDiets:[...input.typeDiets, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postRecipes(input))
    if(input.title && input.summary && input.healthScore && input.analyzedInstructions && input.typeDiets){
        alert('recipe created')
        setInput({
            title :'',
            summary:'',
            healthScore:'',
            analyzedInstructions:'',
            typeDiets:[]
        })
    }
    else alert('please fill all the fields')
}
function handleDelete(e){
    setInput({
        ...input,
        typeDiets: input.typeDiets.filter(diet => diet !== e )
    }) //este es para borrar algun tipe diet que haya elegido, va a creat un nuevo array con todos los que no sean
}//    el elemento que le hice click

function handleChangeStep(e){
    setStepDescription(e.target.value)
}


function handleStep (e){
    e.preventDefault();
    if(stepDescription !== ''){
        setListSteps([
            ...listSteps,
            stepDescription
        ])
        setStep(step + 1)
        setStepDescription('')
    }
    else{
        alert('please put a step')
    }
}
// console.log("input" ,input);
    return (
        <div className='bkgs'>
        <div className='containers'>
            <Link to ='/home' ><button className='btn'>Back to the main page</button></Link>
            <h1 className='h1'>Create you recipe</h1>
            <form onSubmit={(e) => {handleSubmit(e)}} className='form'>
                <div>
                    <label>Name:</label>
                    <input
                    type='text'
                    name='title'
                    value={input.title}
                    onChange={(e) => {handleChange(e)}}
                    />
                    { errors.title && (
                        <p className='error'>{errors.title}</p>
                    ) }
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                    type='text'
                    name='summary'
                    value={input.summary}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.summary && (
                        <p className='error'>{errors.summary}</p>
                    ) }
                </div>
                <div>
                    <label>HealthScore:</label>
                    <input
                    type='text'
                    name='healthScore'
                    value={input.healthScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                     { errors.healthScore && (
                        <p className='error'>{errors.healthScore}</p>
                    ) }
                </div>
                <div>
                    <label>Step by step:</label>
                    <input
                    type='text'
                    name='analyzedInstructions'
                    value={stepDescription}
                    onChange={handleChangeStep} 
                    /> <button onClick={handleStep} className='btn'>Add</button>
                </div>
                <select onChange={(e) => handleSelect(e)} className='select' >
                    {listDiets?.map((t) => {
                    
                    return <option key={t} value={t}> {t} </option>
                    
                    })}
                </select >
                {errors.hasOwnProperty('title') || errors.hasOwnProperty('summary')|| errors.hasOwnProperty('healthScore') ?  <p className='adv'> please complete all the inputs to create your recipe</p> : <button type='submit' className='btn'> Create Recipe</button>  }

            </form>
            
            {input.typeDiets.map(e => {
            return(
            <div key='typeDiets' >
                    <h5 className='types'>{e}</h5>
                    <button className='btnx' onClick={() => handleDelete(e)}>X</button>

            </div>
            )})}
        </div>
        </div>
    )

}
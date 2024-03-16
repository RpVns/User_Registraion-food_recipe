import React from 'react'

export const Receipe = (prop) => {
    
    return (
    <div className='card'>
        <div>{prop.label}</div>
        <img src={prop.img} alt="Image Not Found"/>
        <a href={prop.url} target="_blank" rel="noopener
        noreferrer"><h4>RECIPE</h4></a>
        
        
    </div>
  )
}
export default Receipe;
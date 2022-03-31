import React from "react";
import './obaveze.css'

const Obaveze = ({obaveza}) =>{

    if(obaveza.izvrseno===false){
      return(       
        <tr>
        <td>{obaveza.sadrzaj}</td>   
        <td>{obaveza.datum}</td>  
        <td>        </td>                
        </tr>
        )
    }
    else if(obaveza.izvrseno===true){
        return(
        <tr>
        <td id="izvrseno">{obaveza.sadrzaj}</td>   
        <td id="izvrseno">{obaveza.datum}</td>  
        <td id="izvrseno">        </td>                
        </tr>
        )
    }

}


export default Obaveze
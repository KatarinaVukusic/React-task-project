import React from "react";
import './obaveze.css'

const Obaveze = ({obaveza,promjenaIzvrsenosti,brisiObavezu}) =>{
    const oznakaZaIzvrsenost = obaveza.izvrseno
    ? 'Izvrseno' : 'Nije izvrseno'

    const oznakaZaVaznost = obaveza.vazno
    ? 'Vazno' : 'Nije vazno'

    if(obaveza.izvrseno===false){
      return(       
        <tr className="obaveza">
        <td>{obaveza.sadrzaj}</td>   
        <td>{obaveza.datum}</td>  
        <td><button id="izv" onClick={promjenaIzvrsenosti}>{oznakaZaIzvrsenost}</button>        </td>                
        <td><button id="izv" onClick={brisiObavezu}><span role="img" aria-label="delete">❌ </span></button></td> 
        <td>{oznakaZaVaznost}</td> 
        </tr>
        )
    }
    else if(obaveza.izvrseno===true){
        return(
        <tr>
        <td id="izvrseno">{obaveza.sadrzaj}</td>   
        <td id="izvrseno">{obaveza.datum}</td>  
        <td id="izvrseno"><button id="izv" onClick={promjenaIzvrsenosti}>{oznakaZaIzvrsenost}</button></td>                
        <td id="izvrseno"><button id="izv" onClick={brisiObavezu}><span role="img" aria-label="delete">❌ </span></button></td> 
        <td id="izvrseno">{oznakaZaVaznost}</td> 
        </tr>
        )
    }

}


export default Obaveze
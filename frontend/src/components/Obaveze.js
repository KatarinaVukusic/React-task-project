import React from "react";

const Obaveze = ({obaveza}) =>{

    return(       
        <tr>
        <td>{obaveza.sadrzaj}</td>   
        <td>{obaveza.datum}</td>                  
        </tr>
    )
}

export default Obaveze
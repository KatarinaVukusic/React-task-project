import React from "react";

const Obaveze = ({obaveza}) =>{
    return(
        <li>{obaveza.sadrzaj} | {obaveza.datum}</li>
    )
}

export default Obaveze
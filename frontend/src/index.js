import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Obaveza from './components/Obaveze';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const popis = [
  {
  id: 1,
  sadrzaj: 'Pripremiti razgovor za posao',
  datum: '24.3.2022.',
  vazno: true,
  izvrseno: false
  },
  {
  id: 2,
  sadrzaj: 'Otići u dućan',
  datum: '22.3.2022.',
  vazno: false,
  izvrseno: false
  },
  {
  id: 3,
  sadrzaj: 'Napisati domaći',
  datum: '23.3.2022.',
  vazno: true,
  izvrseno: false
  }
 ]


const App = (props) => {
    const [nizObaveza, postaviObaveze]=useState(props.obaveza)
    const[unosObaveze, postaviUnos]=useState('')
    const[unosDatum, postaviDatum]=useState(null)
    const[unosVazno,postaviVazno]=useState(false)
    const [prikaziFormu,postaviPrikaz]=useState(false)

    const Forma =()=>{
      if(prikaziFormu===false)
         postaviPrikaz(true)   
      else
         postaviPrikaz(false)  
    }


    const noviUnos = (e) => {

      e.preventDefault()
   
      console.log(unosDatum)
      console.log(unosVazno)
      console.log(unosObaveze)
      console.log('Klik',e.target)

      const noviObjekt ={
        id: popis.length +1,
        sadrzaj: unosObaveze,
        datum: unosDatum,
        vazno: unosVazno,
        izvrseno: false
      }
      postaviObaveze(popis.concat(noviObjekt))
      postaviUnos('')
      postaviDatum(null)
      postaviVazno(false)
       postaviPrikaz(false)
    }

    const promjenaNaziva = (e) => {
      postaviUnos(e.target.value)
      
    }

    const handleChange = () => {
      postaviVazno(!unosVazno);
    };

if(prikaziFormu===false){
return(
  <div>
       <p>To-do lista</p>
       <ul>
            {popis.map(p =>
              <Obaveza key={p.id} obaveza={p}/>
              )}
       </ul>
       <button onClick={Forma}>Unos nove obaveze</button>  
  </div>
)
}else{
  return(
  <form className="unos" onSubmit={noviUnos}>  
     <div className="form-group">
        <label>Naziv obaveze:</label>
        <input type="text" id="naziv" value={unosObaveze} onChange={promjenaNaziva}/> 
     </div>
     <div className="form-group">
       <label>Vazno: </label>    
       <input type="checkbox" checked={unosVazno} onChange={handleChange}/> 
     </div>
     <div className="form-group">
       <label>Datum: </label>    
   
     <DatePicker selected={unosDatum} onChange={datum => postaviDatum(datum)}/>
     </div>
     <button type='submit'>OK</button>
     <button onClick={Forma} >Odustani</button>
    </form>)
}
}

ReactDOM.render(<App obaveza={popis} />, document.getElementById('root')
);


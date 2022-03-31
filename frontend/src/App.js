import React, {useState} from 'react'
//import ReactDOM from 'react-dom';
import Obaveze from './components/Obaveze'
import './index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = (props) => {
    const [obaveze, postaviObaveze]=useState(props.obaveze)
    const [unosSadrzaj, postaviUnos]=useState('')
    const [unosDatum, postaviDatum]=useState(null)
    const [unosVazno,postaviVazno]=useState(false)
    const [prikaziFormu,postaviPrikaz]=useState(false)
    const [ispisSvih,postaviIspis]=useState(true)
   

    const obavezeIspis = ispisSvih 
    ? obaveze
    : obaveze.filter(p => p.vazno ===true)
  
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
      console.log(unosSadrzaj)
      console.log('Klik',e.target)   
      
      const noviObjekt ={
        id: obaveze.length +1,
        sadrzaj: unosSadrzaj,
        datum: unosDatum.toString().slice(0,15),
        vazno: unosVazno,
        izvrseno: false
      }
      postaviObaveze(obaveze.concat(noviObjekt))
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
       <table>
         <thead>
           <tr>
             <th>Obaveza</th>
             <th>Datum</th>
             <th>Izvrsenost</th>
            </tr>
         </thead>
         <tbody>                 
             {obavezeIspis.map(p =>
              <Obaveze key={p.id} obaveza={p}/>
              )}                 
         </tbody>
       </table>
       <button onClick={Forma}>Unos nove obaveze</button>
       <button onClick={() => postaviIspis(!ispisSvih)}>Prikaži { ispisSvih ? "samo važne" : "sve"}</button>    
  </div>
)
}else{
  return(
  <form className="unos" onSubmit={noviUnos}>  
     <div className="form-group">
        <label>Naziv obaveze:</label>
        <input type="text" id="naziv" value={unosSadrzaj} onChange={promjenaNaziva}/> 
     </div>
     <div className="form-group">
       <label>Vazno: </label>    
       <input type="checkbox" checked={unosVazno} onChange={handleChange}/> 
     </div>
     <div className="form-group">
       <label>Datum: </label>    
   
     <DatePicker minDate={new Date()} selected={unosDatum} dateFormat='dd/MM/yyyy' onChange={datum => postaviDatum(datum)}/>
     </div>
     <button type='submit'>OK</button>
     <button onClick={Forma} >Odustani</button>
    </form>)
}
}
export default App
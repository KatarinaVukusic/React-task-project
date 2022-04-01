import React, {useState,useEffect} from 'react'
//import ReactDOM from 'react-dom';
import Obaveze from './components/Obaveze'
import './index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'


const App = (props) => {
    const [obaveze, postaviObaveze]=useState([])
    const [unosSadrzaj, postaviUnos]=useState('')
    const [unosDatum, postaviDatum]=useState(null)
    const [unosVazno,postaviVazno]=useState(false)
    const [prikaziFormu,postaviPrikaz]=useState(false)
    const [ispisSvih,postaviIspis]=useState(true)
   
    useEffect( () => {
      axios.get("http://localhost:3001/api/obaveze")
      .then(res => postaviObaveze(res.data))
      }, [])


    const obavezeIspis = ispisSvih 
    ? obaveze
    : obaveze.filter(p => p.izvrseno ===true)
  
    const Forma =()=>{
      if(prikaziFormu===false)
         postaviPrikaz(true)   
      else
         postaviPrikaz(false)  
    }

    const promjenaIzvrsenostiObaveze = (id) => {
      const url = `http://localhost:3001/api/obaveze/${id}`
      const obaveza = obaveze.find(o => o.id === id)
      const modObaveza = {
         ...obaveza,
         izvrseno: !obaveza.izvrseno
      }
      axios.put(url, modObaveza)
      .then(response => {
         postaviObaveze(obaveze.map(o => o.id !==id ? o : response.data))
      })

      console.log("Moramo promijeniti važnost poruke", id);
    }

    const brisiObavezu = (id) => {
      
      axios.delete(`http://localhost:3001/api/obaveze/${id}`)
      .then(response => {
      console.log(response);
      postaviObaveze(obaveze.filter(p => p.id !== id))
      })
      }


    const noviUnos = (e) => {

      e.preventDefault()

      console.log('Klik',e.target)   
      
      const noviObjekt ={
        sadrzaj: unosSadrzaj,
        datum: unosDatum.toString().slice(0,15),
        vazno: unosVazno,
        izvrseno: false
      }
      axios
      .post('http://localhost:3001/api/obaveze',noviObjekt)
      .then(response => {
        postaviObaveze(obaveze.concat(response.data))
        postaviUnos('')
       
      })
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
             <th>Izbrisi</th>
             <th>Vaznost</th>
            </tr>
         </thead>
         <tbody>                 
             {obavezeIspis.map(p =>
              <Obaveze    
              key={p.id}          
              obaveza={p} 
              promjenaIzvrsenosti={ () => promjenaIzvrsenostiObaveze(p.id)}
              brisiObavezu={() => brisiObavezu(p.id)}/>
              )}                 
         </tbody>
       </table>
       <button onClick={Forma}>Unos nove obaveze</button>
       <button onClick={() => postaviIspis(!ispisSvih)}>Prikaži { ispisSvih ? "samo izvršene" : "sve"}</button>    
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
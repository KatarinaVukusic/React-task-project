import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import Obaveze from "./components/Obaveze";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import obavezeAkcije from "./services/obaveze";
import prijavaAkcije from './services/login';
//import {VictoryBar,VictoryChart,VictoryTheme} from 'victory';


const App = () => {
  const [obaveze, postaviObaveze] = useState([]);
  const [unosSadrzaj, postaviUnos] = useState("");
  const [unosDatum, postaviDatum] = useState(null);
  const [unosVazno, postaviVazno] = useState(false);
  const [prikaziFormu, postaviPrikaz] = useState(false);
  const [ispisSvih, postaviIspis] = useState(true);
  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
  const [korisnik, postaviKorisnika] = useState(null)
  const [ukupno,postaviUkupno]=useState(0)
 
  useEffect(() => {
    obavezeAkcije.dohvatiSve().then((res) => {
      postaviObaveze(res.data)
      postaviUkupno(res.data.length)  
    });
    
  }, []);

  useEffect( () => {
    const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
    if (logiraniKorisnikJSON) {
    const korisnik = JSON.parse(logiraniKorisnikJSON)
    postaviKorisnika(korisnik)
    obavezeAkcije.postaviToken(korisnik.token)
    }
    }, [])

  const obavezeIspis = ispisSvih
    ? obaveze
    : obaveze.filter((p) => p.izvrseno === true);

  const Forma = () => {
    if (prikaziFormu === false) postaviPrikaz(true);
    else postaviPrikaz(false);
  };

  const userLogin = async (e) => {
    e.preventDefault()
 try{
     const korisnik = await prijavaAkcije.prijava({
     username, pass
    })
     window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))
     postaviKorisnika(korisnik)
     obavezeAkcije.postaviToken(korisnik.token)
     console.log(korisnik)
     postaviUsername('')
     postaviPass('')
    } catch (exception){
       alert('Neispravni podaci')

    }

  };


  const promjenaIzvrsenostiObaveze = (id) => {
    const obaveza = obaveze.find((o) => o.id === id);
    const modObaveza = {
      ...obaveza,
      izvrseno: !obaveza.izvrseno,
    };
    obavezeAkcije.osvjezi(id, modObaveza)
    .then
    ((response) => {
      postaviObaveze(obaveze.map((o) => (o.id !== id ? o : response.data)));
      

    });
  };

  const brisiObavezu = (id) => {
    obavezeAkcije.brisi(id).then((response) => {

      postaviObaveze(obaveze.filter((p) => p.id !== id));
      postaviUkupno(obaveze.length -1)   
  
    });
  };

  const noviUnos = (e) => {
    e.preventDefault();

    console.log("Klik", e.target);

    const noviObjekt = {
      sadrzaj: unosSadrzaj,
      datum: unosDatum.toString().slice(0, 15),
      vazno: unosVazno,
      izvrseno: false,
    };
    obavezeAkcije.stvori(noviObjekt)
    .then((response) => {
      postaviObaveze(obaveze.concat(response.data));
      postaviUnos("");
      postaviUkupno(obaveze.length+1)    
      });     
  
    postaviDatum(null);
    postaviVazno(false);
    postaviPrikaz(false);
  };

  const promjenaNaziva = (e) => {
    postaviUnos(e.target.value);
  };

  const handleChange = () => {
    postaviVazno(!unosVazno);
  };

 const loginForma =() =>{
  return(
  <form onSubmit={userLogin}>
          <div>
            Korisničko ime:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(event) => postaviUsername(event.target.value)}
            />
          </div>
          <div>
            Lozinka:
            <input
              type="password"
              value={pass}
              name="Pass"
              onChange={({ target }) => postaviPass(target.value)}
            />
          </div>
          <button type="submit">Prijava</button>
        </form>)
 }

 const novaObaveza = () => {
 return(
 <div>
  <button onClick={Forma}>Unos nove obaveze</button>
  <button onClick={() => postaviIspis(!ispisSvih)}>
    Prikaži {ispisSvih ? "samo izvršene" : "sve"}
  </button>
  </div>)
 }

  if (prikaziFormu === false) {
    return (
      <div>
        <h1>To-do lista</h1>   
        {korisnik === null ? loginForma() : <div>
 <p>Prijavljeni ste kao: {korisnik.username}</p>
 {novaObaveza()}
 </div>}
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
            {obavezeIspis.map((p) => (
              <Obaveze
                key={p.id}
                obaveza={p}
                promjenaIzvrsenosti={() => promjenaIzvrsenostiObaveze(p.id)}
                brisiObavezu={() => brisiObavezu(p.id)}
              />
            ))}
          </tbody>
        </table>
         <p>{ukupno}</p>

      </div>
    );
  } else {
    return (
      <form className="unos" onSubmit={noviUnos}>
        <div className="form-group">
          <label>Naziv obaveze:</label>
          <input
            type="text"
            id="naziv"
            value={unosSadrzaj}
            onChange={promjenaNaziva}
          />
        </div>
        <div className="form-group">
          <label>Vazno: </label>
          <input type="checkbox" checked={unosVazno} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Datum: </label>

          <DatePicker
            minDate={new Date()}
            selected={unosDatum}
            dateFormat="dd/MM/yyyy"
            onChange={(datum) => postaviDatum(datum)}
          />
        </div>
        <button type="submit">OK</button>
        <button onClick={Forma}>Odustani</button>
      </form>
    );
  }
};
export default App;

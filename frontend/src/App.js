import React, { useState, useEffect } from "react";
import Obaveze from "./components/Obaveze";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import obavezeAkcije from "./services/obaveze";
import prijavaAkcije from "./services/login";
import DonutChart from "react-donut-chart";
import Kalendar from "./components/Kalendar";

const App = () => {
  const [obaveze, postaviObaveze] = useState([]);
  const [unosSadrzaj, postaviUnos] = useState("");
  const [unosDatum, postaviDatum] = useState(null);
  const [unosVazno, postaviVazno] = useState(false);
  const [prikaziFormu, postaviPrikaz] = useState(false);
  const [ispisSvih, postaviIspis] = useState(true);
  const [sortDatum, postaviSort] = useState(false);
  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
  const [korisnik, postaviKorisnika] = useState(null);
  const [ukupno, postaviUkupno] = useState(0);
  const [brojIzvrsenih, postaviBrojIzvrsenih] = useState(0);
  const [brojNeIzvrsenih, postaviBrojNeIzvrsenih] = useState(0);

  useEffect(() => {
    obavezeAkcije.dohvatiSve().then((res) => {
      postaviObaveze(res.data);
      postaviUkupno(res.data.length);
      const d = res.data;
      d.forEach((element) => {
        if (element.izvrseno === true) postaviBrojIzvrsenih((izvr) => izvr + 1);
        else if (element.izvrseno === false)
          postaviBrojNeIzvrsenih((neizvr) => neizvr + 1);
      });
    });
  }, []);

  useEffect(() => {
    const logiraniKorisnikJSON = window.localStorage.getItem(
      "prijavljeniKorisnik"
    );
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON);
      postaviKorisnika(korisnik);
      obavezeAkcije.postaviToken(korisnik.token);
    }
  }, []);

  const obavezeIspis = ispisSvih
    ? obaveze
    : obaveze.filter((p) => p.izvrseno === true);

  const obavezeDatum = sortDatum
    ? obaveze.sort((a, b) => new Date(b.datum) - new Date(a.datum))
    : obaveze.sort((a, b) => new Date(a.datum) - new Date(b.datum));

  const Forma = () => {
    if (prikaziFormu === false) postaviPrikaz(true);
    else postaviPrikaz(false);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const korisnik = await prijavaAkcije.prijava({
        username,
        pass,
      });
      window.localStorage.setItem(
        "prijavljeniKorisnik",
        JSON.stringify(korisnik)
      );
      postaviKorisnika(korisnik);
      obavezeAkcije.postaviToken(korisnik.token);
      console.log(korisnik);
      postaviUsername("");
      postaviPass("");
    } catch (exception) {
      alert("Neispravni podaci");
    }
  };

  const promjenaIzvrsenostiObaveze = (id) => {
    const obaveza = obaveze.find((o) => o.id === id);
    const modObaveza = {
      ...obaveza,
      izvrseno: !obaveza.izvrseno,
    };

    if (obaveza.izvrseno === false) {
      postaviBrojIzvrsenih((izvr) => izvr + 1);
      postaviBrojNeIzvrsenih((neizvr) => neizvr - 1);
    } else if (obaveza.izvrseno === true) {
      postaviBrojIzvrsenih((izvr) => izvr - 1);
      postaviBrojNeIzvrsenih((neizvr) => neizvr + 1);
    }

    obavezeAkcije.osvjezi(id, modObaveza).then((response) => {
      postaviObaveze(obaveze.map((o) => (o.id !== id ? o : response.data)));
    });
  };

  const brisiObavezu = (id) => {
    obavezeAkcije.brisi(id).then((response) => {
      postaviObaveze(obaveze.filter((p) => p.id !== id));
      postaviUkupno(obaveze.length - 1);
      const d = response.data;
      if (d.izvrseno === true) {
        postaviBrojIzvrsenih((izvr) => izvr - 1);
      } else if (d.izvrseno === false) {
        postaviBrojNeIzvrsenih((neizvr) => neizvr - 1);
      }
    });
  };

  const noviUnos = (e) => {
    e.preventDefault();

    const noviObjekt = {
      sadrzaj: unosSadrzaj,
      datum: unosDatum.toString(),
      vazno: unosVazno,
      izvrseno: false,
    };

    obavezeAkcije.stvori(noviObjekt).then((response) => {
      postaviObaveze(obaveze.concat(response.data));
      postaviUnos("");
      postaviUkupno(obaveze.length + 1);
    });
    postaviBrojNeIzvrsenih((neizvr) => neizvr + 1);
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

  const loginForma = () => {
    return (
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
      </form>
    );
  };

  const novaObaveza = () => {
    return (
      <div>
        <button onClick={Forma}>Unos nove obaveze</button>
        <button onClick={() => postaviIspis(!ispisSvih)}>
          Prikaži {ispisSvih ? "samo izvršene" : "sve"}
        </button>
        <button onClick={() => postaviSort(!sortDatum)}>
          {sortDatum
            ? "Sortiraj po datumu uzlazno"
            : "Sortiraj po datumu silazno"}
        </button>
      </div>
    );
  };

  if (prikaziFormu === false) {
    return (
      <div>
        <h1>To-do lista</h1>
        {korisnik === null ? (
          loginForma()
        ) : (
          <div>
            <p id="korisnicko_ime">Prijavljeni ste kao: {korisnik.username}</p>
            {novaObaveza()}
          </div>
        )}
        <div className="row">
          <div className="column">
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
            <p>Ukupan broj obaveza: {ukupno}</p>
          </div>
          <div className="column">
            <h4>Statistika i kalendar</h4>
            <DonutChart
              data={[
                {
                  label: "Izvrseno",
                  value: brojIzvrsenih,
                },
                {
                  label: "Neizvrseno",
                  value: brojNeIzvrsenih,
                },
              ]}
              colors={["green", "grey"]}
            />

            <Kalendar obaveza={obaveze} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <form className="unos" onSubmit={noviUnos}>
        <h1>Unos nove obaveze</h1>
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
        <button id="Odustani" onClick={Forma}>
          Odustani
        </button>
      </form>
    );
  }
};
export default App;

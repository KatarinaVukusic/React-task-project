# Evidencija aktivnosti

## 4.1.2022.
### Kratki opis promjena
Osmišljena tema projekta te osnovne funkcionalnosti projekta

## 23.1.2022.
### Kratki opis promjena
Napisan kratki opis projekta.Definirane su i funkcionalnosti projekta.

## 25.3.2022.
### Kratki opis promjena
Početak na izradi aplikacije. Kreirala sam frontend dio i napisala sam formu za unos podataka. Trenutno radi samo unos u varijable stanja. Instaliran je DatePicker za odabir datuma kod unosa.  

## 27.3.2022.
### Kratki opis promjena
Napravljena tablica u kojoj se nalaze podaci iz niza. Omogućeno je dodavanje novih obaveza. Rad na izgledu početne stranice.  

## 31.3.2022.
### Kratki opis promjena
Kreirala sam backend dio te napravila GET,POST i DELETE. Na frontendu sam napravila css za komponentu obaveza i gumb za prikaz samo izvršenih obaveza. U komponenti Obaveza sam napravila uvjetno rendanje podataka u tablicu.

## 1.4.2022.
### Kratki opis promjena
Napravljena je komunikacija između frontenda i backenda. Sada možemo brisati obaveze te ih možemo označiti kao izvršene. Radi nam i filter za prikazivanje samo izvršenih obaveza. 

## 2.4.2022.
### Kratki opis promjena
Stvorena je baza na MongoDb-u pomocu modela u backendu. Preinaka GET,POST,PUT,DELETE za rad s podacima iz MongoDB baze. Rad na strukturi aplikacije. Stvoreni su utils,testovi i controllers. Napravljena su 4 testa na backendu(Dodavanje nove obaveze,Brisanje jedne obaveze, Obaveze u JSON formatu, Uspjesno mjenjanje izvršenosti). 

## 4.4.2022.
### Kratki opis promjena
Stvoren je model i kontroler za korisnika. Također je stvoren i login kontroler koji provjerava korisnika i sifru te stvara token za korisnika. Kontroler obaveza je modificiran za provjeru je li token ispravan. 


## 6.4.2022.
### Kratki opis promjena
Modificiran je frontend. Napravljena je prijava korisnika u stranicu. Također radi dodavanje novih obaveza i brisanje sa tokenom. Napravljeni su i servisi za login i obaveze koji šalju zahtjeve pomoću axiosa na kontroler u backendu. 

## 7.4.2022.
### Kratki opis promjena
Uspiješno nam se mijenja izvršenost obaveze. Napravljena je logika za računanje ukupno broja obaveza. Napravljen je test za stvaranje novog korisnika. 

## 8.4.2022.
### Kratki opis promjena
Napravljena lažna verifikacija tokena na testovima. Izmjenjeni su testovi: Dodavanje nove obaveze bez tokena,Brisanje jedne obaveze bez tokena i Mjenjanje izvršenosti bez tokena. Napravljen je još jedan test u testovima za korisnike, a to je Korisnici u JSON formatu. Imamo računanje broja izvršenih i neizvršenih obaveza te su prikazani u Donut chartu. Rad na izgledu početne stranice i stranice za unos. 

## 10.4.2022.
### Kratki opis promjena
Napravljena 3 testa za frontend testiranje: renderiranje sadrzaja, poziv event handlera za izvrseno false te poziv event handlera za izvrseno true. Napisana je početna struktura aplikacije. 

## 15.4.2022.
### Kratki opis promjena
Napravljen je kalendar na kojemu su prikazane obaveze. Napravljeno je i sortiranje tablice po datumu. Možemo sortirati uzlazno ili silazno. Sve datoteke sam formatirala. 

## 19.4.2022.
### Kratki opis promjena
Sitna preinaka da se ne mijenja broj izvrsenih i neizvrsenih ako korisnik nije prijavljen. 
# Projektne faze
- [x] - Opis projekta
- [x] - Početna struktura aplikacije
- [x] - Prototip
- [ ] - Konzultacije
- [ ] - Finalna verzija
- [ ] - Obrana projekta

## Opis projekta
Potrebno je napisati kratki opis projekta.
Opis mora sadržavati popis funkcionalnosti koje će biti implementirane (npr. "prijava korisnika", "unos novih poruka", "pretraživanje poruka po autoru" itd...)
Napraviti ću aplikaciju za praćenje osobnih prihoda i rashoda. Kroz aplikaciju će se moći ...

## Početna struktura aplikacije
Potrebno je inicijalizirati početnu strukturu backend i frontend aplikacija.
Aplikacije moraju biti u odvojenim mapama koje su već inicijalizirane.
Ukoliko radite aplikaciju sa statičkim frontend sadržajem, onda u mapi mora biti izvorni kôd aplikacije

## Prototip
U ovoj fazi bi trebali imati "grubu" verziju svoje aplikacije. Ova verzija bi trebala imati implementirane osnovne funkcionalnosti koje su navedene u opisu projekta. Ne očekuje se da su implementirane SVE funkcionalnosti niti da su postojeće funkcionalnosti potpuno ispravne.

## Konzultacije
Nakon izrade prototipa potrebno se javiti nastavniku za termin konzultacija. Na konzultacijama ćete ukratko pokazati svoj prototip te će se po potrebi napraviti modifikacija početnih zahtjeva. Dovršeni projekti bez ove faze neće biti prihvaćeni.

## Finalna verzija
Nakon demonstracije prototipa možete nastaviti sa razvojem aplikacije i implementacijom svih funkcionalnosti. Prilikom razvoja potrebno je voditi dnevnik aktivnosti prema zadanim uputama.

## Obrana projekta
Zadnja faza je obrana projekta - nakon završetka finalne verzije svoje aplikacije javite se nastavniku za dogovor oko termina obrane projekta.

# Opis projekta
## Kratki opis
Napraviti ću aplikaciju sa popisom obaveza. Kroz aplikaciju ćemo moći unositi te pratiti naše obaveze .Kada izvršimo neku obavezu s popisa, označiti ćemo je kao izvršenom. U slučaju unosa krive obaveze moći ćemo izbrisati/urediti našu obavezu. Popis obaveza ćemo moći filtrirati prema izvršenosti. Imat će i uvid u ukupan broj obaveza, broj izvršenih obaveza i neizvršenih. Aplikacija će imati i kalendar u kojem ćemo moći pratiti broj obaveza za određeni datum. 

## Tehnologije
1. Frontend
2. Backend
3. Baza
## Popis funkcionalnosti
1. prikaz svih obaveza.
2. unos novih obaveza.
3. mogućnost označavanja obaveze kao izvršenom.
4. brisanje određene obaveze.
5. uređivanje određene obaveze.
6. filtriranje obaveza prema izvršenosti.
7. računanje ukupnog broja obaveza.
8. računanje broja izvršenih i neizvršenih obaveza.
9. prikaz kalendara pritiskom na dugme.
10. prikaz broja obaveza na određenom datumu u kalendaru.
11. prijava korisnika.

## Početna struktura aplikacije
Aplikacija se sastoji od frontenda i backenda.
Unutar njih se nalaze razne podmape i datoteke.

Podmape frontend dijela su: coverage(pregled svih proveedenih testova), node_modules(node biblioteka), public(sadrži statičke datoteke koje ne želimo da ih obrađuje webpack), src(srce React aplikacije).

Datoteke koje se nalaze u frontendu su: 
.gitignore(git datoteka za izostavljanje iz repozitorija), package-lock.json i package.json (skripte, dependency, konfiguracija projekta), README.md(pružanje uputa za korištenje aplikacije), yarn.lock (verzije dependency-a )


Podmape backend dijela su: kontroleri (kod za upravljanje rutama), modeli podataka, node_modules(node biblioteka) , request(mapa sa REST API zahtjevima), utils (pomoćni dijelovi aplikacije - middleware).

Datoteke koje se nalaze u backendu su:  .env(environment varijable za lokalno testitanje), 
.gitignore, app.js (uključeni svi potrebni moduli i redoslijed middleware-a), index.js(glavna datoteka za pokretanje), package-lock.json i package.json.

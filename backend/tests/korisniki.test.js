const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./pomocni_test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



 beforeEach(async () => {
 await Korisnik.deleteMany({})
 const passHash = await bcrypt.hash('tajna', 10)
 const korisnik = new Korisnik({username: 'admin', passHash})
 await korisnik.save()
 })

 test('stvaranje novog korisnika', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()
    const novi = {
    username: 'kvuk',
    ime: 'Kate Vuk',
    pass: 'kvkvkv'
    }
    await api
    .post('/api/korisnici')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)
    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
    })
   




 afterAll(async () => {
 await mongoose.connection.close()
 })


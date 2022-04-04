const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const obaveza = require('../models/obaveza')
const pomocni = require('./pomocni_test')

const api = supertest(app)

beforeEach(async () => {
    await obaveza.deleteMany({})
    let novaObaveza = new obaveza(pomocni.obavezaPocetak[0])
    await novaObaveza.save()
    novaObaveza = new obaveza(pomocni.obavezaPocetak[1])
    await novaObaveza.save()
    novaObaveza = new obaveza(pomocni.obavezaPocetak[2])
    await novaObaveza.save()
})

test('Obaveze u JSON formatu', async () => {
    await api
        .get('/api/obaveze')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Brisanje jedne obaveze', async () =>{
    const obavezaPocetak = await pomocni.obavezaBaza()
    const obavezaZaBrisanje = obavezaPocetak[1]   
    await api
    .delete(`/api/obaveze/${obavezaZaBrisanje.id}`)
    .expect(401)
    const ObavezaNaKraju = await pomocni.obavezaBaza()
    expect(ObavezaNaKraju).toHaveLength(pomocni.obavezaPocetak.length - 1)
})

/*
test('Dodavanje nove obaveze', async () => {
    const novaObaveza = {
        sadrzaj: "Posjet muzeju",
        datum: "Fri Apr 27 2022",
        vazno: false,
        izvrseno: false
    }
    await api
    .post('/api/obaveze')
    .send(novaObaveza)
    .expect(500)

    const ObavezaNaKraju = await pomocni.obavezaBaza()
    expect(ObavezaNaKraju).toHaveLength(pomocni.obavezaPocetak.length)

})*/
test('Uspješno mijenjanje izvršenosti', async () => {
    const obavezaPocetak = await pomocni.obavezaBaza()
    const obavezaZaMijenjanje = obavezaPocetak[2]
    const izmjenaObaveza = {
        izvrseno: true
    }
    await api
    .put(`/api/obaveze/${obavezaZaMijenjanje.id}`)
    .send(izmjenaObaveza)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const obavezaNaKraju = await pomocni.obavezaBaza()
    const izvrseno = obavezaNaKraju.map(o => o.izvrseno)
    expect(izvrseno).toContain(true)
})

afterAll(() => {
    mongoose.connection.close()
})
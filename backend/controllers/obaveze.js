const obavezaRouter = require('express').Router()
const Obaveza = require('../models/obaveza')


obavezaRouter.get('/', async (req, res) => {
    const obaveza = await Obaveza.find({})
    res.json(obaveza)
})

obavezaRouter.get('/:id', async (req, res) => {
    const obaveza = await Obaveza.findById(req.params.id)
    res.json(obaveza)
})

obavezaRouter.put('/:id', async (req, res) => {
    const podatak = req.body
    const id = req.params.id

    const obaveza = {
        izvrseno: podatak.izvrseno,      
    }

    const novaObaveza = await Obaveza.findByIdAndUpdate(id, obaveza, { new: true })
    res.json(novaObaveza)
})

obavezaRouter.post('/', async (req, res) => {

    const podatak = req.body

    const novaObaveza = new Obaveza({
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        vazno: podatak.vazno,
        izvrseno: podatak.izvrseno,
        
    })

    const spremljenaObaveza = await novaObaveza.save()
    res.json(spremljenaObaveza)
})

obavezaRouter.delete('/:id', async (req, res) => {
    await Obaveza.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = obavezaRouter
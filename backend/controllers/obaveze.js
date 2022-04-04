const obavezaRouter = require('express').Router()
const Obaveza = require('../models/obaveza')
const Korisnik = require('../models/korisnik')
const jwt=require('jsonwebtoken')

const dohvatiToken = req => {
    const auth =req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
    }
    return null
}
   

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

    const token=dohvatiToken(req)

    const dekToken=jwt.verify(token, process.env.SECRET)
    if(!token || !dekToken.id){
        return res.status(401).json({error: 'neispravni ili nepostojeći token'})
    } 
    
    const vlasnikObaveze= await Korisnik.findById(dekToken.id)

    const obaveza = {
        izvrseno: podatak.izvrseno,      
    }

    const novaObaveza = await Obaveza.findByIdAndUpdate(vlasnikObaveze.id, obaveza, { new: true })
    res.json(novaObaveza)
})

obavezaRouter.post('/', async (req, res) => {

    const podatak = req.body
    const token=dohvatiToken(req)

    const dekToken=jwt.verify(token, process.env.SECRET)
    if(!token || !dekToken.id){
        return res.status(401).json({error: 'neispravni ili nepostojeći token'})
    }
    
    const vlasnikObaveze= await Korisnik.findById(dekToken.id)

    const novaObaveza = new Obaveza({
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        vazno: podatak.vazno,
        izvrseno: podatak.izvrseno,
        korisnik: vlasnikObaveze._id       
    })

    const spremljenaObaveza = await novaObaveza.save()
    vlasnikObaveze.obaveze=vlasnikObaveze.obaveze.concat(spremljenaObaveza._id)
    await vlasnikObaveze.save()

    res.json(spremljenaObaveza)
})

obavezaRouter.delete('/:id', async (req, res) => {
    const token=dohvatiToken(req)

    const dekToken=jwt.verify(token, process.env.SECRET)
    if(!token || !dekToken.id){
        return res.status(401).json({error: 'neispravni ili nepostojeći token'})
    } 
    
    const vlasnikObaveze= await Korisnik.findById(dekToken.id)
    
    await Obaveza.findByIdAndRemove(vlasnikObaveze.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(err => next(err))
   
})

module.exports = obavezaRouter
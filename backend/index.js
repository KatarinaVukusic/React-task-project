
const http = require('http')
const express=require('express')
const cors=require('cors')

const app=express()

app.use(cors())
app.use(express.json())

let obaveze = [
    {
    id: 1,
    sadrzaj: 'Pripremiti razgovor za posao',
    datum: 'Fri Apr 29 2022',
    vazno: true,
    izvrseno: false
    },
    {
    id: 2,
    sadrzaj: 'Otici u ducan',
    datum: 'Wed Apr 6 2022',
    vazno: false,
    izvrseno: false
    },
    {
    id: 3,
    sadrzaj: 'Napisati domaci',
    datum: 'Fri Apr 22 2022',
    vazno: true,
    izvrseno: false
    }
   ]

//GET
app.get('/',(req,res)=> {
    res.send('<h1>Pozdrav od Express servera</h1>')
})

app.get('/api/obaveze',(req,res) => {
    res.json(obaveze)
})

app.get('/api/obaveze/:id', (req,res) => {
    const id=Number(req.params.id)
    const obaveza= obaveze.find(o => o.id ===id)

    if(obaveza){
        res.json(obaveza)
    }else{
        res.status(404).end()
    }
   
})

//DELETE
app.delete('/api/obaveze/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log("Brisem poruku sa ID:", id);
    obaveze=obaveze.filter(p => p.id !== id);

    res.status(204).end()
   })
  

//POST
app.post('/api/obaveze', (req, res) => {
    const podatak = req.body

    if(!podatak.sadrzaj){
    return res.status(400).json({
    error: 'Nedostaje sadržaj'
    })
    }
   
    const obaveza = {
    id: generirajId(),
    sadrzaj: podatak.sadrzaj,
    datum: podatak.datum,
    vazno: podatak.vazno,
    izvrseno: podatak.izvrseno,
    }
    obaveze = obaveze.concat(obaveza)
   
    res.json(obaveza)
   })
   
//PUT
app.put('/api/obaveze/:id',(req,res) => {
    const podatak=req.body
    console.log(req.params.id)
    const id=Number(req.params.id)

    console.log("Promjena izvršenosti obaveze sa ID", id)

    obaveze=obaveze.map(o => o.id !== id ? o : podatak)
    res.json(podatak)
})



const generirajId = () => {
    const maxId = obaveze.length > 0
    ? Math.max(...obaveze.map(p => p.id))
    : 0
    return maxId + 1
   }



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})

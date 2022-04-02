const Obaveza = require('../models/obaveza')


const obavezaPocetak = [
    {       
        sadrzaj: 'Pripremiti razgovor za posao',
        datum: 'Fri Apr 29 2022',
        vazno: true,
        izvrseno: false
    },
    {       
        sadrzaj: 'Otici u ducan',
        datum: 'Wed Apr 6 2022',
        vazno: false,
        izvrseno: false
    },
    {      
        sadrzaj: 'Napisati domaci',
        datum: 'Fri Apr 22 2022',
        vazno: true,
        izvrseno: false
    }
  
]

const obavezaBaza = async () => {
    const obaveza = await Obaveza.find({})
    return obaveza.map(p => p.toJSON())
}

module.exports = {obavezaPocetak, obavezaBaza}
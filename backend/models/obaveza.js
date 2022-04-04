const mongoose = require('mongoose')

const obavezaSchema = new mongoose.Schema({
 sadrzaj: {
     type: String,
     minlength: 5,
     required: true
 },
 datum: {
    type: String,
    required: true
},
 vazno: {
    type: Boolean,
    required: false
},
 izvrseno: {
     type: Boolean,
     default: false
 },
 korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Korisnik'
    }
   
})

obavezaSchema.set('toJSON', {
    transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
    }
   })


module.exports=mongoose.model('Obaveza',obavezaSchema,'obaveze')

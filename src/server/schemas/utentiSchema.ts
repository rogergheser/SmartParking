import mongoose, {Schema} from "mongoose";

const utentiSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxLength: 30
    },
    cognome: {
        type: String,
        required: true,
        maxLength: 30
    },
    email:{
        type: String,
        required: true,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    cellNum:{
        type: String,
        required: true,
        length: 10
    },
    isParcheggiatore:{
        type: Boolean,
        required: true,
        default: false,
    },
    loginCounter:{
        type: Number,
        required: true,
        default: 0
    },
    metodiPagamento:{
        type: Array, //numero di carta
        required: true,
        default: null
    },
    targhe:{
        type: Array,
        required: true,
        default: null
    },
    cartaPreferita:{
        type: Number,
        required: false,
        default: null
    },
    saldoWallet:{
        type: Number,
        required: true,
        default: 0.0
    }

});

export default mongoose.model("utente", utentiSchema);
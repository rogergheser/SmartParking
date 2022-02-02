import mongoose, {Schema} from "mongoose";

const parcheggiSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxLength: 30
    },
    via: {
        type: String,
        required: true,
        maxLength: 30
    },
    citta: {
        type: String,
        required: true,
        maxLength: 30
    },
    cap: {
        type: String,
        required: true,
        maxLength: 30
    },
    giorniAPagamento: {
        type: String,
        required: true
    },
    postiTotali: {
        type: Number,
        required: true,
        default: 0
    },
    postiDisponibili: {
        type: Number,
        required: true,
        default: 0
    },
    posizione: {
        type: String,
        required: true
    },
    owner: {
        type: Object,
        required: true
    }
});

export default mongoose.model("parcheggio", parcheggiSchema);
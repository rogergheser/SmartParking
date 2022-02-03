import mongoose, {Schema} from "mongoose";

const analyticsSchema = new Schema({
    guadagni: {
        type: Number,
        required: true,
        default: 0
    },
    macchineParcheggiate: { //mensilmente
        type: Number,
        required: true,
        default: 0
    },
    numeroUtenti: {
        type: String,
        required: true,
        maxLength: 30
    },
    citta: {
        type: String,
        required: true,
        default: 0
    },
    parcheggio: {
        type: Object,
        required: true
    }
});

export default mongoose.model("analytic", analyticsSchema);
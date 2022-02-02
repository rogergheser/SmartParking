import express from "express";
import cors from "cors";
import utentiSchema from "./schemas/utentiSchema";
import parcheggiSchema from "./schemas/parcheggiSchema";
import analytics from "./schemas/analyticsSchema";
import { Mongoose } from "mongoose";
const app = express().use(cors(), express.json());

//esempio
/**
 * This api... if there's an error returns ... otherwise ...
 */
app.post("/test", async (req, res) => {
    const {nome, cognome} = req.body;
    console.log(req.body);
    console.log(nome, cognome);
    if (typeof nome != "string" || typeof cognome != "string"){
        return res.status(400).send("Nome o cognome non specificato");
    }
    console.log(nome, cognome);
    const user = await (utentiSchema.findOne({nome, cognome})) as {nome:string, cognome:string, email:string};
    if (!user){
        return res.status(500).send("Utente non trovato");
    } else {
        return res.send(user.email);
    }
    //passo uno status, devo sempre ritornare lo status in un API
    //const parcheggio = await (parcheggiSchema.findOne({undefined)) as any;
})

app.post("/register", async(req, res) => {
    const {nome, cognome, email, password, isParcheggiatore, cellNum, birthDate, CF} = req.body;
    console.table({nome, cognome, email, password, isParcheggiatore, cellNum, birthDate, CF});
    let date = (birthDate as string).split('/');
    
    if (CF.size != 16){
        return res.status(400).send({error: "Codice fiscale non corretto"});
    }

    if (nome.size > 30){
        return res.status(400).send({error: "Nome troppo lungo"});
    }

    if (cognome.size > 30){
        return res.status(400).send({error: "Cognome troppo lungo"});
    }

    if (password.size < 6){
        return res.status(400).send({error: "Password troppo breve"});
    }

    if (cellNum.size != 10){
        return res.status(400).send({error: "Numero di telefono non corretto"});
    }

    if (birthDate != 8){
        return res.status(400).send({error: "Data non valida"});
    }

    if(await utentiSchema.findOne({CF, email})){
        return res.status(400).send({error: "L'utente esiste già"});
    }

    return res.status(201).send(await new utentiSchema(
        {
            nome, 
            cognome, 
            email, 
            password, 
            cellNum, 
            isParcheggiatore, 
            loginCounter: 0,
            metodiPagamento: [],
            targhe: [],
            saldoWallet: 0.0,
            CF,
            birthDate: new Date(Number.parseInt(date[0]), Number.parseInt(date[1]), Number.parseInt(date[2]))
        }).save());  
})


app.get("/profilo/:CF", async(req, res) => {
    console.log((req.params));
    const CF = req.params.CF;
    const user = await utentiSchema.findOne({CF});
    if (user) return res.status(201).send(user);
    else return res.status(500).send({error:"User not found"});
})

app.delete("/rimuoviUtente", async(req, res) => {
    const {CF, password} = req.body;
    const user = await utentiSchema.findOneAndDelete({CF, password});
    if (user){
        console.log(user);

        return res.status(201).end();
    } else {
        return res.status(400).send({error:"Nessun utente trovato o password errata"});
    }
})

export default app;
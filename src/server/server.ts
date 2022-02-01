import express from "express";
import cors from "cors";
import utentiSchema from "./schema/utentiSchema";
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
})

export default app
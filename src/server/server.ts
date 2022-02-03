import express from "express";
import cors from "cors";
import utentiSchema from "./schemas/utentiSchema";
import parcheggiSchema from "./schemas/parcheggiSchema";
import analytics from "./schemas/analyticsSchema";
import { Mongoose } from "mongoose";
const app = express().use(cors(), express.json());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'SmartParking API',
            version: '1.0.0',
            description:
                'Information about SmartParking API',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: '218078',
                url: 'http://localhost:5001/',
            },
        },
        servers: [
            {
                url: 'http://localhost:5001/',
                description: 'Development server',
            },
        ],
    },
    apis: ["src/server/server.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un utente al sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                _id:
 *                  type: ObjectId
 *                  description: Id of the person.
 *                  example: 51b2ae5bb48pb237244bf8a2
 *                nome:
 *                  type: string
 *                  description: nome dell'utente.
 *                  example: "Amir"
 *                cognome:
 *                  type: string
 *                  description: Cognome dell'utente.
 *                  example: "Gheser"
 *                email: 
 *                   type: string
 *                   description: Email dell'utente.
 *                   example: "amir.gheser@studenti.unitn.it"
 *                password:
 *                   type: string
 *                   description: Password dell'utente.
 *                   example: "password"
 *                cellNum:
 *                   type: string
 *                   description: Numero di telefono dell'utente.
 *                   example: "3515054592"
 *                isParcheggiatore:
 *                   type: boolean
 *                   description: Indica se è un utente parcheggiatore.
 *                   example: false
 *                loginCounter:
 *                   type: integer
 *                   description: Conta il numero di login.
 *                   example: 0
 *                metodiPagamento:
 *                   type: array
 *                   items:
 *                       type: string
 *                   description: I metodi di pagamento dell'utente.
 *                   example: [ "0000 0000 0000 0000" ]
 *                targhe:
 *                   type: array
 *                   items:
 *                       type: string
 *                   description: Le targe dei veicoli dell'utente.
 *                   example: "AA000ZZ"
 *                cartaPreferita:
 *                   type: string
 *                   description: La carta di credito preferita dall'utente.
 *                   example: "0000 0000 0000 0000"
 *                saldoWallet:
 *                   type: double
 *                   description: Il saldo disponibile sul wallet dell'utente.
 *                   example: 12.16
 *                CF:
 *                   type: string
 *                   description: Il codice fiscale dell'utente.
 *                   example: GHSMRA01L25L781H
 *                birthDate:
 *                   type: date
 *                   description: La data di nascita dell'utente
 *                   example: 25/07/01
 *                   pattern: /([0-9]{2})/(?:[0-9]{2})/([0-9]{4})/
 *     responses:
 *       200:
 *         description: Aggiunto utente con successo
 *       400:
 *         description: Parametri dell'utente invalidi.
*/
app.post("/register", async(req, res) => {
    const {nome, cognome, email, password, isParcheggiatore, cellNum, birthDate, CF} = req.body;
    console.table({nome, cognome, email, password, isParcheggiatore, cellNum, birthDate, CF});
    
    if (CF.length != 16){
        return res.status(400).send({error: "Codice fiscale non corretto"});
    }

    if (nome.length > 30){
        return res.status(400).send({error: "Nome troppo lungo"});
    }

    if (cognome.length > 30){
        return res.status(400).send({error: "Cognome troppo lungo"});
    }

    if (password.length < 6){
        return res.status(400).send({error: "Password troppo breve"});
    }

    if (cellNum.length != 10){
        return res.status(400).send({error: "Numero di telefono non corretto"});
    }

    if (birthDate.length != 8){
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
            birthDate
        }).save());
})


/**
 * @swagger
 * /profilo/{CF}:
 *   get:
 *     summary: Recupera informazioni su un utente.
 *     description: Recuperare i vari attributi di uno specifico utente.
 *     parameters:
 *       - in: path
 *         name: CF
 *         schema: 
 *             type: string
 *         required: true
 *         description: codice fiscale dell'utente desiderato
 *     responses:
 *       201:
 *         description: Utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: Id of the person.
 *                         example: 51b2ae5bb48pb237244bf8a2
 *                       nome:
 *                         type: string
 *                         description: nome dell'utente.
 *                         example: "Amir"
 *                       cognome:
 *                         type: string
 *                         description: Cognome dell'utente.
 *                         example: "Gheser"
 *                       email: 
 *                          type: string
 *                          description: Email dell'utente.
 *                          example: amir.gheser@studenti.unitn.it
 *                       password:
 *                          type: string
 *                          description: Password dell'utente.
 *                          example: "password"
 *                       cellNum:
 *                          type: string
 *                          description: Numero di telefono dell'utente.
 *                          example: 3515054592
 *                       isParcheggiatore:
 *                          type: boolean
 *                          description: Indica se è un utente parcheggiatore.
 *                          example: false
 *                       loginCounter:
 *                          type: integer
 *                          description: Conta il numero di login.
 *                          example: 0
 *                       metodiPagamento:
 *                          type: array
 *                          items:
 *                              type: string
 *                          description: I metodi di pagamento dell'utente.
 *                          example: [ "0000 0000 0000 0000" ]
 *                       targhe:
 *                          type: array
 *                          items:
 *                              type: string
 *                          description: Le targe dei veicoli dell'utente.
 *                          example: "AA000ZZ"
 *                       cartaPreferita:
 *                          type: string
 *                          description: La carta di credito preferita dall'utente.
 *                          example: "0000 0000 0000 0000"
 *                       saldoWallet:
 *                          type: double
 *                          description: Il saldo disponibile sul wallet dell'utente.
 *                          example: 12.16
 *                       CF:
 *                          type: string
 *                          description: Il codice fiscale dell'utente.
 *                          example: "GHSMRA01L25L781H"
 *                       birthDate:
 *                          type: date
 *                          description: La data di nascita dell'utente
 *                          example: 25/07/01
 *                          pattern: /([0-9]{2})/(?:[0-9]{2})/([0-9]{4})/
 */
app.get("/profilo/:CF", async(req, res) => {
    console.log((req.params));
    const CF = req.params.CF;
    const user = await utentiSchema.findOne({CF});
    if (user) return res.status(201).send(user);
    else return res.status(500).send({error:"User not found"});
})

/**
 * @swagger
 * /rimuoviUtente/{CF}/{password}:
 *   delete:
 *     summary: Elimina un utente.
 *     description: Dato il codice fiscale e la password, si rimuove l'utente dal sistema.
 *     parameters:
 *       - in: path
 *         name: CF
 *         schema:
 *             type: string
 *         required: true
 *         description: Codice Fiscale dell'utente da rimuovere
 *       - in: path
 *         name: password
 *         schema:
 *             type: string
 *         required: true
 *         description: Password dell'utente da rimuovere
 *     responses:
 *       201:
 *         description: Utente rimosso
 *       400:
 *         description: Utente non trovato o password errata
*/

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

import request from "supertest";
import utentiSchema from "../server/schemas/utentiSchema";
import app from "../server/server";

const mockingoose = require("mockingoose");

describe("register", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe("POST", () => {
        //jest.setTimeout(20000);
        describe("Utente aggiunto", () => {
            it("should return 200 (User registered)", async () =>{
                mockingoose(utentiSchema).toReturn(null, "findOne").toReturn({
                    "nome": "Amir",
                    "cognome": "Gheser",
                    "email": "amir.gheser@studenti.unitn.it",
                    "password": "password",
                    "cellNum": "3515054592",
                    "isParcheggiatore": false,
                    "loginCounter": 0,
                    "metodiPagamento": [],
                    "targhe": [],
                    "cartaPreferita": null,
                    "saldoWallet": 0,
                    "CF": "GHSMRA01L25L781H",
                    "birthDate": "25/07/01",
                    "_id": "61fd36825341c4a73f89af99",
                    "__v": 0
                }, "save");
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "25/07/01"
                });
                expect(statusCode).toBe(201);
                expect(body).toStrictEqual({
                    "nome": "Amir",
                    "cognome": "Gheser",
                    "email": "amir.gheser@studenti.unitn.it",
                    "password": "password",
                    "cellNum": "3515054592",
                    "isParcheggiatore": false,
                    "loginCounter": 0,
                    "metodiPagamento": [],
                    "targhe": [],
                    "cartaPreferita": null,
                    "saldoWallet": 0,
                    "CF": "GHSMRA01L25L781H",
                    "birthDate": "25/07/01",
                    "_id": "61fd36825341c4a73f89af99",
                    "__v": 0
                });
            });
        });

        describe("Utente non aggiunto", ()=>{
            it("Should say wrong CF",async () => {
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L78H",
                    birthDate : "25/07/01"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("Codice fiscale non corretto")
            });

            it("Should say name too long", async ()=>{
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "AmirMaConIlNomeUnPoPiuLungoMaSoloPerIlTesting",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "25/07/01"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("Nome troppo lungo")
            })
            it("Should say last name too long", async ()=>{
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "GheserMaQuestaVoltaConIlCognomeUnPoPiuLungoMaSoloPerIlTesting",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "25/07/01"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("Cognome troppo lungo")
            })
            it("Should say password too short", async ()=>{
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "pass",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "25/07/01"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("Password troppo breve")
            })
            it("Should say phone number not correct", async ()=>{
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "25/07/01"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("Numero di telefono non corretto")
            })
            it("Should say date not correct", async ()=>{
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "250701"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("Data non valida")
            })
            it("Should say user already exists", async ()=>{
                mockingoose(utentiSchema).toReturn({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "250701"
                }, "findOne")
                const {statusCode, body} = await request(app).post("/register").send({
                    nome : "Amir",
                    cognome : "Gheser",
                    email : "amir.gheser@studenti.unitn.it",
                    password : "password",
                    cellNum : "3515054592",
                    isParcheggiatore : false,
                    CF : "GHSMRA01L25L781H",
                    birthDate : "25/07/01"
                });
                //console.log(body)
                expect(statusCode).toBe(400);
                expect(body.error).toBe("L'utente esiste già")
            })
        })
    });
});
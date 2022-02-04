import request from "supertest";
import utentiSchema from "../server/schemas/utentiSchema";
import app from "../server/server";

const mockingoose = require("mockingoose");

describe("profilo/{CF}", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe("GET", () => {
        describe("invalid CF", () => {
            it("should return 500 (User not found)", async () =>{
                const {body, statusCode} = await request(app).get("/profilo/GHSMRA01L25L781L");
                expect(statusCode).toBe(500);
                expect(body).toEqual({error:"User not found"}); 
            });
        });
        describe("Codice Fiscale valido", () => {
            it("dovrebbe ritornare 201 e l'utente", async () => {
                mockingoose(utentiSchema).toReturn({nome:"Amir", cognome:"Gheser", CF: "GHSMRA01L25L781H"}, "findOne");
                const { body, statusCode } = await request(app).get("/profilo/GHSMRA01L25L781H");
                console.table(body);
                expect(statusCode).toBe(201);
                expect(body.nome).toEqual("Amir");
                expect(body.cognome).toEqual("Gheser");
            });
        });
    });
});
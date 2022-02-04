import request from "supertest";
import utentiSchema from "../server/schemas/utentiSchema";
import app from "../server/server";

const mockingoose = require("mockingoose");

describe("/rimuoviUtente", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    describe("DELETE", () => {
        describe("User found", () => {
            it("should return code 201 and delete the user from the database", async ()=>{
                mockingoose(utentiSchema).toReturn({nome:"Amir", cognome:"Gheser", CF: "GHSMRA01L25L781H"}, "findOneAndDelete");
                const {statusCode} = await (await request(app).delete("/rimuoviUtente").send({CF: "GHSMRA01L25L781H", password: "password"}));
                expect(statusCode).toBe(201);
            });
        });

        describe("User not found", () => {
            it("Shouldn't find the user and return code 400", async ()=>{
                mockingoose(utentiSchema).toReturn(null, "findOneAndDelete");
                const {statusCode} = (await request(app).delete("/rimuoviUtente").send({CF: "GHSMRA01L25L781H", password: "password"}));
                expect(statusCode).toBe(400);
            })
        })
    })
})
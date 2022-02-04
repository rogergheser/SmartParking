import request from "supertest";
import utentiSchema from "../server/schemas/utentiSchema";
import app from "../server/server";

const mockingoose = require("mockingoose");

describe("/rimuoviUtente", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    describe("DELETE", () => {
        
    })
})
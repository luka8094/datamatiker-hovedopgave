import "dotenv/config"
import request from "supertest"
import app from "./app"
import madbConnection from "./data/database/mongo/dbConnection"

describe("POST /api/login", ()=> {
    describe("It should authorize the user credentials", () =>{
        test("The response should return with status code 200", async () => {
            const response = await request(app)
                .post("/api/login")
                .send({email: "oa@obsidian.dk", password: "strongpassword"})
                .set('Content-Type','application/json').
        
            expect(response.statusCode).toBe(200)
        })
    })

    describe("It should return an error", () => {
        test("The response should return with status code 403", async () => {
            const response = await request(app)
                .post("/api/login")
                .send({email: "thisdoesnotexist@email.dk", password: "randompassword"})
                .set('Content-Type','application/json')
            
            expect(response.statusCode).toBe(403)
        })
    })
})
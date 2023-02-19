const jst = require('@jest/globals');
const testFunctions = require("./routes.js")
const app = require("./app")
const https = require('https');
const {describe, test, expect, it} = require("@jest/globals");
const request = require("supertest")
const allUsers = require("./test_data.json")

function random_string(ln)
{
    let chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890йцукенгшщзхъфывапролджэячсмитьбю";
    let out = "";
    for(let i = 0; i < ln; ++i)
        out += chars[Math.floor(Math.random() * chars.length)];
    return out;
}

function random_users()
{
    let users = [];
    for(let i = 0; i < 16; ++i)
        users.push({id: Math.floor(Math.random() * 65535),
            name: random_string(32),
            email: random_string(16)});
    return users;
}
/*
jst.test('getting user by email', () => {
    let users = random_users();
    let tofind = users[Math.floor(Math.random() * users.length)];
    jst.expect(testFunctions.getUserByEmail(tofind.email, users)).toBe(tofind);
})*/


describe("Testing api", () => {
    test("authenticate", (done) => {
        request(app)
            .post("/api/authenticate")
            .send({email: "tgolikov03@mail.ru", password:"1234", all_users:JSON.stringify(allUsers)})
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
    it("getting user by email", ()=>{
        let users = random_users();
        let tofind = users[Math.floor(Math.random() * users.length)];
        jst.expect(testFunctions.getUserByEmail(tofind.email, users)).toBe(tofind);
    })
});

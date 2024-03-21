import request from "supertest";
import {app} from "../../app";

it("Clears the cookie after signing out", async () =>
{
    const cookie = await global.signin();

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie) // Setting up cookie
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Clears the cookie after signing out", async () =>
{
    const response = await request(app)
        .get("/api/users/currentuser")
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeNull();
});

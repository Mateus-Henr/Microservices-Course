import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";
import {natsWrapper} from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () =>
{
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signin())
        .send({
            title: "dasdsa",
            price: 20
        })
        .expect(404);
});

it("returns a 401 if the user is not authenticated", async () =>
{
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "fdsfd",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .send({
            title: "fdsfd",
            price: 10
        })
        .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () =>
{
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "fdsfd",
            price: 10
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", global.signin())
        .send({
            title: "fdsdfd",
            price: 30
        })
        .expect(401);
});

it("returns 400 if the user provides an invalid title or price", async () =>
{
    const cookie = global.signin();

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "fdsfd",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "",
            price: 30
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "dadas",
            price: -30
        })
        .expect(400);
});

it("update the tickets provided valid inputs", async () =>
{
    const cookie = global.signin();

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "fdsfd",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "fsdfsdfsd",
            price: 30
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual("fsdfsdfsd");
    expect(ticketResponse.body.price).toEqual(30);
});

it("publishes an event", async () =>
{
    const cookie = global.signin();

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "fdsfd",
            price: 10
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "fsdfsdfsd",
            price: 30
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

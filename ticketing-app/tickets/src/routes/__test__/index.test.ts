import mongoose from "mongoose";
import request from "supertest";
import {app} from "../../app";

it('returns a 404 if a ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/tickets/fdsdfdsfdsf/${id}`)
        .send()
        .expect(404);
});

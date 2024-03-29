import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global
{
    var signin: () => string[];
}

let mongo: any;

// Telling jest to use a mock file.
jest.mock("../nats-wrapper");

beforeAll(async () =>
{
    process.env.JWT_KEY = "adasdas";

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () =>
{
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections)
    {
        await collection.deleteMany({});
    }
});

afterAll(async () =>
{
    if (mongo)
    {
        await mongo.stop();
    }

    await mongoose.connection.close();
});

global.signin = () =>
{
    // Build a JWT payload. {id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    }

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build a session object {jwt: MY_JWT}
    const session = {jwt: token};

    // Take JSON and encode it as base64
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString("base64");

    // Return string
    return [`session=${base64}`];
};

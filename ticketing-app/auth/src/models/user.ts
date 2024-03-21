import mongoose from "mongoose";
import {Password} from "../services/password";

// Interface to work well with ts
interface UserAttrs
{
    email: string;
    password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc>
{
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document
{
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, // Mongoose type
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret)
        {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password; // Removing property from the doc
            delete ret.__v;
        }
    }
});

// Adding a function to a model.
userSchema.statics.build = (attrs: UserAttrs) =>
{
    return new User(attrs);
};

userSchema.pre("save", async function (done)
{
    // We can access the document with 'this' because we are using the function keyword. An arrow function would have
    // 'this' overridden, and it would be equal to this file.
    if (this.isModified("password"))
    { // To avoid hashing passwords when something else changes.
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }

    done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// Use it to create new users
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// }

export {User};

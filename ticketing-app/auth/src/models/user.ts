import mongoose from 'mongoose';

// Interface to work well with ts
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any;
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
});

// Adding a function to a model.
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

// Use it to create new users
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// }

export {User};

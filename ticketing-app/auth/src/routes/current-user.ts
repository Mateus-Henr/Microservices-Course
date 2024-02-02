import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Checks whether the user is logged in.
router.get('/api/users/currentuser', (req, res) => {
    if (!req.session?.jwt) { // Checks if the internal property exists.
        return res.send({currentUser: null});
    }

    try {
        // Checks if the JWT has been modified or if it's no longer valid.
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

        return res.send({currentUser: payload});
    } catch (err) {
        return res.send({currentUser: null});
    }
});

export {router as currentUserRouter};

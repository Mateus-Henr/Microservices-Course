import express from 'express';
import {currentUser} from '@sgtickers-course/common';

const router = express.Router();

// Checks whether the user is logged in.
router.get('/api/users/currentuser',
    currentUser,
    (req, res) => {
        res.send({currentUser: req.currentUser || null}); // Returns null instead of undefined.
    });

export {router as currentUserRouter};

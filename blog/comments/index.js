const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) =>
{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) =>
{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    const newComment = {
        id: commentId,
        content,
        status: 'pending'
    };

    comments.push(newComment);

    commentsByPostId[req.params.id] = comments;

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            ...newComment,
            postId: req.params.id
        }
    });

    res.status(201).send(commentsByPostId[req.params.id]);
});

app.post('/events', (req, res) =>
{
    console.log('Received Event', req.body.type);

    res.send({});
});

app.listen(4001, () => console.log('Listening on 4001'));

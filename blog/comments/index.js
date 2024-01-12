const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

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
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id: commentId,
        content: req.body.content
    });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(commentsByPostId[req.params.id]);
});

app.listen(4001, () => console.log('Listening on 4001'));

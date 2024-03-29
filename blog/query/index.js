const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {id, title} = data;

        posts[id] = {
            id,
            title,
            comments: []
        }
    } else if (type === 'CommentCreated') {
        const {id, content, status, postId} = data;

        posts[postId].comments.push({
            id,
            content,
            status
        });
    } else if (type === 'CommentUpdated') {
        const {id, postId} = data;
        const commentIdx = posts[postId].comments.findIndex(comment => {
            return comment.id === id;
        });

        posts[postId].comments[commentIdx] = data;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    handleEvent(type, data);

    res.send({status: 'OK'});
});

app.listen(4002, async () => {
    console.log("Listening on 4002");
    try {
        const res = await axios.get("http://event-bus-srv:4005/events");

        for (let event of res.data) {
            console.log("Processing event:", event.type);

            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
});

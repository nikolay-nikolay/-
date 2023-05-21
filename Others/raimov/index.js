const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('./utils/database.js');

const auth = require('./routes/auth');

const app = express();
const PORT = 8003;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    },
});

// require('./controllers/socket')(io)

app.use('/', auth);

http.listen(PORT, "127.0.0.1", () =>
    console.log(`Server listens http://localhost:${PORT}`)
);
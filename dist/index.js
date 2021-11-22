"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const user_1 = require("./src/models/user");
const session_1 = require("./src/models/session");
const story_1 = require("./src/models/story");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
});
app.use((0, body_parser_1.urlencoded)());
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).json(`Hey ${req.query.name}`);
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.User({
        name: req.body.name,
    });
    const { _id } = yield newUser.save();
    res.status(200).json({ message: `Hey ${req.body.name}`, userId: _id });
}));
app.post("/session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSession = new session_1.Session({
        name: req.body.name,
        type: "Sync",
        status: "CREATED",
        admin: new mongoose_1.default.Types.ObjectId(req.body.admin),
        code: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    });
    const session = yield newSession.save();
    res.status(200).json(session);
}));
app.post("/story", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStory = new story_1.Story(req.body);
    const story = yield newStory.save();
    res.status(200).json(story);
}));
app.get("/session/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield session_1.Session.findOne({ code: req.params.code });
    if (session) {
        res.status(200).json(session);
    }
    res.status(401).json('session not found');
}));
app.get('/sessions/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield session_1.Session.find({ admin: req.params.userId });
    res.status(200).json(sessions);
}));
io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            id,
            user: socket.handshake.auth.name,
        });
    }
    socket.emit("users", users);
});
mongoose_1.default
    .connect("mongodb+srv://admin:admin@cluster0.kedzc.mongodb.net/poker?retryWrites=true&w=majority")
    .then(() => httpServer.listen(3001, () => console.log("server running in port 3001")));
//# sourceMappingURL=index.js.map
import express from "express";
import { json, urlencoded } from "body-parser";
import mongoose from 'mongoose';
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { User } from "./src/models/user";
import { Session } from "./src/models/session";
import { Story } from "./src/models/story"

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(urlencoded());
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json(`Hey ${req.query.name}`);
});

app.post("/login", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
  });
  const { _id } = await newUser.save();
  res.status(200).json({message: `Hey ${req.body.name}`, userId: _id });
});

app.post("/session", async (req, res) => {
  const newSession = new Session({
    name: req.body.name,
    type: "Sync",
    status: "CREATED",
    admin: new mongoose.Types.ObjectId(req.body.admin),
    code: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
  });
  const session = await newSession.save();

  res.status(200).json(session);
});

app.post("/story", async (req, res) => {
  const newStory = new Story(req.body);
  const story = await newStory.save();

  res.status(200).json(story);
});


app.get("/session/:code", async (req, res) => {
  const session = await Session.findOne({code: req.params.code});
  if(session){
    res.status(200).json(session);
  }
  res.status(401).json('session not found')
});


app.get('/sessions/:userId', async (req, res) => {
  const sessions = await Session.find({ admin: req.params.userId})
  res.status(200).json(sessions);
})

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

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.kedzc.mongodb.net/poker?retryWrites=true&w=majority"
  )
  .then(() =>
    httpServer.listen(3001, () => console.log("server running in port 3001"))
  );

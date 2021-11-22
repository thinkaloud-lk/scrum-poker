import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  admin: Schema.Types.ObjectId,
  type: String,
  players: [Schema.Types.ObjectId],
  stories: [Schema.Types.ObjectId],
  currentStory: Schema.Types.ObjectId,
  status: String,
  code: String
});

export const Session = mongoose.model("Session", SessionSchema);

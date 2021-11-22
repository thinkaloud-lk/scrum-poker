import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StorySchema = new Schema({
  id: Schema.Types.ObjectId,
  sessionId: Schema.Types.ObjectId,
  description: String,
  status: String,
});

export const Story = mongoose.model("Story", StorySchema);

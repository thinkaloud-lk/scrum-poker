"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const StorySchema = new Schema({
    id: Schema.Types.ObjectId,
    sessionId: Schema.Types.ObjectId,
    description: String,
    status: String,
});
exports.Story = mongoose_1.default.model("Story", StorySchema);
//# sourceMappingURL=story.js.map
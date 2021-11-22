"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.Session = mongoose_1.default.model("Session", SessionSchema);
//# sourceMappingURL=session.js.map
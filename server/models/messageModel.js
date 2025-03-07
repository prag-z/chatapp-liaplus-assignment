import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        text: {type: String, required: true},
    },
    users: Array,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    },
    {timestamp: true,}
);

const Message = mongoose.model("Message", messageSchema);
export default Message;



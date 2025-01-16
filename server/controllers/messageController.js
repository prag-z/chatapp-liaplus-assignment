import Messages from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json(projectedMessages);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error adding message", error: error.message });
  }
};

import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate("sender", "firstName lastName profileImage")
      .populate("receiver", "firstName lastName profileImage")
      .sort({ createdAt: 1 });

    await Message.updateMany(
      { sender: userId, receiver: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, type, fileUrl, appointmentId } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
      type: type || "text",
      fileUrl,
      appointment: appointmentId,
    });

    await message.populate([
      { path: "sender", select: "firstName lastName profileImage" },
      { path: "receiver", select: "firstName lastName profileImage" },
    ]);

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$receiver", userId] }, { $eq: ["$isRead", false] }] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    res.json({ conversations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

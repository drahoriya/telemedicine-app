import Message from "../models/Message.js";

const onlineUsers = new Map();

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("user:online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("users:online", Array.from(onlineUsers.keys()));
    });

    socket.on("message:send", async (data) => {
      try {
        const { senderId, receiverId, content, type, fileUrl, appointmentId } = data;

        const message = await Message.create({
          sender: senderId,
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

        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("message:receive", message);
        }

        socket.emit("message:sent", message);
      } catch (error) {
        socket.emit("message:error", { error: error.message });
      }
    });

    socket.on("message:typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message:typing", { senderId });
      }
    });

    socket.on("message:stop-typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message:stop-typing", { senderId });
      }
    });

    socket.on("call:offer", ({ to, offer, from }) => {
      const receiverSocketId = onlineUsers.get(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("call:offer", { from, offer });
      }
    });

    socket.on("call:answer", ({ to, answer }) => {
      const receiverSocketId = onlineUsers.get(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("call:answer", { answer });
      }
    });

    socket.on("call:ice-candidate", ({ to, candidate }) => {
      const receiverSocketId = onlineUsers.get(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("call:ice-candidate", { candidate });
      }
    });

    socket.on("call:end", ({ to }) => {
      const receiverSocketId = onlineUsers.get(to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("call:end");
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("users:online", Array.from(onlineUsers.keys()));
    });
  });
};

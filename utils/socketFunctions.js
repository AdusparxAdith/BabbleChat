const { User } = require("../models/User");

const registerSocket = async (socket, name) => {
  await User.findOneAndUpdate(
    { name },
    {
      $set: {
        socket,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

const getUserBySocket = async (socket) => {
  let user = await User.findOne({ socket });

  return user;
};

module.exports = { registerSocket, getUserBySocket };

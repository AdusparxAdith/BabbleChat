const { User } = require("../models/User");

const registerSocket = async (socket, name) => {
  let result = await User.findOneAndUpdate(
    { name },
    {
      $set: {
        socket
      }
    },
    {
      upsert: true,
      new: true
    }
  );

  // console.log(`Registered ${name} with ${socket}`);
};

const getUserBySocket = async socket => {
  let user = await User.findOne({ socket });

  return user;
};

module.exports = { registerSocket, getUserBySocket };

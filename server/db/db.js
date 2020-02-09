const mongoose = require("mongoose");

const dbConnect = async () => {
  let connection = await mongoose.connect("mongodb://localhost:27017/babble", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log("Established DB connection.");
};

try {
  dbConnect();
} catch (error) {
  console.log(error);
}

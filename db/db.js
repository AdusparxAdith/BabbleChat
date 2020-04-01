const mongoose = require("mongoose");

const dbConnect = async () => {
  let connection = await mongoose.connect(process.env.SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  console.log("Established DB connection.");
};

try {
  dbConnect();
} catch (error) {
  console.log(error);
}

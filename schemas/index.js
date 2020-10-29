const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//개발환경에서 몽구스생성 쿼리내용 확인하게 해주는것
const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  mongoose.connect(
    process.env.MONGO_URL,
    {
      dbName: "flowershop",
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.log("몽고디비연결에러", error);
      } else {
        console.log("몽고디비연결성공");
      }
    }
  );
};

//몽고DB와의 연결을 변수 db에 저장.
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("몽고디비연결에러", error);
});
db.on("disconnected", () => {
  console.error("몽고디비연결끊김, 연결재시도...");
  connect();
});

module.exports = connect;

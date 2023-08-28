const express = require("express");
const app = express();

const cors = require(`cors`);
app.use(cors({ origin: "http://localhost:3000" }));
const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const MongoClient = require(`mongodb`).MongoClient;
app.use(express.urlencoded({ extended: true }));

let db;

MongoClient.connect(
  `mongodb+srv://tkdgk1996:Tznk2F57VolxQbYk@cluster0.tj8yoah.mongodb.net/?retryWrites=true&w=majority`
  //db접속되면 여기 아래 함수 실행시켜줘
).then((client) => {
  db = client.db(`JBV2`);
});

app.listen(8080, () => console.log("연결"));

// 8080 포트로 접근하면 연결해줘라

const findIdInMongoDB = async (candidateID) => {
  const idExist = await db
    .collection(`userInfo`)
    .findOne({ userId: candidateID });
  return idExist === null ? false : true;
};

app.post(`/isDuplicateID`, async (req, res) => {
  const idExist = await findIdInMongoDB(req.body.userId);

  res.send(idExist);
});

const insertIdInMongoDB = (userId, userPw, userName) => {
  db.collection(`userInfo`).insertOne(
    {
      userId: userId,
      userPw: userPw,
      userName: userName,
    },
    (error, req) => console.log("저장")
  );
};

app.post(`/insertUserInfo`, (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;
  const userName = req.body.userName;
  insertIdInMongoDB(userId, userPw, userName);
});

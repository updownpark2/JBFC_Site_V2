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

// DB에 해당 ID가 있는지 check하고 없다면 false를 있다면 true를 return하는함수
const findIdInMongoDB = async (candidateID) => {
  const idExist = await db
    .collection(`userInfo`)
    .findOne({ userId: candidateID });
  return idExist === null ? false : true;
};

//isDiplicatID로 post 요청이 들어오면 해당 ID가 DB에 존재하는지 확인 후 return
app.post(`/isDuplicateID`, async (req, res) => {
  const idExist = await findIdInMongoDB(req.body.userId);

  res.send(idExist);
});

// ID,PW,Name을 DB에 저장함
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

//insertUserInfo로 post요청이 들어오면 DB에 저장하는 함수를 호출
app.post(`/insertUserInfo`, (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;
  const userName = req.body.userName;
  insertIdInMongoDB(userId, userPw, userName);
});

const findIdPwInMongoDB = async (userId, userPw) => {
  const isExistIdPw = await db
    .collection("userInfo")
    .findOne({ userId: userId, userPw: userPw });
  return isExistIdPw === null ? false : true;
};

app.post(`/isExistIdPw`, async (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;

  const isExistIdPw = await findIdPwInMongoDB(userId, userPw);
  res.send(isExistIdPw);
});

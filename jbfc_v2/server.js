const express = require("express");
const cors = require(`cors`);
const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const session = require(`express-session`);

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
// app.use를 사용하면 클라이언트-서버 사이에 이 코드가 동작함
// 미들웨어 라고한다.

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session 방식 login 구현하기
app.use(
  session({ secret: `비밀코드`, resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// 세팅끝
let db;

const connectMongoDB = async () => {
  const MongoClient = require(`mongodb`).MongoClient;
  app.use(express.urlencoded({ extended: true }));

  await MongoClient.connect(
    `mongodb+srv://tkdgk1996:Tznk2F57VolxQbYk@cluster0.tj8yoah.mongodb.net/?retryWrites=true&w=majority`
    //db접속되면 여기 아래 함수 실행시켜줘
  ).then((client) => {
    db = client.db(`JBV2`);
    app.listen(8080, () => console.log("연결"));
  });
};

connectMongoDB();

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

app.post(
  `/login`,
  passport.authenticate("local", {
    failureRedirect: "/fail",
    successRedirect: "/success",
  }),
  (req, res) => {
    res.redirect(`/success`);
  }
);

app.get(`/fail`, (req, res) => {
  console.log("실패");
  res.send(false);
});
app.get(`/success`, (req, res) => {
  console.log("성공");
  res.send(true);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "userPw",
      session: true,
      passReqToCallback: true,
    },

    async function (req, userId, passwordField, done) {
      //console.log(입력한아이디, 입력한비번);
      const ExistId = await db
        .collection("userInfo")
        .findOne({ userId: req.body.userId });
      if (ExistId === null) {
        return done(null, false, { message: "존재하지않는 아이디" });
      }
      if (req.body.userPw === ExistId.userPw) {
        return done(null, ExistId);
      } else {
        return done(null, false, { message: "비번틀렸어요" });
      }
    }
  )
);

passport.serializeUser((userInfo, done) => {
  done(null, userInfo.userId);
  // userId를 이용해 session을 생성한다 (통상적으로)
  // 씨리얼 라이즈한다
});
passport.deserializeUser((userId, done) => {
  done(null, userInfo.userId);
});

// 나중에 userId대신 userNickName 으로 또 프로필사진까지
const insertBoardInMongoDB = async (title, text, month, day, userId) => {
  await db.collection(`board`).insertOne(
    {
      title: title,
      text: text,
      month: month,
      day: day,
      userId: userId,
    },
    (error, req) => console.log("저장")
  );
};

app.post(`/insertBoard`, async (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const month = req.body.month;
  const day = req.body.day;
  const userId = req.body.userId;

  await insertBoardInMongoDB(title, text, month, day, userId);
  res.send(`저장끝`);
});

const getBoardData = async () => {
  const boardData = await db.collection(`board`).find({}).toArray();
  return boardData;
};

app.get(`/getBoardData`, async (req, res) => {
  const boardData = await getBoardData();
  res.send(boardData);
});

app.post(`/insertVoteData`, (req, res) => {
  const votedDate = req.body.voteDate;
  const voteTitle = req.body.voteTitle;
  const voteTextBoxArr = req.body.voteTextBoxArr;
  const voteCheckBoxArr = req.body.voteCheckBoxArr;

  db.collection(`vote`).insertOne({
    votedDate: votedDate,
    voteTitle: voteTitle,
    voteTextBoxArr: voteTextBoxArr,
    voteCheckBoxArr: voteCheckBoxArr,
  });
  res.send(`성공`);
});

app.get(`/getVoteData`, async (req, res) => {
  const voteData = await db.collection(`vote`).find({}).toArray();
  res.send(voteData);
});
